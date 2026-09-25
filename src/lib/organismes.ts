export type OrganismeId = "CNM" | "SACEM" | "ADAMI" | "SPEDIDAM" | "DRAC";
export interface Organisme {
 id: OrganismeId;
 name: string;
 fullName: string;
 color: string;
 description: string;
 officialUrl: string;
}
export const ORGANISMES: Organisme[] = [
 { id:"CNM", name:"CNM", fullName:"Centre National de la Musique", color:"#2f6f5a", description:"Guichet principal du secteur musique et variétés : production phonographique, spectacle vivant et vidéo musicale. Propose plusieurs dispositifs distincts.", officialUrl:"https://cnm.fr/aides-financieres/" },
 { id:"SACEM", name:"SACEM", fullName:"Société des Auteurs, Compositeurs et Éditeurs de Musique", color:"#c9a24a", description:"Aides à la création et à l'édition pour les auteurs et compositeurs. Nécessite un numéro d'auteur SACEM actif.", officialUrl:"https://www.sacem.fr" },
 { id:"ADAMI", name:"ADAMI", fullName:"Société civile pour l'Administration des Droits des Artistes et Musiciens Interprètes", color:"#3e8e75", description:"Soutient les artistes-interprètes (voix, instruments) au titre des droits voisins : tournée, résidence, enregistrement.", officialUrl:"https://www.adami.fr" },
 { id:"SPEDIDAM", name:"SPEDIDAM", fullName:"Société de Perception et de Distribution des Droits des Artistes-Interprètes", color:"#4caf7d", description:"Aide les artistes-interprètes sur des projets collectifs (groupes, ensembles) pour la tournée et l'enregistrement.", officialUrl:"https://www.spedidam.fr" },
 { id:"DRAC", name:"DRAC", fullName:"Direction Régionale des Affaires Culturelles", color:"#8fae6f", description:"Financement régional de la création, souvent complémentaire aux aides nationales. Les modalités varient selon la région.", officialUrl:"https://www.culture.gouv.fr/regions" },
];
export function getOrganisme(id: OrganismeId): Organisme {
 const organisme=ORGANISMES.find((o)=>o.id===id);
 if(!organisme) throw new Error(`Organisme inconnu : ${id}`);
 return organisme;
}
