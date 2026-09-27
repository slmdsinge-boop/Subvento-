export interface AdsvRegionalMusicCalendar {
 region:string;
 deadline:string;
 commission?:string;
 sourceUrl:string;
 verifiedAt:string;
}
const SOURCE="https://www.culture.gouv.fr/catalogue-des-demarches-et-subventions/subvention/aides-aux-equipes-independantes-aides-deconcentrees-au-spectacle-vivant-adsv";
export const ADSV_MUSIC_2027_CALENDARS:AdsvRegionalMusicCalendar[]=[
 {region:"Auvergne-Rhône-Alpes",deadline:"2026-10-31T23:59:00+01:00",commission:"9, 10 et 11 mars 2027",sourceUrl:SOURCE,verifiedAt:"2026-09-27"},
 {region:"Bourgogne-Franche-Comté",deadline:"2026-11-03T23:59:00+01:00",commission:"21 janvier 2027",sourceUrl:SOURCE,verifiedAt:"2026-09-27"},
 {region:"Bretagne",deadline:"2026-11-15T23:59:00+01:00",commission:"début 2027",sourceUrl:SOURCE,verifiedAt:"2026-09-27"},
 {region:"Grand Est",deadline:"2026-09-30T23:59:00+02:00",commission:"10 décembre 2026",sourceUrl:SOURCE,verifiedAt:"2026-09-27"},
 {region:"Hauts-de-France",deadline:"2026-11-16T23:59:00+01:00",commission:"2 février 2027",sourceUrl:SOURCE,verifiedAt:"2026-09-27"},
 {region:"Île-de-France",deadline:"2026-12-15T23:59:00+01:00",commission:"2, 3 et 4 mars 2027",sourceUrl:SOURCE,verifiedAt:"2026-09-27"},
 {region:"La Réunion",deadline:"2026-11-30T23:59:00+04:00",commission:"février/mars 2027",sourceUrl:SOURCE,verifiedAt:"2026-09-27"},
 {region:"Occitanie",deadline:"2026-10-31T23:59:00+01:00",commission:"15 décembre 2026 à Montpellier",sourceUrl:SOURCE,verifiedAt:"2026-09-27"},
 {region:"Normandie",deadline:"2026-10-17T23:59:00+02:00",sourceUrl:SOURCE,verifiedAt:"2026-09-27"},
 {region:"Nouvelle-Aquitaine",deadline:"2026-12-14T23:59:00+01:00",sourceUrl:SOURCE,verifiedAt:"2026-09-27"},
 {region:"Pays de la Loire",deadline:"2026-10-31T23:59:00+01:00",sourceUrl:SOURCE,verifiedAt:"2026-09-27"},
 {region:"Provence-Alpes-Côte d'Azur",deadline:"2026-11-13T23:59:00+01:00",commission:"mars 2027",sourceUrl:SOURCE,verifiedAt:"2026-09-27"},
];
export function getAdsvMusicCalendar(region:string):AdsvRegionalMusicCalendar|undefined{
 const normalized=region.trim().toLocaleLowerCase("fr-FR");
 return ADSV_MUSIC_2027_CALENDARS.find(x=>x.region.toLocaleLowerCase("fr-FR")===normalized);
}
