import type { ApplicantProfile, ArtistRole, ProjectDetails } from "./schema";
import { getOrganisme, type Organisme } from "./organismes";
import { DISPOSITIFS, type Dispositif } from "./dispositifs";

/** Verdict global d'un dispositif pour ce profil + projet. Jamais une promesse d'obtention. */
export type EligibilityState = "compatible" | "informations_manquantes" | "bloquant";
export const ELIGIBILITY_STATE_LABELS: Record<EligibilityState, string> = {
 compatible: "Potentiellement compatible",
 informations_manquantes: "Informations manquantes",
 bloquant: "Critère bloquant identifié",
};
export const ELIGIBILITY_STATE_COLORS: Record<EligibilityState, string> = {
 compatible: "var(--color-success)",
 informations_manquantes: "var(--color-warning)",
 bloquant: "var(--color-text-faint)",
};
export type CriterionState = "ok" | "missing" | "blocking";
export interface EligibilityCriterion { label: string; state: CriterionState; }
export interface DispositifMatch {
 dispositif: Dispositif;
 organisme: Organisme;
 state: EligibilityState;
 /** Critères réellement évalués à partir des données enregistrées — jamais un pourcentage arbitraire. */
 criteria: EligibilityCriterion[];
 /** Rappels toujours affichés — n'influencent pas le verdict. */
 advisories: string[];
}
function deriveState(criteria: EligibilityCriterion[]): EligibilityState {
 if (criteria.some((c) => c.state === "blocking")) return "bloquant";
 if (criteria.some((c) => c.state === "missing")) return "informations_manquantes";
 return "compatible";
}
export function computeDispositifMatches(profile: ApplicantProfile, project: ProjectDetails): DispositifMatch[] {
 return DISPOSITIFS.map((dispositif) => {
  const criteria: EligibilityCriterion[] = [];
  const advisories: string[] = [];
  if (!project.categories || project.categories.length === 0) criteria.push({ label: "Catégorie de projet à préciser", state: "missing" });
  else if (project.categories.some((c) => dispositif.eligibleCategories.includes(c))) criteria.push({ label: "Catégorie de projet compatible", state: "ok" });
  else criteria.push({ label: "Ne finance pas les catégories sélectionnées", state: "blocking" });
  if (dispositif.eligibleRoles !== "ANY") {
   if (profile.artist_roles.length === 0) criteria.push({ label: "Rôles artistiques à renseigner", state: "missing" });
   else if (profile.artist_roles.some((r) => (dispositif.eligibleRoles as ArtistRole[]).includes(r))) criteria.push({ label: "Au moins un de vos rôles est concerné", state: "ok" });
   else criteria.push({ label: "Aucun de vos rôles ne correspond à ce dispositif", state: "blocking" });
  }
  if (dispositif.excludedLegalStatuses) {
   if (!profile.legal_status) criteria.push({ label: "Statut juridique à renseigner", state: "missing" });
   else if (dispositif.excludedLegalStatuses.includes(profile.legal_status)) criteria.push({ label: "Nécessite une structure juridique (association, société, auto-entreprise…)", state: "blocking" });
   else criteria.push({ label: "Statut juridique compatible", state: "ok" });
  }
  if (dispositif.requiredAffiliationField) {
   const value = profile.affiliations?.[dispositif.requiredAffiliationField];
   const organismeName = getOrganisme(dispositif.organismeId).name;
   criteria.push(value ? { label: `Identifiant ${organismeName} renseigné`, state: "ok" } : { label: `Identifiant ${organismeName} non renseigné`, state: "missing" });
  }
  advisories.push("Montant, taux de financement et critères précis dépendent de votre dossier — à confirmer sur la source officielle avant dépôt.");
  if (!dispositif.active) advisories.push("Ce dispositif est actuellement marqué inactif dans notre base — vérifiez son ouverture avant de vous engager.");
  return { dispositif, organisme: getOrganisme(dispositif.organismeId), state: deriveState(criteria), criteria, advisories };
 });
}
export interface ChecklistItem { label: string; dispositifNames: string[]; }
/** Consolide les pièces requises de chaque dispositif compatible en une checklist dédupliquée. */
export function computePreparationChecklist(matches: DispositifMatch[]): ChecklistItem[] {
 const byLabel = new Map<string, Set<string>>();
 matches.filter((m) => m.state === "compatible").forEach((m) => {
  m.dispositif.requiredDocuments.forEach((doc) => {
   if (!byLabel.has(doc)) byLabel.set(doc, new Set());
   byLabel.get(doc)!.add(m.dispositif.name);
  });
 });
 return Array.from(byLabel.entries()).map(([label, dispositifNames]) => ({ label, dispositifNames: Array.from(dispositifNames) }));
}
