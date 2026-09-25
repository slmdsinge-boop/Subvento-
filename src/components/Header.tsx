"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { NotificationBell } from "./NotificationBell";
import { vibrate } from "@/lib/haptics";
const ROOT_PATHS = new Set(["/", "/dossiers", "/documents", "/profil"]);
const HAS_OWN_BACK_NAV = (path: string) =>
 path.startsWith("/dossier/") ||
 path === "/dossiers/detail" ||
 ["/onboarding/statut", "/onboarding/roles", "/onboarding/identite", "/onboarding/photo"].includes(path);
export function Header() {
 const router = useRouter();
 const pathname = usePathname() ?? "/";
 const showBack = !ROOT_PATHS.has(pathname) && !HAS_OWN_BACK_NAV(pathname);
 return (<header className="sticky top-0 z-40 backdrop-blur" style={{ background: "rgba(10, 31, 28, 0.85)", borderBottom: "1px solid var(--color-border)" }}><div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">{showBack ? (<button type="button" onClick={() => { vibrate(); router.back(); }} aria-label="Retour" className="focus-gold flex items-center gap-2.5 rounded-md"><span className="w-8 h-8 rounded-lg flex items-center justify-center card card-hover"><ArrowLeft className="w-4 h-4" style={{ color: "var(--color-text)" }} /></span><span className="font-semibold tracking-tight text-[15px] hidden sm:inline">Retour</span></button>) : (<Link href="/" onClick={() => vibrate()} className="flex items-center gap-2.5 focus-gold rounded-md"><img src="/logo.png" alt="" className="w-8 h-8 rounded-lg" /><span className="font-semibold tracking-tight text-[15px]">Subvento</span></Link>)}<nav className="flex items-center gap-3"><Link href="/dossiers" onClick={() => vibrate()} className="hidden sm:inline-flex focus-gold text-sm font-medium px-4 py-2 rounded-full transition-colors" style={{ background: "var(--color-gold)", color: "#0a1f1c" }}>Mes dossiers</Link><NotificationBell /></nav></div></header>);
}