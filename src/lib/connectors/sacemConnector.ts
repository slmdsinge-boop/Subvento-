import type { ApplicationTemplate } from "../applicationTemplate";
import type { FundingProviderConnector } from "./types";

const SACEM_AUTOPRODUCTION_TEMPLATE: ApplicationTemplate = {
 id: "SACEM_AUTOPRODUCTION_2026_V1",
 dispositifId: "SACEM_AIDE_CREATION",
 version: "1.0",
 sourceUrl: "https://aide-aux-projets.sacem.fr",
 fetchedAt: "2026-09-26",
 generationNote:
  "Liste préparatoire Subvento fondée sur les informations publiques SACEM disponibles pour l'aide à l'autoproduction. Ce n'est PAS une copie du formulaire privé de l'espace Aide aux projets. Les critères, le calendrier et les pièces affichés dans l'espace SACEM au moment du dépôt restent la référence.",
 fields: [
  { id:"member_name", label:"Nom du membre SACEM", type:"text", required:true, sourcePath:"profile.name" },
  { id:"sacem_id", label:"Numéro de membre SACEM", type:"text", required:true, sourcePath:"profile.affiliations.sacem_id" },
  { id:"email", label:"E-mail de contact", type:"text", required:true, sourcePath:"profile.email" },
  { id:"phone", label:"Téléphone", type:"text", required:false, sourcePath:"profile.phone" },
  { id:"artist_name", label:"Nom d'artiste / groupe", type:"text", required:true, sourcePath:"profile.artist_name" },
  { id:"project_title", label:"Titre de l'enregistrement", type:"text", required:true, sourcePath:"project.title" },
  { id:"project_description", label:"Présentation du projet", type:"textarea", required:true, sourcePath:"project.description", draftable:true },
  { id:"track_count", label:"Nombre de titres", type:"number", required:true, sourcePath:"project.track_count", helpText:"Le programme vise un enregistrement finalisé comportant au moins 5 titres." },
  { id:"autoproduction_rank", label:"Rang de l'autoproduction", type:"select", required:true, options:[{value:"1",label:"1re autoproduction"},{value:"2",label:"2e autoproduction"},{value:"3",label:"3e autoproduction"}], helpText:"Le programme vise la 1re, 2e et/ou 3e autoproduction." },
  { id:"recording_finalized", label:"Enregistrement finalisé", type:"select", required:true, options:[{value:"yes",label:"Oui"},{value:"no",label:"Non"}] },
  { id:"professional_environment", label:"Environnement professionnel", type:"textarea", required:true, helpText:"Indiquez l'éditeur, management, producteur de spectacle, tourneur, salle ou dispositif d'accompagnement associé au projet." },
  { id:"target_release_date", label:"Date de sortie", type:"date", required:false, sourcePath:"project.target_release_date" },
  { id:"total_budget", label:"Budget prévisionnel (€)", type:"number", required:false, sourcePath:"project.estimated_budget" },
  { id:"artistic_presentation", label:"Présentation artistique", type:"textarea", required:true, draftable:true },
  { id:"development_strategy", label:"Stratégie de sortie et développement", type:"textarea", required:true, draftable:true },
 ],
 documentRequirements: [
  { id:"professional_environment_proof", label:"Justificatif / présentation de l'environnement professionnel", attachmentLabelHints:["management","éditeur","editeur","tourneur","producteur","accompagnement","contrat"], required:true },
  { id:"press_kit", label:"Dossier de presse / présentation artistique", attachmentLabelHints:["presse","press","présentation","presentation"], required:false },
  { id:"budget", label:"Budget du projet", attachmentLabelHints:["budget","prévisionnel","previsionnel"], required:false },
 ],
};

export const sacemConnector: FundingProviderConnector = {
 organismeId: "SACEM",
 capabilities: ["prefill","document_matching","export"],
 getApplicationTemplate(dispositifId) {
  return dispositifId === "SACEM_AIDE_CREATION" ? SACEM_AUTOPRODUCTION_TEMPLATE : null;
 },
};
