"use client";
import { Check, ExternalLink, HelpCircle, X } from "lucide-react";
import { ELIGIBILITY_STATE_COLORS, ELIGIBILITY_STATE_LABELS, type DispositifMatch } from "@/lib/eligibility";
import { openExternal } from "@/lib/openExternal";
import { vibrate } from "@/lib/haptics";
const CRITERION_ICON={ok:Check,missing:HelpCircle,blocking:X} as const;
const CRITERION_COLOR={ok:"var(--color-success)",missing:"var(--color-warning)",blocking:"var(--color-error)"} as const;
export function FunderMatchList({matches}:{matches:DispositifMatch[]}) {
 const order={compatible:0,informations_manquantes:1,bloquant:2};
 const sorted=[...matches].sort((a,b)=>order[a.state]-order[b.state]);
 return <div className="flex flex-col gap-2.5">{sorted.map(({dispositif,organisme,state,criteria,advisories})=><div key={dispositif.id} className="card p-4" style={{borderColor:state==="compatible"?organisme.color:"var(--color-border)"}}>
  <div className="flex items-center gap-2.5"><span className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold shrink-0" style={{background:`${organisme.color}22`,color:organisme.color}}>{organisme.name.slice(0,2)}</span><div className="flex-1 min-w-0"><p className="text-sm font-semibold">{dispositif.name}</p><p className="text-xs" style={{color:"var(--color-text-faint)"}}>{organisme.fullName} · {dispositif.typicalWindow}</p></div><span className="text-xs font-medium shrink-0 text-right" style={{color:ELIGIBILITY_STATE_COLORS[state]}}>{ELIGIBILITY_STATE_LABELS[state]}</span></div>
  <p className="text-xs mt-2.5 leading-relaxed" style={{color:"var(--color-text-muted)"}}>{dispositif.description}</p>
  <ul className="mt-2.5 flex flex-col gap-1">{criteria.map((c,i)=>{const Icon=CRITERION_ICON[c.state];return <li key={i} className="text-xs flex items-start gap-1.5" style={{color:CRITERION_COLOR[c.state]}}><Icon className="w-3 h-3 shrink-0 mt-0.5" strokeWidth={3}/>{c.label}</li>})}</ul>
  {state==="compatible"&&<p className="mt-2.5 text-xs" style={{color:"var(--color-text-faint)"}}>Pièces à prévoir : {dispositif.requiredDocuments.join(", ")}</p>}
  {advisories.length>0&&<p className="mt-2 text-[11px] leading-snug" style={{color:"var(--color-text-faint)"}}>{advisories.join(" ")}</p>}
  <button type="button" onClick={()=>{vibrate();openExternal(dispositif.officialUrl)}} className="focus-gold mt-3 inline-flex items-center gap-1.5 text-xs font-semibold" style={{color:"var(--color-gold)"}}>Voir la source officielle {organisme.name}<ExternalLink className="w-3 h-3"/></button>
 </div>)}</div>;
}