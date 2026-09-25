import { z } from "zod";
export const LEGAL_STATUSES=["AUTO_ENTREPRENEUR","ASSOCIATION","EURL_SARL","SAS_SASU","ARTISTE_AUTEUR_INDIVIDUEL","PARTICULIER"] as const;
export type LegalStatus=(typeof LEGAL_STATUSES)[number];
export const ARTIST_ROLES=["CHANTEUR","RAPPEUR","DJ","BEATMAKER","INSTRUMENTISTE","COMPOSITEUR","PRODUCTEUR"] as const;
export type ArtistRole=(typeof ARTIST_ROLES)[number];
export const PROJECT_CATEGORIES=["RECORDING_ALBUM_EP","LIVE_SHOW_TOUR","MUSIC_VIDEO","CREATION_RESIDENCY"] as const;
export type ProjectCategory=(typeof PROJECT_CATEGORIES)[number];
export const ACTIVITY_TYPES=["ARTISTE_SOLO","GROUPE","PRODUCTEUR","LABEL"] as const;
export type ActivityType=(typeof ACTIVITY_TYPES)[number];
export const ACTIVITY_TYPE_LABELS:Record<ActivityType,string>={ARTISTE_SOLO:"Artiste solo",GROUPE:"Groupe",PRODUCTEUR:"Producteur",LABEL:"Label"};
export const PROJECT_STATUSES=["IDEE","EN_PREPARATION","EN_COURS","TERMINE"] as const;
export type ProjectStatus=(typeof PROJECT_STATUSES)[number];
export const PROJECT_STATUS_LABELS:Record<ProjectStatus,string>={IDEE:"Idée",EN_PREPARATION:"En préparation",EN_COURS:"En cours",TERMINE:"Terminé"};
export const legalStatusSchema=z.enum(LEGAL_STATUSES);
export const artistRoleSchema=z.enum(ARTIST_ROLES);
export const projectCategorySchema=z.enum(PROJECT_CATEGORIES);
export const activityTypeSchema=z.enum(ACTIVITY_TYPES);
export const projectStatusSchema=z.enum(PROJECT_STATUSES);
export const applicantProfileSchema=z.object({
 legal_status:legalStatusSchema.optional(),name:z.string().min(1,"Le nom est requis").optional().or(z.literal("")),
 siret:z.string().regex(/^[0-9]{14}$/,"Le SIRET doit contenir exactement 14 chiffres").optional().or(z.literal("")),
 email:z.string().email("Adresse e-mail invalide").optional().or(z.literal("")),date_of_birth:z.string().optional().or(z.literal("")),
 photo_data_url:z.string().nullable().optional(),phone:z.string().optional().or(z.literal("")),address:z.string().optional().or(z.literal("")),
 structure_created_at:z.string().optional().or(z.literal("")),legal_representative_name:z.string().optional().or(z.literal("")),
 activity_type:activityTypeSchema.optional(),artist_name:z.string().optional().or(z.literal("")),artist_roles:z.array(artistRoleSchema).default([]),
 release_count:z.coerce.number().int().nonnegative().optional(),concerts_count:z.coerce.number().int().nonnegative().optional(),
 press_kit_url:z.string().optional().or(z.literal("")),
 catalog_links:z.object({spotify:z.string().optional().or(z.literal("")),apple_music:z.string().optional().or(z.literal("")),deezer:z.string().optional().or(z.literal("")),youtube:z.string().optional().or(z.literal("")),instagram:z.string().optional().or(z.literal("")),tiktok:z.string().optional().or(z.literal(""))}).default({}),
 affiliations:z.object({sacem_id:z.string().optional().or(z.literal("")),adami_id:z.string().optional().or(z.literal("")),spedidam_id:z.string().optional().or(z.literal("")),cnm_space_id:z.string().optional().or(z.literal(""))}).default({}),
});
export const projectAttachmentSchema=z.object({id:z.string(),label:z.string(),fileName:z.string(),dataUrl:z.string(),uploadedAt:z.string()});
export const projectDetailsSchema=z.object({title:z.string().optional().or(z.literal("")),description:z.string().optional().or(z.literal("")),status:projectStatusSchema.optional(),categories:z.array(projectCategorySchema).default([]),territory:z.string().optional().or(z.literal("")),target_release_date:z.string().optional().or(z.literal("")),estimated_budget:z.coerce.number().nonnegative().optional(),track_count:z.coerce.number().int().nonnegative().optional(),attachments:z.array(projectAttachmentSchema).default([])});
export const vaultDocumentsSchema=z.object({kbis_doc_id:z.string().optional().or(z.literal("")),rib_doc_id:z.string().optional().or(z.literal("")),id_card_doc_id:z.string().optional().or(z.literal(""))});
export const masterMusicApplicationSchema=z.object({applicant_profile:applicantProfileSchema,project_details:projectDetailsSchema,vault_documents:vaultDocumentsSchema});
export type ApplicantProfile=z.infer<typeof applicantProfileSchema>; export type ProjectAttachment=z.infer<typeof projectAttachmentSchema>; export type ProjectDetails=z.infer<typeof projectDetailsSchema>; export type VaultDocuments=z.infer<typeof vaultDocumentsSchema>; export type MasterMusicApplication=z.infer<typeof masterMusicApplicationSchema>;
export const emptyApplication:MasterMusicApplication={applicant_profile:{artist_roles:[],affiliations:{},catalog_links:{}},project_details:{categories:[],attachments:[]},vault_documents:{}};
export function computeProfileCompleteness(profile:ApplicantProfile):number{const checks=[Boolean(profile.legal_status),profile.artist_roles.length>0,Boolean(profile.name),Boolean(profile.email),Boolean(profile.date_of_birth),Boolean(profile.activity_type),Boolean(profile.artist_name),Boolean(profile.phone),Boolean(profile.address),Boolean(profile.siret),Boolean(profile.structure_created_at),Boolean(profile.legal_representative_name),profile.release_count!==undefined,profile.concerts_count!==undefined,Boolean(profile.press_kit_url),Object.values(profile.catalog_links??{}).some(Boolean),Object.values(profile.affiliations??{}).some(Boolean)];return Math.round((checks.filter(Boolean).length/checks.length)*100);}
export const LEGAL_STATUS_LABELS:Record<LegalStatus,string>={AUTO_ENTREPRENEUR:"Auto-entrepreneur",ASSOCIATION:"Association loi 1901",EURL_SARL:"EURL / SARL",SAS_SASU:"SAS / SASU",ARTISTE_AUTEUR_INDIVIDUEL:"Artiste-auteur individuel",PARTICULIER:"Particulier (sans structure)"};
export const LEGAL_STATUS_DESCRIPTIONS:Record<LegalStatus,string>={
 AUTO_ENTREPRENEUR:"Vous facturez vos prestations sous votre propre numéro SIRET en micro-entreprise. Justificatifs demandés : extrait SIRENE de moins de 3 mois, RIB à votre nom, dernière déclaration de chiffre d'affaires URSSAF.",
 ASSOCIATION:"Votre projet est porté par une association loi 1901 (label, collectif, structure de production). Justificatifs demandés : statuts déposés, récépissé de déclaration en préfecture, liste des membres du bureau, RIB au nom de l'association.",
 EURL_SARL:"Votre activité est exercée via une société (EURL ou SARL). Justificatifs demandés : extrait Kbis de moins de 3 mois, statuts, RIB professionnel au nom de la société.",
 SAS_SASU:"Votre activité est exercée via une SAS ou SASU. Justificatifs demandés : extrait Kbis de moins de 3 mois, statuts, RIB professionnel au nom de la société.",
 ARTISTE_AUTEUR_INDIVIDUEL:"Vous percevez des droits d'auteur ou des cachets en tant qu'artiste-auteur (régime Urssaf Artistes-Auteurs). Justificatifs demandés : attestation d'affiliation Urssaf Artistes-Auteurs, RIB personnel, pièce d'identité.",
 PARTICULIER:"Vous n'avez pas encore de structure juridique ni de statut professionnel. Certaines aides resteront limitées, mais vous pouvez tout de même explorer les bourses ouvertes aux particuliers. Justificatifs demandés : pièce d'identité, RIB personnel."};
export const ARTIST_ROLE_LABELS:Record<ArtistRole,string>={CHANTEUR:"Chanteur·se",RAPPEUR:"Rappeur·se",DJ:"DJ",BEATMAKER:"Beatmaker",INSTRUMENTISTE:"Instrumentiste",COMPOSITEUR:"Compositeur·rice",PRODUCTEUR:"Producteur·rice"};
export const ARTIST_ROLE_DESCRIPTIONS:Record<ArtistRole,string>={CHANTEUR:"Interprète vocal. Ouvre des droits auprès de l'ADAMI et de la SPEDIDAM au titre des droits voisins des artistes-interprètes. Justificatif : contrat d'engagement ou fiche de paie intermittent récente.",RAPPEUR:"Interprète vocal (rap/spoken word). Mêmes droits voisins que les chanteurs auprès de l'ADAMI. Justificatif : contrat d'engagement ou fiche de paie récente.",DJ:"Interprète/performeur en live. Éligible aux aides tournée du CNM si des dates sont contractualisées. Justificatif : contrats de dates ou book de tournée.",BEATMAKER:"Producteur musical de compositions. Vos œuvres doivent être déclarées à la SACEM pour ouvrir droit aux aides à la création. Justificatif : déclaration d'œuvre SACEM ou preuve de dépôt.",INSTRUMENTISTE:"Interprète instrumental. Ouvre des droits ADAMI et SPEDIDAM. Justificatif : contrat d'engagement ou fiche de paie intermittent récente.",COMPOSITEUR:"Auteur de la musique. Concerné en priorité par les aides à la création et à l'édition de la SACEM. Justificatif : numéro d'auteur SACEM.",PRODUCTEUR:"Producteur phonographique du projet. Principal interlocuteur du CNM pour les aides à la production d'enregistrement. Justificatif : contrat de licence ou de production."};
export const PROJECT_CATEGORY_LABELS:Record<ProjectCategory,string>={RECORDING_ALBUM_EP:"Enregistrement (album / EP)",LIVE_SHOW_TOUR:"Spectacle vivant / tournée",MUSIC_VIDEO:"Clip vidéo",CREATION_RESIDENCY:"Création / résidence"};
export function formatProjectCategories(categories:ProjectCategory[]|undefined):string{return !categories?.length?"—":categories.map(c=>PROJECT_CATEGORY_LABELS[c]).join(" · ");}
export const PROJECT_CATEGORY_DESCRIPTIONS:Record<ProjectCategory,string>={RECORDING_ALBUM_EP:"Financement des coûts de studio, mixage, mastering et fabrication d'un album ou EP. Principal financeur : aide à la production phonographique du CNM.",LIVE_SHOW_TOUR:"Financement de la production de spectacle, des répétitions et d'un plan de tournée. Financeurs principaux : CNM (aide tournée), ADAMI, SPEDIDAM.",MUSIC_VIDEO:"Financement de la réalisation d'un clip. Financeur principal : CNM (aide à la vidéo musicale), sous réserve d'un diffuseur identifié.",CREATION_RESIDENCY:"Financement d'un temps de création, résidence ou écriture. Financeurs principaux : DRAC (aide régionale à la création), SACEM (bourse à la création)."};
