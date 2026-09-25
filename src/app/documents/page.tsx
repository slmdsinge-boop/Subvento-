"use client";
import { useState } from "react";
import { Camera } from "lucide-react";
import { DocumentUploader } from "@/components/DocumentUploader";
import { DocumentScanner, type ScannedDocument } from "@/components/DocumentScanner";
import { useApplicationStore } from "@/store/useApplicationStore";
import { makeNotification } from "@/lib/notifications";
import { VAULT_DOCUMENT_LABELS, type VaultDocumentKind } from "@/lib/documents";
import { vibrate } from "@/lib/haptics";
export default function DocumentsPage() {
 const [scannerOpen,setScannerOpen]=useState(false);
 const legalStatus=useApplicationStore(s=>s.application.applicant_profile.legal_status);
 const documents=useApplicationStore(s=>s.documents);
 const setDocument=useApplicationStore(s=>s.setDocument);
 const addNotification=useApplicationStore(s=>s.addNotification);
 const needsKbis=legalStatus && !["PARTICULIER","ARTISTE_AUTEUR_INDIVIDUEL"].includes(legalStatus);
 const allKinds:VaultDocumentKind[]=["id_card_doc_id","rib_doc_id",...(needsKbis?(["kbis_doc_id"] as VaultDocumentKind[]):[])];
 const missingKinds=allKinds.filter(k=>!documents[k]);
 function storeCapture({kind,dataUrl,fileName}:ScannedDocument){setDocument(kind,{id:crypto.randomUUID(),kind,fileName,sizeBytes:Math.round((dataUrl.length*3)/4),mimeType:dataUrl.slice(5,dataUrl.indexOf(";"))||"image/jpeg",dataUrl,uploadedAt:new Date().toISOString(),status:"en_attente"});addNotification(makeNotification("Document reçu",`${VAULT_DOCUMENT_LABELS[kind]} a été ajouté à votre coffre-fort.`,"info"));}
 return <div className="max-w-3xl w-full mx-auto px-5 py-8 sm:py-12 flex-1"><h1 className="text-xl font-semibold tracking-tight mb-1">Coffre-fort de documents</h1><p className="text-sm mb-4" style={{color:"var(--color-text-muted)"}}>Ces documents sont réutilisés automatiquement pour chaque dossier de financement que vous créez.</p>{missingKinds.length>0&&<button type="button" onClick={()=>{vibrate();setScannerOpen(true)}} className="focus-gold w-full inline-flex items-center justify-center gap-2 text-sm font-semibold px-5 py-3 rounded-full mb-5" style={{background:"var(--color-gold)",color:"#0a1f1c"}}><Camera className="w-4 h-4"/>Scanner mes {missingKinds.length} document{missingKinds.length>1?"s":""} manquant{missingKinds.length>1?"s":""}</button>}<div className="flex flex-col gap-3"><DocumentUploader kind="id_card_doc_id"/><DocumentUploader kind="rib_doc_id"/>{needsKbis&&<DocumentUploader kind="kbis_doc_id"/>}</div>{scannerOpen&&<DocumentScanner steps={missingKinds} onFinish={captures=>{setScannerOpen(false);captures.forEach(storeCapture)}} onClose={()=>setScannerOpen(false)}/>}</div>;
}