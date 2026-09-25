import type { DispositifId } from "./dispositifs";
import type { VaultDocumentKind } from "./documents";
export type ApplicationFieldType = "text" | "textarea" | "number" | "date" | "select";
export interface ApplicationFieldOption {
value: string;
 label: string;
}
export interface ApplicationFieldDef {
 id: string;
 label: string;
 type: ApplicationFieldType;
 required: boolean;
 helpText?: string;
 /**
 * Chemin vers une donn√©e d√©j√† connue de Subvento (ex. "profile.siret", "project.title").
 * R√©solu par applicationEngine.resolveSourceValue ‚Äî jamais devin√©.
 */
 sourcePath?: string;
 /** Champ r√©dactionnel √©ligible √† l'assembleur de brouillon (section 6) ‚Äî jamais une IA qui invente des faits.
*/
 draftable?: boolean;
 options?: ApplicationFieldOption[];
}
export interface ApplicationDocumentRequirementDef {
 id: string;
 label: string;
 /** Recherche prioritaire dans le coffre-fort par nature de document. */
 vaultKind?: VaultDocumentKind;
 /** √Ä d√©faut, recherche par correspondance approximative de libell√© dans les pi√®ces jointes du projet. */
 attachmentLabelHints?: string[];
 required: boolean;
}
export type ConnectorCapability =
 | "template_download"
 | "prefill"
 | "document_matching"
 | "export"
 | "assisted_submission"
 | "api_submission"
 | "status_tracking";
export const CONNECTOR_CAPABILITY_LABELS: Record<ConnectorCapability, string> = {
 template_download: "R√©cup√©ration du formulaire",
 prefill: "Pr√©remplissage",
 document_matching: "Rapprochement des documents",
 export: "Export du dossier",
 assisted_submission: "D√©p√¥t assist√©",
 api_submission: "D√©p√¥t automatique (API)",
 status_tracking: "Suivi du statut",
};
export interface ApplicationTemplate {
 id: string;
 dispositifId: DispositifId;
 /** Version du mod√®le Subvento (pas n√©cessairement celle du formulaire officiel ‚Äî voir generationNote). */
 version: string;
 sourceUrl: string;
 fetchedAt: string;
 fields: ApplicationFieldDef[];
 documentRequirements: ApplicationDocumentRequirementDef[];
/**
 * Rappel de fiabilit√© obligatoire : pr√©cise si le template reproduit fid√®lement un formulaire
 * officiel r√©cup√©r√©, ou s'il s'agit d'une liste pr√©paratoire construite par Subvento √† partir
 * d'informations publiques. Ne jamais pr√©senter l'un comme l'autre.
 */
 generationNote: string;
}
