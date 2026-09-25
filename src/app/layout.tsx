import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { BottomTabBar } from "@/components/BottomTabBar";
import { AppSplash } from "@/components/AppSplash";
import "./globals.css";
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
export const metadata: Metadata = {
 title: "Subvento — Financez votre projet artistique",
 description: "Le guichet unique pour déposer vos dossiers de financement musical : CNM, SACEM, ADAMI, SPEDIDAM, DRAC.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
 return (<html lang="fr" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}><body className="min-h-full flex flex-col bg-bg text-text"><AppSplash /><Header /><main className="flex-1 flex flex-col pb-20">{children}</main><BottomTabBar /></body></html>);
}