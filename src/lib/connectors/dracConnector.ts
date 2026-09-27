import type { ApplicationTemplate } from "../applicationTemplate";
import type { FundingProviderConnector } from "./types";

const DRAC_ADSV_MUSIQUE_TEMPLATE: ApplicationTemplate = {
 id: "DRAC_ADSV_MUSIQUE_PROJET_2026_V1",
 dispositifId: "DRAC_ADSV_MUSIQUE_PROJET",
 version: "1.0",
 sourceUrl: "https://www.culture.gouv.fr/catalogue-des-demarches-et-subventions/subvention/aides-aux-equipes-independantes-aides-deconcentrees-au-spectacle-vivant-adsv",
 fetchedAt: "2026-09-27",
 generationNote: "Préparation Subvento fondée sur la fiche nationale ADSV du ministère de la Culture. Le formulaire web officiel Aide au projet 2027 est identifié, mais aucun champ du portail n’est considéré comme préremplissable tant que son identifiant n’a pas été vérifié. Les calendriers et contacts restent régionaux.",
 officialForm:{sourceUrl:"https://demarche.numerique.gouv.fr/commencer/adsv_projet-2027",format:"web",versionLabel:"Aide au projet 2027",fetchedAt:"2026-09-27",fieldMap:{}},
 fields: [
  {id:"structure_name",label:"Structure porteuse",type:"text",required:true,sourcePath:"profile.structure.name"},
  {id:"siret",label:"SIRET",type:"text",required:true,sourcePath:"profile.structure.siret"},
  {id:"region",label:"Région de la structure / DRAC-DAC compétente",type:"text",required:true,helpText:"Détermine le calendrier, les contacts et les modalités applicables."},
  {id:"project_title",label:"Nom du projet musical",type:"text",required:true,sourcePath:"project.title"},
  {id:"project_description",label:"Présentation artistique du projet",type:"textarea",required:true,sourcePath:"project.description",draftable:true},
  {id:"project_type",label:"Nature du projet",type:"select",required:true,options:[{value:"creation",label:"Création"},{value:"diffusion",label:"Diffusion"},{value:"creation_diffusion",label:"Création et diffusion"}]},
  {id:"artistic_team",label:"Équipe artistique",type:"textarea",required:true,draftable:true},
  {id:"creation_schedule",label:"Calendrier de création / répétitions",type:"textarea",required:true},
  {id:"diffusion_schedule",label:"Calendrier et perspectives de diffusion",type:"textarea",required:true},
  {id:"partners",label:"Partenaires et lieux associés",type:"textarea",required:true},
  {id:"budget",label:"Budget prévisionnel du projet (€)",type:"number",required:true},
  {id:"requested_amount",label:"Montant sollicité auprès de la DRAC/DAC (€)",type:"number",required:true},
  {id:"regional_deadline_checked",label:"Calendrier de la DRAC/DAC vérifié pour la campagne en cours",type:"select",required:true,options:[{value:"yes",label:"Oui"},{value:"no",label:"Non"}],helpText:"Les dates diffèrent selon la région et la discipline."},
 ],
 documentRequirements:[
  {id:"artistic_file",label:"Dossier artistique / présentation du projet",attachmentLabelHints:["dossier artistique","présentation","projet"],required:true},
  {id:"budget",label:"Budget prévisionnel",attachmentLabelHints:["budget","prévisionnel","financement"],required:true},
  {id:"schedule",label:"Calendrier de création et de diffusion",attachmentLabelHints:["calendrier","création","diffusion","dates"],required:true},
  {id:"administrative",label:"Pièces administratives demandées par la DRAC/DAC compétente",attachmentLabelHints:["siret","statuts","rib","administratif"],required:true},
 ],
};

export const dracConnector: FundingProviderConnector={
 organismeId:"DRAC",
 capabilities:["prefill","document_matching","export"],
 getApplicationTemplate(dispositifId){return dispositifId==="DRAC_ADSV_MUSIQUE_PROJET"?DRAC_ADSV_MUSIQUE_TEMPLATE:null;},
};
