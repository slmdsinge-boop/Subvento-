"use client";
import { useRef } from "react";
import { Camera, X } from "lucide-react";
import { useApplicationStore } from "@/store/useApplicationStore";
import { vibrate } from "@/lib/haptics";
function readFileAsDataUrl(file: File): Promise<string> {
 return new Promise((resolve, reject) => {
 const reader = new FileReader();
 reader.onload = () => resolve(reader.result as string);
 reader.onerror = reject;
 reader.readAsDataURL(file);
 });
}
export function PhotoUploader() {
 const inputRef = useRef<HTMLInputElement>(null);
 const photo = useApplicationStore((s) => s.application.applicant_profile.photo_data_url);
 const updateProfile = useApplicationStore((s) => s.updateProfile);
 async function handleFile(file: File) {
 if (file.size > 5 * 1024 * 1024) return;
 const dataUrl = await readFileAsDataUrl(file);
 vibrate();
 updateProfile({ photo_data_url: dataUrl });
 }
 return (<div className="flex flex-col items-center"><div className="relative"><button type="button" onClick={() => { vibrate(); inputRef.current?.click(); }} className="focus-gold w-28 h-28 rounded-full flex items-center justify-center overflow-hidden" style={{ background: photo ? "transparent" : "var(--color-bg-elevated)", border: "2px dashed var(--color-border-strong)" }}>{photo ? <img src={photo} alt="Photo de profil" className="w-full h-full object-cover" /> : <Camera className="w-7 h-7" style={{ color: "var(--color-text-faint)" }} />}</button>{photo && <button type="button" onClick={() => { vibrate(); updateProfile({ photo_data_url: null }); }} aria-label="Supprimer la photo" className="focus-gold absolute -top-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border-strong)" }}><X className="w-4 h-4" style={{ color: "var(--color-error)" }} /></button>}<input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) handleFile(file); e.target.value = ""; }} /></div><p className="text-xs mt-3" style={{ color: "var(--color-text-faint)" }}>{photo ? "Appuyez pour changer" : "Appuyez pour ajouter une photo"}</p></div>);
}