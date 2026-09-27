import { describe,expect,it } from "vitest";
import { ADSV_MUSIC_2027_CALENDARS,getAdsvMusicCalendar } from "./adsvRegionalCalendar";

describe("ADSV music regional calendar",()=>{
 it("retrouve le calendrier Île-de-France",()=>{
  const calendar=getAdsvMusicCalendar("Île-de-France");
  expect(calendar?.deadline).toBe("2026-12-15T23:59:00+01:00");
  expect(calendar?.commission).toContain("mars 2027");
 });
 it("tolère les espaces et la casse",()=>{
  expect(getAdsvMusicCalendar("  ÎLE-DE-FRANCE  ")?.region).toBe("Île-de-France");
 });
 it("contient le calendrier Occitanie vérifié",()=>{
  const calendar=getAdsvMusicCalendar("Occitanie");
  expect(calendar?.deadline).toBe("2026-10-31T23:59:00+01:00");
  expect(calendar?.commission).toContain("Montpellier");
 });
 it("n'invente aucun calendrier pour une région absente",()=>{
  expect(getAdsvMusicCalendar("Région non vérifiée")).toBeUndefined();
 });
 it("conserve une source officielle et une date de vérification pour chaque entrée",()=>{
  for(const calendar of ADSV_MUSIC_2027_CALENDARS){
   expect(calendar.sourceUrl).toContain("culture.gouv.fr");
   expect(calendar.verifiedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  }
 });
});
