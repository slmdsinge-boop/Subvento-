import type { MasterMusicApplication } from "./schema";
import type { VaultDocumentKind } from "./documents";
import type { VaultDocument } from "./documents";
const NON_PROGRESS_STEPS = new Set(["recap", "recapitulatif"]);
export function isStepComplete(
 step: string,
 application: MasterMusicApplication,
 documents: Partial<Record<VaultDocumentKind, VaultDocument>>
): boolean {
 const { applicant_profile, project_details } = application;
 switch (step) {
 case "statut":
 return Boolean(applicant_profile.legal_status);
 case "roles":
 return applicant_profile.artist_roles.length > 0;
 case "identite":
 return Boolean(applicant_profile.name && applicant_profile.email);
 case "photo":
 return true;
 case "projet":
 return Boolean(project_details.title && project_details.categories && project_details.categories.length > 0);
 case "documents":
 return Boolean(documents.rib_doc_id && documents.id_card_doc_id);
 default:
 return false;
 }
}
export function computeOverallProgress(
 steps: readonly string[],
 application: MasterMusicApplication,
 documents: Partial<Record<VaultDocumentKind, VaultDocument>>
): number {
 const relevant = steps.filter((s) => !NON_PROGRESS_STEPS.has(s));
 if (relevant.length === 0) return 0;
 const done = relevant.filter((s) => isStepComplete(s, application, documents)).length;
 return Math.round((done / relevant.length) * 100);
}
