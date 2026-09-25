"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FolderKanban, FileStack, UserRound } from "lucide-react";
import clsx from "clsx";
import { vibrate } from "@/lib/haptics";
const TABS = [
 { href: "/", label: "Accueil", icon: Home, match: (p: string) => p === "/" },
 { href: "/dossiers", label: "Dossiers", icon: FolderKanban, match: (p: string) => p.startsWith("/dossiers") },
 { href: "/documents", label: "Documents", icon: FileStack, match: (p: string) => p.startsWith("/documents") },
 { href: "/profil", label: "Profil", icon: UserRound, match: (p: string) => p.startsWith("/profil") },
];
export function BottomTabBar() {
 const pathname = usePathname();
 if (pathname?.startsWith("/dossier/") || pathname?.startsWith("/onboarding/")) return null;
 return (<nav className="fixed bottom-0 left-0 right-0 z-30 backdrop-blur" style={{background:"rgba(10, 31, 28, 0.92)",borderTop:"1px solid var(--color-border)",paddingBottom:"env(safe-area-inset-bottom, 0px)"}}><div className="max-w-5xl mx-auto grid grid-cols-4">{TABS.map(({ href, label, icon: Icon, match }) => { const active = match(pathname ?? ""); return (<Link key={href} href={href} onClick={() => vibrate()} className="focus-gold flex flex-col items-center justify-center gap-1 py-2.5"><Icon className="w-5 h-5" strokeWidth={active ? 2.4 : 2} style={{ color: active ? "var(--color-gold)" : "var(--color-text-faint)" }} /><span className={clsx("text-[11px]", active && "font-semibold")} style={{ color: active ? "var(--color-text)" : "var(--color-text-faint)" }}>{label}</span></Link>); })}</div></nav>);
}