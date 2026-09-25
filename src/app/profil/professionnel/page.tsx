"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { OptionCard } from "@/components/OptionCard";
import { FormField } from "@/components/FormField";
import { useApplicationStore } from "@/store/useApplicationStore";
import { ACTIVITY_TYPES, ACTIVITY_TYPE_LABELS, type ActivityType } from "@/lib/schema";
import { vibrate } from "@/lib/haptics";
const ACTIVITY_TYPE_DESCRIPTIONS: Record<ActivityType,string>={ARTISTE_SOLO:"Vous portez le projet en votre nom propre, seul·e.",GROUPE:"Le projet est porté collectivement par un groupe ou un ensemble.",PRODUCTEUR:"Vous produisez des enregistrements pour vous-même ou pour d'autres artistes.",LABEL:"Vous éditez et distribuez des enregistrements sous une marque de label."};
export default function ProfilProfessionnelPage(){
 const profile=useApplicationStore(s=>s.application.applicant_profile);const updateProfile=useApplicationStore(s=>s.updateProfile);const updateCatalogLinks=useApplicationStore(s=>s.updateCatalogLinks);
 return <div className="max-w-3xl w-full mx-auto px-5 py-8 sm:py-12 flex-1">
 <Link href="/profil" onClick={()=>vibrate()} className="focus-gold inline-flex items-center gap-1.5 text-sm mb-5" style={{color:"var(--color-text-muted)"}}><ArrowLeft className="w-4 h-4"/>Profil</Link>
 <h1 className="text-xl font-semibold tracking-tight mb-1">Profil professionnel</h1><p className="text-sm mb-6" style={{color:"var(--color-text-muted)"}}>Ces informations sont optionnelles mais aident Subvento à affiner les dispositifs pertinents et à préparer vos dossiers. Rien n&apos;est obligatoire.</p>
 <h2 className="text-base font-semibold mb-1">Identité artistique</h2><p className="text-sm mb-2" style={{color:"var(--color-text-muted)"}}>Comment se présente votre activité — distinct de votre raison sociale.</p>
 <div className="flex flex-col gap-2 mb-5">{ACTIVITY_TYPES.map(type=><OptionCard key={type} label={ACTIVITY_TYPE_LABELS[type]} description={ACTIVITY_TYPE_DESCRIPTIONS[type]} selected={profile.activity_type===type} onToggle={()=>updateProfile({activity_type:type})}/>)}</div>
 <div className="card p-4 sm:p-5 flex flex-col gap-4 mb-6"><FormField label="Nom de scène / nom du groupe" name="artist_name" value={profile.artist_name??""} onChange={e=>updateProfile({artist_name:e.target.value})} placeholder="Ex. Horizon Sound" hint="Distinct de votre nom / raison sociale administrative."/></div>
 <h2 className="text-base font-semibold mb-1">Structure</h2><div className="card p-4 sm:p-5 flex flex-col gap-4 mb-6">
 <FormField label="Représentant légal" name="legal_representative_name" value={profile.legal_representative_name??""} onChange={e=>updateProfile({legal_representative_name:e.target.value})} placeholder="Nom de la personne habilitée à signer"/>
 <FormField label="Date de création de la structure" name="structure_created_at" type="date" value={profile.structure_created_at??""} onChange={e=>updateProfile({structure_created_at:e.target.value})} hint="Certaines aides exigent une ancienneté minimale de structure."/>
 <FormField label="Téléphone" name="phone" type="tel" value={profile.phone??""} onChange={e=>updateProfile({phone:e.target.value})} placeholder="06 00 00 00 00"/>
 <FormField label="Adresse" name="address" value={profile.address??""} onChange={e=>updateProfile({address:e.target.value})} placeholder="Numéro, rue, code postal, ville"/></div>
 <h2 className="text-base font-semibold mb-1">Expérience</h2><div className="card p-4 sm:p-5 flex flex-col gap-4 mb-6">
 <FormField label="Nombre de sorties (albums, EP, singles)" name="release_count" type="number" min={0} value={profile.release_count??""} onChange={e=>updateProfile({release_count:e.target.value===""?undefined:Number(e.target.value)})} placeholder="0"/>
 <FormField label="Concerts réalisés" name="concerts_count" type="number" min={0} value={profile.concerts_count??""} onChange={e=>updateProfile({concerts_count:e.target.value===""?undefined:Number(e.target.value)})} placeholder="0"/>
 <FormField label="Dossier de presse (lien)" name="press_kit_url" type="url" value={profile.press_kit_url??""} onChange={e=>updateProfile({press_kit_url:e.target.value})} placeholder="https://…"/></div>
 <h2 className="text-base font-semibold mb-1">Catalogue & réseaux</h2><p className="text-sm mb-2" style={{color:"var(--color-text-muted)"}}>Renseignez uniquement les liens qui existent — inutile de tous les remplir.</p>
 <div className="card p-4 sm:p-5 flex flex-col gap-4">
 <FormField label="Spotify" name="spotify" value={profile.catalog_links?.spotify??""} onChange={e=>updateCatalogLinks({spotify:e.target.value})} placeholder="https://open.spotify.com/artist/…"/>
 <FormField label="Apple Music" name="apple_music" value={profile.catalog_links?.apple_music??""} onChange={e=>updateCatalogLinks({apple_music:e.target.value})} placeholder="https://music.apple.com/…"/>
 <FormField label="Deezer" name="deezer" value={profile.catalog_links?.deezer??""} onChange={e=>updateCatalogLinks({deezer:e.target.value})} placeholder="https://www.deezer.com/…"/>
 <FormField label="YouTube" name="youtube" value={profile.catalog_links?.youtube??""} onChange={e=>updateCatalogLinks({youtube:e.target.value})} placeholder="https://youtube.com/@…"/>
 <FormField label="Instagram" name="instagram" value={profile.catalog_links?.instagram??""} onChange={e=>updateCatalogLinks({instagram:e.target.value})} placeholder="https://instagram.com/…"/>
 <FormField label="TikTok" name="tiktok" value={profile.catalog_links?.tiktok??""} onChange={e=>updateCatalogLinks({tiktok:e.target.value})} placeholder="https://tiktok.com/@…"/>
 </div></div>;
}