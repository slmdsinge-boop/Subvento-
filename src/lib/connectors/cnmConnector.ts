import type { ApplicationTemplate } from "../applicationTemplate";
import type { DispositifId } from "../dispositifs";
import type { FundingProviderConnector } from "./types";
const CNM_PROD_PHONO_TEMPLATE: ApplicationTemplate = {
 id: "CNM_PROD_PHONO_V1",
 dispositifId: "CNM_PROD_PHONO",
 version: "1.0",
 sourceUrl: "https://cnm.fr/aides-financieres/aide-a-la-production-phonographique-3/",
 fetchedAt: "2026-09-25",
 generationNote:
 "Liste préparatoire construite par Subvento à partir des informations publiques du dispositif (nature des pièces demandées, catégories concernées). Ce n'est PAS une copie du formulaire officiel CNM, dont Subvento ne récupère pas encore automatiquement les champs exacts. Vérifiez chaque champ sur l'espace CNM avant tout dépôt réel.",
 fields: [
 { id: "structure_name", label: "Nom de la structure", type: "text", required: true, sourcePath: "profile.name" },
 { id: "siret", label: "SIRET", type: "text", required: true, sourcePath: "profile.siret" },
 { id: "legal_representative", label: "Représentant légal", type: "text", required: true, sourcePath: "profile.legal_representative_name" },
 { id: "address", label: "Adresse de la structure", type: "text", required: true, sourcePath: "profile.address" },
 { id: "email", label: "E-mail de contact", type: "text", required: true, sourcePath: "profile.email" },
 { id: "phone", label: "Téléphone", type: "text", required: false, sourcePath: "profile.phone" },
 { id: "cnm_space_id", label: "Identifiant espace CNM", type: "text", required: true, sourcePath: "profile.affiliations.cnm_space_id" },
 { id: "artist_name", label: "Nom d'artiste / groupe", type: "text", required: false, sourcePath: "profile.artist_name" },
 { id: "project_title", label: "Titre du projet", type: "text", required: true, sourcePath: "project.title" },
 { id: "project_description", label: "Présentation du projet", type: "textarea", required: true, sourcePath: "project.description", draftable: true, helpText: "Brouillon disponible à partir de vos données si le champ est vide." },
 { id: "project_category", label: "Catégorie du projet", type: "text", required: true, sourcePath: "project.categories" },
 { id: "track_count", label: "Nombre de titres", type: "number", required: true, sourcePath: "project.track_count" },
 { id: "territory", label: "Territoire", type: "text", required: false, sourcePath: "project.territory" },
 { id: "target_release_date", label: "Date de sortie visée", type: "date", required: true, sourcePath: "project.target_release_date" },
 { id: "total_budget", label: "Budget prévisionnel total (€)", type: "number", required: true, sourcePath: "project.estimated_budget" },
 { id: "requested_amount", label: "Montant de l'aide demandée (€)", type: "number", required: true, helpText: "Propre à ce dispositif — à saisir manuellement." },
 { id: "press_kit_url", label: "Dossier de presse (lien)", type: "text", required: false, sourcePath: "profile.press_kit_url" },
 { id: "artistic_presentation", label: "Présentation artistique", type: "textarea", required: true, draftable: true, helpText: "Parcours, expérience, positionnement artistique." },
 { id: "development_strategy", label: "Stratégie de diffusion / développement", type: "textarea", required: true, draftable: true, helpText: "Comment le projet sera-t-il diffusé et développé." },
 ],
 documentRequirements: [
 { id: "rib", label: "RIB", vaultKind: "rib_doc_id", required: true },
 { id: "kbis", label: "Extrait Kbis / SIRENE", vaultKind: "kbis_doc_id", required: true },
 { id: "devis_studio", label: "Devis studio", attachmentLabelHints: ["devis", "studio"], required: true },
 { id: "dossier_presse", label: "Dossier de presse", attachmentLabelHints: ["presse", "press"], required: false },
 ],
};
const CNM_SPECTACLE_VIVANT_TEMPLATE: ApplicationTemplate = {
 id: "CNM_SPECTACLE_VIVANT_V1",
 dispositifId: "CNM_SPECTACLE_VIVANT",
 version: "1.0",
 sourceUrl: "https://cnm.fr/aides-financieres/aide-a-la-production-et-a-la-diffusion-de-spectacle-vivant/",
 fetchedAt: "2026-09-26",
 generationNote:
 "Liste préparatoire construite par Subvento à partir des informations publiques du dispositif CNM mises à jour le 28 janvier 2026. Ce n'est PAS une copie du fichier de demande officiel. Le CNM demande de télécharger puis déposer le fichier de demande complété sur monespacepro.cnm.fr. Vérifiez les informations et pièces dans le fichier officiel avant tout dépôt réel.",
 fields: [
  { id: "structure_name", label: "Nom de la structure", type: "text", required: true, sourcePath: "profile.name" },
  { id: "siret", label: "SIRET", type: "text", required: true, sourcePath: "profile.siret" },
  { id: "legal_representative", label: "Représentant légal", type: "text", required: true, sourcePath: "profile.legal_representative_name" },
  { id: "address", label: "Adresse de la structure", type: "text", required: true, sourcePath: "profile.address" },
  { id: "email", label: "E-mail de contact", type: "text", required: true, sourcePath: "profile.email" },
  { id: "phone", label: "Téléphone", type: "text", required: false, sourcePath: "profile.phone" },
  { id: "cnm_space_id", label: "Identifiant espace CNM", type: "text", required: true, sourcePath: "profile.affiliations.cnm_space_id" },
  { id: "licence_2", label: "Licence d'entrepreneur de spectacles — catégorie 2", type: "text", required: true, helpText: "Le demandeur doit être une entité de production de spectacle vivant titulaire de la licence 2." },
  { id: "project_title", label: "Titre du spectacle / projet", type: "text", required: true, sourcePath: "project.title" },
  { id: "project_description", label: "Présentation du projet", type: "textarea", required: true, sourcePath: "project.description", draftable: true },
  { id: "project_category", label: "Catégorie du projet", type: "text", required: true, sourcePath: "project.categories" },
  { id: "territory", label: "Territoire de diffusion", type: "text", required: true, sourcePath: "project.territory" },
  { id: "representation_count", label: "Nombre de représentations fermement confirmées", type: "number", required: true, helpText: "Le seuil dépend de l'esthétique : vérifiez le règlement CNM en vigueur." },
  { id: "activity_years", label: "Ancienneté d'activité de la structure (années)", type: "number", required: true, helpText: "Le CNM exige au moins une année d'activité." },
  { id: "total_budget", label: "Budget prévisionnel total (€)", type: "number", required: true, sourcePath: "project.estimated_budget" },
  { id: "requested_amount", label: "Montant de l'aide demandée (€)", type: "number", required: true, helpText: "Le montant total de l'aide est plafonné par le règlement CNM en vigueur." },
  { id: "artistic_presentation", label: "Présentation artistique", type: "textarea", required: true, draftable: true },
  { id: "development_strategy", label: "Stratégie de production et de diffusion", type: "textarea", required: true, draftable: true },
 ],
 documentRequirements: [
  { id: "rib", label: "RIB", vaultKind: "rib_doc_id", required: true },
  { id: "kbis", label: "Extrait Kbis / SIRENE", vaultKind: "kbis_doc_id", required: true },
  { id: "planning", label: "Planning / liste des représentations confirmées", attachmentLabelHints: ["planning", "représentation", "representation", "dates", "tournée", "tournee"], required: true },
  { id: "confirmations", label: "Écrits confirmant les représentations", attachmentLabelHints: ["confirmation", "contrat", "cession", "engagement"], required: true },
  { id: "budget", label: "Budget prévisionnel détaillé", attachmentLabelHints: ["budget", "prévisionnel", "previsionnel"], required: true },
 ],
};
const TEMPLATES_BY_DISPOSITIF: Partial<Record<DispositifId, ApplicationTemplate>> = {
 CNM_PROD_PHONO: CNM_PROD_PHONO_TEMPLATE,
 CNM_SPECTACLE_VIVANT: CNM_SPECTACLE_VIVANT_TEMPLATE,
};
export const cnmConnector: FundingProviderConnector = {
 organismeId: "CNM",
 capabilities: ["template_download", "prefill", "document_matching", "export"],
 getApplicationTemplate(dispositifId) { return TEMPLATES_BY_DISPOSITIF[dispositifId] ?? null; },
};
