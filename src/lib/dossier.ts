import type { DispositifId } from "./dispositifs";
import type { ProjectDetails } from "./schema";

export const DOSSIER_STATUSES = ["brouillon","a_completer","pret","depose","en_instruction","accepte","refuse","a_justifier","cloture"] as const;
export type DossierStatus = (typeof DOSSIER_STATUSES)[number];

export const DOSSIER_STATUS_LABELS: Record<DossierStatus,string> = {
 brouillon:"Brouillon", a_completer:"À compléter", pret:"Prêt à déposer", depose:"Déposé",
 en_instruction:"En instruction", accepte:"Accepté", refuse:"Refusé", a_justifier:"À justifier", cloture:"Clôturé",
};
export const DOSSIER_STATUS_COLORS: Record<DossierStatus,string> = {
 brouillon:"var(--color-text-faint)", a_completer:"var(--color-warning)", pret:"var(--color-accent)",
 depose:"var(--color-gold)", en_instruction:"var(--color-warning)", accepte:"var(--color-success)",
 refuse:"var(--color-error)", a_justifier:"var(--color-warning)", cloture:"var(--color-text-faint)",
};

export const DISPOSITIF_TRACKING_STATUSES = [
 "non_eligible","eligible","brouillon","incomplet","a_valider","pret","depot_en_cours","depose",
 "en_instruction","complement_demande","accepte","refuse","versement_en_cours","a_justifier","cloture",
] as const;
export type DispositifTrackingStatus = (typeof DISPOSITIF_TRACKING_STATUSES)[number];

export const DISPOSITIF_TRACKING_STATUS_LABELS: Record<DispositifTrackingStatus,string> = {
 non_eligible:"Non éligible", eligible:"Éligible — à préparer", brouillon:"Brouillon", incomplet:"Incomplet",
 a_valider:"À valider", pret:"Prêt à déposer", depot_en_cours:"Dépôt en cours", depose:"Déposé",
 en_instruction:"En instruction", complement_demande:"Complément demandé", accepte:"Accepté", refuse:"Refusé",
 versement_en_cours:"Versement en cours", a_justifier:"À justifier", cloture:"Clôturé",
};
export const DISPOSITIF_TRACKING_STATUS_COLORS: Record<DispositifTrackingStatus,string> = {
 non_eligible:"var(--color-text-faint)", eligible:"var(--color-accent)", brouillon:"var(--color-text-faint)",
 incomplet:"var(--color-warning)", a_valider:"var(--color-warning)", pret:"var(--color-accent)",
 depot_en_cours:"var(--color-gold)", depose:"var(--color-gold)", en_instruction:"var(--color-warning)",
 complement_demande:"var(--color-warning)", accepte:"var(--color-success)", refuse:"var(--color-error)",
 versement_en_cours:"var(--color-accent)", a_justifier:"var(--color-warning)", cloture:"var(--color-text-faint)",
};

export type SubmissionFieldProvenance = "profile" | "project" | "manual" | "draft";
export interface SubmissionFieldSnapshot { fieldId:string; label:string; value:string; provenance:SubmissionFieldProvenance; }
export interface SubmissionDocumentSnapshot { requirementId:string; label:string; fileName:string|null; }
export type DepositMode = "export" | "assisted" | "api";

export interface ApplicationSubmissionRecord {
 templateId:string; templateVersion:string; validatedAt:string; validatedByName:string;
 fieldsSnapshot:SubmissionFieldSnapshot[]; documentsSnapshot:SubmissionDocumentSnapshot[];
 depositMode:DepositMode|null; exportedAt:string|null; confirmationRef:string|null;
}
export interface DossierDispositifTracking {
 dispositifId:DispositifId;
 status:DispositifTrackingStatus;
 montantDemande:number|null;
 montantPercu:number|null;
 manualFieldValues?:Record<string,string>;
 draftValues?:Record<string,{text:string;accepted:boolean}>;
 submission?:ApplicationSubmissionRecord;
}
export interface Dossier {
 id:string; project:ProjectDetails; status:DossierStatus; createdAt:string; submittedAt:string|null;
 dispositifs:DossierDispositifTracking[]; checkedItems:string[];
}
export function dossierTotals(dossier:Dossier):{demande:number;percu:number}{
 return dossier.dispositifs.reduce((acc,f)=>({demande:acc.demande+(f.montantDemande??0),percu:acc.percu+(f.montantPercu??0)}),{demande:0,percu:0});
}
export function dossierProgress(dossier:Dossier):number{
 switch(dossier.status){
  case "brouillon": return 0;
  case "a_completer": return 10;
  case "pret": return 20;
  case "a_justifier": return 75;
  case "accepte":
  case "refuse": return 90;
  case "cloture": return 100;
  case "depose":
  case "en_instruction":{
   const trackable=dossier.dispositifs.filter((f)=>f.status!=="non_eligible");
   if(trackable.length===0) return 35;
   const resolved=trackable.filter((f)=>f.status==="accepte"||f.status==="refuse").length;
   return Math.round(35+55*(resolved/trackable.length));
  }
  default:return 0;
 }
}
