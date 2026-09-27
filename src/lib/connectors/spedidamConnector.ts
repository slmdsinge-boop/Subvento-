import type { ApplicationTemplate } from "../applicationTemplate";
import type { FundingProviderConnector } from "./types";

const SPEDIDAM_SPECTACLE_MUSICAL_TEMPLATE: ApplicationTemplate = {
 id: "SPEDIDAM_SPECTACLE_MUSICAL_2026_V1",
 dispositifId: "SPEDIDAM_SPECTACLE_MUSICAL",
 version: "1.0",
 sourceUrl: "https://www.spedidam.fr/aides-aux-projets/nos-programmes/aide-au-spectacle-musical/",
 fetchedAt: "2026-09-27",
 generationNote:
  "Préparation Subvento fondée sur les critères publics SPEDIDAM du spectacle musical. Ce n'est PAS le formulaire ADEL. Le dossier officiel doit être soumis complet dans ADEL avant la date limite de la commission.",
 fields: [
  { id:"structure_name", label:"Structure porteuse", type:"text", required:true, sourcePath:"profile.structure.name" },
  { id:"siret", label:"SIRET", type:"text", required:true, sourcePath:"profile.structure.siret" },
  { id:"project_title", label:"Nom du spectacle", type:"text", required:true, sourcePath:"project.title" },
  { id:"project_description", label:"Présentation du spectacle", type:"textarea", required:true, sourcePath:"project.description", draftable:true },
  { id:"performance_count", label:"Nombre de représentations", type:"number", required:true, helpText:"Minimum 6 représentations." },
  { id:"performance_days", label:"Nombre de jours de représentations", type:"number", required:true, helpText:"Minimum 5 jours ; 4 jours pour les ensembles d'au moins 8 artistes présents sur scène sur l'ensemble des dates." },
  { id:"performer_count", label:"Nombre d'artistes-interprètes présents sur scène", type:"number", required:true },
  { id:"rehearsal_count", label:"Nombre de jours de répétition", type:"number", required:true, helpText:"Maximum 10 répétitions." },
  { id:"project_duration_months", label:"Durée totale du projet aidé (mois)", type:"number", required:true, helpText:"Maximum 6 mois." },
  { id:"employer_cost", label:"Coût total employeur des artistes-interprètes (€)", type:"number", required:true, helpText:"Minimum 6 000 €. L'aide ne peut excéder 40 %, ou 50 % pour un ensemble d'au moins 8 artistes." },
  { id:"rehearsal_gross_daily", label:"Rémunération brute minimale par jour de répétition (€)", type:"number", required:true, helpText:"Minimum SPEDIDAM publié : 120 € brut." },
  { id:"performance_gross_fee", label:"Rémunération brute minimale par cachet de représentation (€)", type:"number", required:true, helpText:"Minimum SPEDIDAM publié : 175 € brut." },
  { id:"dates_after_commission", label:"Toutes les dates aidées sont postérieures au dernier jour de la commission", type:"select", required:true, options:[{value:"yes",label:"Oui"},{value:"no",label:"Non"}] },
  { id:"firm_date_confirmed", label:"Au moins une date ferme est contractualisée et signée", type:"select", required:true, options:[{value:"yes",label:"Oui"},{value:"no",label:"Non"}], helpText:"La SPEDIDAM exige un contrat signé par les deux parties ; un courriel n'est pas accepté." },
  { id:"previous_grant_balance_requested", label:"Solde du précédent dossier SPEDIDAM demandé, le cas échéant", type:"select", required:true, options:[{value:"yes",label:"Oui"},{value:"not_applicable",label:"Aucun dossier précédent"}] },
  { id:"artistic_plan", label:"Présentation artistique et plan de diffusion", type:"textarea", required:true, draftable:true },
 ],
 documentRequirements: [
  { id:"performer_contract_model", label:"Modèle de contrat d'engagement des artistes-interprètes", attachmentLabelHints:["contrat","engagement","artiste","interprète","interprete"], required:true },
  { id:"signed_firm_date_contract", label:"Contrat signé pour une date ferme postérieure à la commission", attachmentLabelHints:["contrat","vente","location","salle","confirmation","spectacle"], required:true },
  { id:"budget_payroll", label:"Budget / coût employeur des artistes-interprètes", attachmentLabelHints:["budget","salaires","paie","masse salariale","employeur"], required:true },
  { id:"tour_schedule", label:"Calendrier des représentations et répétitions", attachmentLabelHints:["calendrier","dates","tournée","tournee","représentations","representations"], required:true },
 ],
};

export const spedidamConnector: FundingProviderConnector = {
 organismeId: "SPEDIDAM",
 capabilities: ["prefill","document_matching","export"],
 getApplicationTemplate(dispositifId) {
  return dispositifId === "SPEDIDAM_SPECTACLE_MUSICAL" ? SPEDIDAM_SPECTACLE_MUSICAL_TEMPLATE : null;
 },
};
