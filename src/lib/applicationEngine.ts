import type { ApplicantProfile, ProjectDetails } from "./schema";
import { ACTIVITY_TYPE_LABELS, PROJECT_STATUS_LABELS, formatProjectCategories } from "./schema";
import type { VaultDocument, VaultDocumentKind } from "./documents";
import type { ApplicationDocumentRequirementDef, ApplicationFieldDef, ApplicationTemplate } from "./applicationTemplate";
import type { Organisme } from "./organismes";
import type { Dispositif } from "./dispositifs";

export type FieldProvenance = "profile" | "project" | "manual" | "draft";
export type FieldStatus = "filled" | "to_confirm" | "missing";

export interface ResolvedField { field: ApplicationFieldDef; value: string; provenance: FieldProvenance; status: FieldStatus; }
export interface ResolvedDocumentRequirement {
 requirement: ApplicationDocumentRequirementDef;
 match: { type: "vault"; kind: VaultDocumentKind; fileName: string } | { type: "attachment"; attachmentId: string; fileName: string } | null;
}
export interface ConsistencyCheckResult { id: string; label: string; passed: boolean; }
export interface ApplicationInstance {
 fields: ResolvedField[];
 documents: ResolvedDocumentRequirement[];
 checks: ConsistencyCheckResult[];
 requiredFieldsTotal: number;
 requiredFieldsFilled: number;
 requiredFieldsToConfirm: number;
 requiredFieldsMissing: number;
 requiredDocumentsTotal: number;
 requiredDocumentsFound: number;
 completeness: number;
}
export interface DraftValue { text: string; accepted: boolean; }

function getByPath(obj: Record<string, unknown>, path: string): unknown {
 return path.split(".").reduce<unknown>((acc, key) => {
  if (acc && typeof acc === "object") return (acc as Record<string, unknown>)[key];
  return undefined;
 }, obj);
}

export function resolveSourceValue(sourcePath: string, profile: ApplicantProfile, project: ProjectDetails): { value: string; provenance: FieldProvenance } {
 if (sourcePath === "project.categories") {
  const formatted = formatProjectCategories(project.categories);
  return { value: formatted === "—" ? "" : formatted, provenance: "project" };
 }
 const [root, ...rest] = sourcePath.split(".");
 const source = root === "profile" ? (profile as unknown as Record<string, unknown>) : root === "project" ? (project as unknown as Record<string, unknown>) : undefined;
 if (!source) return { value: "", provenance: "manual" };
 const raw = getByPath(source, rest.join("."));
 if (raw === undefined || raw === null) return { value: "", provenance: root === "profile" ? "profile" : "project" };
 return { value: String(raw), provenance: root === "profile" ? "profile" : "project" };
}

export function assembleDraft(fieldId: string, profile: ApplicantProfile, project: ProjectDetails): string {
 const categories = formatProjectCategories(project.categories);
 const artist = profile.artist_name || profile.name || "Le porteur de projet";
 switch (fieldId) {
  case "project_description":
   return [
    categories !== "—" ? `${artist} présente « ${project.title || "ce projet"} », un projet de type ${categories.toLowerCase()}.` : `${artist} présente « ${project.title || "ce projet"} ».`,
    project.description || null,
    project.territory ? `Territoire concerné : ${project.territory}.` : null,
    project.target_release_date ? `Réalisation visée : ${project.target_release_date}.` : null,
   ].filter(Boolean).join(" ");
  case "artistic_presentation":
   return [
    `${artist} est ${profile.activity_type ? ACTIVITY_TYPE_LABELS[profile.activity_type].toLowerCase() : "un porteur de projet musical"}.`,
    profile.release_count !== undefined ? `${profile.release_count} sortie(s) à son actif.` : null,
    profile.concerts_count !== undefined ? `${profile.concerts_count} concert(s) réalisé(s).` : null,
   ].filter(Boolean).join(" ");
  case "development_strategy":
   return [
    project.estimated_budget ? `Budget prévisionnel du projet : ${project.estimated_budget.toLocaleString("fr-FR")} €.` : null,
    project.status ? `État d'avancement actuel : ${PROJECT_STATUS_LABELS[project.status].toLowerCase()}.` : null,
    project.track_count ? `Nombre de titres prévus : ${project.track_count}.` : null,
   ].filter(Boolean).join(" ");
  default: return "";
 }
}

function runConsistencyChecks(fields: ResolvedField[], project: ProjectDetails): ConsistencyCheckResult[] {
 const checks: ConsistencyCheckResult[] = [];
 const budget = project.estimated_budget;
 checks.push({ id: "budget_present", label: "Budget prévisionnel renseigné et positif", passed: typeof budget === "number" && budget > 0 });
 const requestedField = fields.find((f) => f.field.id === "requested_amount");
 const requested = requestedField ? Number(requestedField.value.replace(",", ".")) : NaN;
 if (!Number.isNaN(requested) && typeof budget === "number") checks.push({ id: "requested_within_budget", label: "Montant demandé cohérent avec le budget prévisionnel", passed: requested > 0 && requested <= budget });
 if (project.target_release_date) {
  const releaseDate = new Date(project.target_release_date);
  const isPast = !Number.isNaN(releaseDate.getTime()) && releaseDate.getTime() < Date.now();
  checks.push({ id: "release_date_future", label: "Date de réalisation visée non dépassée", passed: !isPast });
 }
 const requiredFields = fields.filter((f) => f.field.required);
 checks.push({ id: "all_required_fields", label: "Tous les champs obligatoires du dossier sont renseignés", passed: requiredFields.every((f) => f.status !== "missing") });
 return checks;
}

export function resolveApplicationInstance(template: ApplicationTemplate, profile: ApplicantProfile, project: ProjectDetails, documents: Partial<Record<VaultDocumentKind, VaultDocument>>, manualValues: Record<string, string>, draftValues: Record<string, DraftValue>): ApplicationInstance {
 const fields: ResolvedField[] = template.fields.map((field) => {
  const manual = manualValues[field.id];
  if (manual && manual.trim()) return { field, value: manual, provenance: "manual", status: "filled" };
  const draft = draftValues[field.id];
  if (field.draftable && draft && draft.text.trim()) return { field, value: draft.text, provenance: "draft", status: draft.accepted ? "filled" : "to_confirm" };
  if (field.sourcePath) {
   const { value, provenance } = resolveSourceValue(field.sourcePath, profile, project);
   if (value.trim()) return { field, value, provenance, status: "filled" };
  }
  return { field, value: "", provenance: "manual", status: "missing" };
 });
 const documentsResolved: ResolvedDocumentRequirement[] = template.documentRequirements.map((req) => {
  if (req.vaultKind && documents[req.vaultKind]) {
   const doc = documents[req.vaultKind]!;
   return { requirement: req, match: { type: "vault", kind: req.vaultKind, fileName: doc.fileName } };
  }
  if (req.attachmentLabelHints) {
   const hit = (project.attachments ?? []).find((a) => req.attachmentLabelHints!.some((hint) => a.label.toLowerCase().includes(hint.toLowerCase())));
   if (hit) return { requirement: req, match: { type: "attachment", attachmentId: hit.id, fileName: hit.fileName } };
  }
  return { requirement: req, match: null };
 });
 const checks = runConsistencyChecks(fields, project);
 const requiredFields = fields.filter((f) => f.field.required);
 const requiredFieldsFilled = requiredFields.filter((f) => f.status === "filled").length;
 const requiredFieldsToConfirm = requiredFields.filter((f) => f.status === "to_confirm").length;
 const requiredFieldsMissing = requiredFields.filter((f) => f.status === "missing").length;
 const requiredDocs = documentsResolved.filter((d) => d.requirement.required);
 const requiredDocumentsFound = requiredDocs.filter((d) => d.match !== null).length;
 const totalRequired = requiredFields.length + requiredDocs.length;
 const totalDone = requiredFieldsFilled + requiredDocumentsFound;
 return { fields, documents: documentsResolved, checks, requiredFieldsTotal: requiredFields.length, requiredFieldsFilled, requiredFieldsToConfirm, requiredFieldsMissing, requiredDocumentsTotal: requiredDocs.length, requiredDocumentsFound, completeness: totalRequired === 0 ? 100 : Math.round((totalDone / totalRequired) * 100) };
}

export function buildExportSummary(template: ApplicationTemplate, organisme: Organisme, dispositif: Dispositif, instance: ApplicationInstance, projectTitle: string): string {
 const lines: string[] = [];
 lines.push("SUBVENTO — Récapitulatif de dossier");
 lines.push("Ceci est un aide-mémoire généré par Subvento — pas le formulaire officiel.");
 lines.push(`Vérifiez chaque information sur : ${dispositif.officialUrl}`);
 lines.push("", `Organisme : ${organisme.fullName}`, `Dispositif : ${dispositif.name}`, `Projet : ${projectTitle || "(sans titre)"}`, `Généré le : ${new Date().toLocaleDateString("fr-FR")}`, `Note : ${template.generationNote}`, "");
 lines.push(`— INFORMATIONS (${instance.requiredFieldsFilled}/${instance.requiredFieldsTotal} champs obligatoires) —`);
 instance.fields.forEach((f) => lines.push(`${f.field.label} : ${f.value || "(non renseigné)"}`));
 lines.push("", `— DOCUMENTS (${instance.requiredDocumentsFound}/${instance.requiredDocumentsTotal} obligatoires trouvés) —`);
 instance.documents.forEach((d) => lines.push(`${d.requirement.label} : ${d.match ? d.match.fileName : "manquant"}`));
 lines.push("", "— CONTRÔLES —");
 instance.checks.forEach((c) => lines.push(`${c.passed ? "OK" : "À VÉRIFIER"} — ${c.label}`));
 return lines.join("\n");
}
