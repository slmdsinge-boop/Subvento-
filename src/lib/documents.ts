export type VaultDocumentKind = "kbis_doc_id" | "rib_doc_id" | "id_card_doc_id";
export type DocumentStatus = "manquant" | "en_attente" | "valide" | "rejete";
export interface VaultDocument {
 id: string;
 kind: VaultDocumentKind;
 fileName: string;
 sizeBytes: number;
 mimeType: string;
 dataUrl: string;
 uploadedAt: string;
 status: DocumentStatus;
}
export const VAULT_DOCUMENT_LABELS: Record<VaultDocumentKind, string> = {
 kbis_doc_id: "Extrait Kbis / SIRENE",
 rib_doc_id: "RIB",
 id_card_doc_id: "Pièce d'identité",
};
export const VAULT_DOCUMENT_HINTS: Record<VaultDocumentKind, string> = {
 kbis_doc_id: "Extrait de moins de 3 mois, au nom de votre structure. Format PDF ou image.",
 rib_doc_id: "Relevé d'identité bancaire au nom du bénéficiaire des fonds (vous ou votre structure).",
 id_card_doc_id: "Carte d'identité ou passeport en cours de validité, recto-verso si nécessaire.",
};
export const VAULT_DOCUMENT_SCAN_ASPECT: Record<VaultDocumentKind, number> = {
 id_card_doc_id: 1.586,
 rib_doc_id: 0.72,
 kbis_doc_id: 0.72,
};
export const VAULT_DOCUMENT_SCAN_INSTRUCTIONS: Record<VaultDocumentKind, string> = {
 id_card_doc_id: "Cadrez le recto de votre pièce d'identité dans le cadre.",
 rib_doc_id: "Cadrez l'ensemble de votre RIB dans le cadre.",
 kbis_doc_id: "Cadrez l'ensemble de votre extrait Kbis dans le cadre.",
};
