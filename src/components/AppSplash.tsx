"use client";
import { useEffect, useRef, useState } from "react";
import { vibrate } from "@/lib/haptics";
const SPLASH_KEY = "subvento-splash-shown";
const LOAD_MS = 1400;
const FADE_MS = 400;
type Phase = "idle" | "loading" | "leaving" | "done";
function easeOutQuart(t: number): number { return 1 - Math.pow(1 - t, 4); }
// Module-level (not React state): survives React 18/19 Strict Mode's dev-only
// effect → cleanup → effect double-invoke, which would otherwise read
// sessionStorage as already "seen" on the second pass and cancel the splash
// before it ever renders.
let hasStartedThisPageLoad = false;
export function AppSplash() {
 const [phase, setPhase] = useState<Phase>("idle");
 const [progress, setProgress] = useState(0);
 const rafRef = useRef<number | null>(null);
 useEffect(() => {
  if (typeof window === "undefined" || hasStartedThisPageLoad) return;
  hasStartedThisPageLoad = true;
  if (window.sessionStorage.getItem(SPLASH_KEY)) { setPhase("done"); return; }
  window.sessionStorage.setItem(SPLASH_KEY, "1");
  setPhase("loading");
  const start = performance.now();
  function tick(now: number) {
   const elapsed = now - start;
   const t = Math.min(1, elapsed / LOAD_MS);
   setProgress(Math.round(easeOutQuart(t) * 100));
   if (t < 1) rafRef.current = requestAnimationFrame(tick);
   else { vibrate([12, 40, 18]); setPhase("leaving"); window.setTimeout(() => setPhase("done"), FADE_MS); }
  }
  rafRef.current = requestAnimationFrame(tick);
  return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
 }, []);
 if (phase === "idle" || phase === "done") return null;
 const leaving = phase === "leaving";
 return <div aria-hidden className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden" style={{background:"var(--color-bg)",opacity:leaving?0:1,transform:leaving?"scale(1.04)":"scale(1)",transition:`opacity ${FADE_MS}ms ease, transform ${FADE_MS}ms ease`,pointerEvents:leaving?"none":"auto"}}>
  <div className="absolute inset-0" style={{background:"radial-gradient(ellipse 500px 400px at 50% 40%, rgba(201, 162, 74, 0.10), transparent 60%)"}} />
  <div className="relative flex flex-col items-center">
   <div className="animate-splash-logo relative w-16 h-16 mb-5"><img src="/logo.png" alt="" className="w-full h-full rounded-2xl" /></div>
   <span className="animate-splash-text font-semibold tracking-tight text-lg mb-6">Subvento</span>
   <div className="animate-splash-text relative w-40 h-1.5 rounded-full overflow-hidden" style={{background:"var(--color-bg-elevated)",animationDelay:"0.15s"}}>
    <div className="h-full rounded-full" style={{width:`${progress}%`,background:"linear-gradient(90deg, var(--color-accent), var(--color-gold))"}} />
    <div className="absolute inset-0 animate-splash-shimmer" />
   </div>
   <span className="animate-splash-text mt-3 text-xs tabular-nums" style={{color:"var(--color-text-faint)",animationDelay:"0.15s"}}>{progress}%</span>
  </div>
 </div>;
}