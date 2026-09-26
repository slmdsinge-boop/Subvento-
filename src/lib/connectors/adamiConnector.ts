import type { ApplicationTemplate } from "../applicationTemplate";
import type { FundingProviderConnector } from "./types";

const ADAMI_365_TEMPLATE: ApplicationTemplate = {
 id: "ADAMI_365_2026_V1",
 dispositifId: "ADAMI_365",
 version: "1.0",
 sourceUrl: "https://www.adami.fr/que-fait-ladami-pour-moi/cherche-financement-projet-artistique/projet-musical-global/",
 fetchedAt: "2026-09-26",
 generationNote:
  "Préparation Subvento fondée sur la fiche et les conditions publiques Adami 365. Ce n'est PAS le formulaire i-DA. Avant de déposer, l'artiste doit contacter l'Adami pour faire vérifier son accès au dispositif et recevoir la trame budgétaire officielle.",
 fields: [
  { id:"artist_name", label:"Artiste / groupe", type:"text", required:true, sourcePath:"profile.artist_name" },
  { id:"adami_id", label:"Numéro d'associé Adami", type:"text", required:true, sourcePath:"profile.affiliations.adami_id" },
  { id:"project_title", label:"Titre du projet global", type:"text", required:true, sourcePath:"project.title" },
  { id:"project_description", label:"Note d'intention / présentation du projet", type:"textarea", required:true, sourcePath:"project.description", draftable:true },
  { id:"structure_name", label:"Structure de production", type:"text", required:true, sourcePath:"profile.structure.name" },
  { id:"siret", label:"SIRET", type:"text", required:true, sourcePath:"profile.structure.siret" },
  { id:"artist_controls_structure", label:"Structure appartenant à l'artiste ou contrôlée par lui", type:"select", required:true, options:[{value:"yes",label:"Oui"},{value:"no",label:"Non"}] },
  { id:"majority_master_owner", label:"Structure productrice et propriétaire majoritaire du master", type:"select", required:true, options:[{value:"yes",label:"Oui"},{value:"no",label:"Non"}] },
  { id:"artistic_naf", label:"Code APE/NAF en rapport avec le champ artistique", type:"text", required:true },
  { id:"recording_component", label:"Volet enregistrement prévu", type:"select", required:true, options:[{value:"yes",label:"Oui"},{value:"no",label:"Non"}], helpText:"L'enregistrement est obligatoire dans Adami 365." },
  { id:"show_component", label:"Volet spectacle", type:"select", required:true, options:[{value:"yes",label:"Oui"},{value:"no",label:"Non"}] },
  { id:"promotion_component", label:"Volet promotion", type:"select", required:true, options:[{value:"yes",label:"Oui"},{value:"no",label:"Non"}] },
  { id:"audiovisual_component", label:"Volet production audiovisuelle", type:"select", required:true, options:[{value:"yes",label:"Oui"},{value:"no",label:"Non"}], helpText:"En plus de l'enregistrement, au moins deux volets parmi spectacle, promotion et audiovisuel sont requis." },
  { id:"recording_finished", label:"Prises de l'enregistrement déjà terminées", type:"select", required:true, options:[{value:"yes",label:"Oui"},{value:"no",label:"Non"}], helpText:"Au passage en commission, les prises ne doivent pas être terminées." },
  { id:"audiovisual_already_broadcast", label:"Projet audiovisuel déjà diffusé", type:"select", required:false, options:[{value:"yes",label:"Oui"},{value:"no",label:"Non"},{value:"not_applicable",label:"Non concerné"}], helpText:"Les projets audiovisuels du dispositif ne doivent jamais avoir été diffusés au passage en commission." },
  { id:"total_budget", label:"Budget global prévisionnel (€ HT)", type:"number", required:true, sourcePath:"project.estimated_budget" },
  { id:"recording_plan", label:"Enregistrement : équipe, studios et calendrier", type:"textarea", required:true, draftable:true },
  { id:"promotion_plan", label:"Plan promotion / marketing", type:"textarea", required:false, draftable:true },
  { id:"audiovisual_plan", label:"Projet audiovisuel : note d'intention, équipe et calendrier", type:"textarea", required:false, draftable:true },
  { id:"live_plan", label:"Création / diffusion : résidences, tourneur et concerts", type:"textarea", required:false, draftable:true },
 ],
 documentRequirements: [
  { id:"adami_365_budget", label:"Trame budgétaire prévisionnelle officielle Adami 365", attachmentLabelHints:["adami","365","budget","trame"], required:true },
  { id:"project_presentation", label:"Présentation détaillée artiste / groupe et projet global", attachmentLabelHints:["présentation","presentation","projet","dossier"], required:true },
  { id:"expense_evidence", label:"Devis / factures et éléments justifiant les dépenses significatives", attachmentLabelHints:["devis","facture","studio","artwork","presse","clip","captation"], required:true },
  { id:"artist_contract", label:"Contrat d'enregistrement / contrat d'artiste", attachmentLabelHints:["contrat","enregistrement","artiste"], required:true },
  { id:"distribution_contract", label:"Contrat de distribution ou licence, le cas échéant", attachmentLabelHints:["distribution","licence","label"], required:false },
  { id:"press_review", label:"Revue de presse des précédents EP / albums", attachmentLabelHints:["presse","press","revue"], required:true },
 ],
};

export const adamiConnector: FundingProviderConnector = {
 organismeId: "ADAMI",
 capabilities: ["prefill","document_matching","export"],
 getApplicationTemplate(dispositifId) {
  return dispositifId === "ADAMI_365" ? ADAMI_365_TEMPLATE : null;
 },
};
