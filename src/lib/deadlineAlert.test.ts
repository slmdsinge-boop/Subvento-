import { describe,expect,it } from "vitest";
import { getDeadlineAlert } from "./deadlineAlert";

describe("getDeadlineAlert",()=>{
 const now=new Date("2026-09-27T12:00:00+02:00");

 it("classe une échéance lointaine comme normale",()=>{
  expect(getDeadlineAlert("2026-11-15T23:59:00+01:00",now)?.status).toBe("normal");
 });

 it("classe une échéance à moins de 30 jours comme proche",()=>{
  expect(getDeadlineAlert("2026-10-20T23:59:00+02:00",now)?.status).toBe("soon");
 });

 it("classe une échéance à 7 jours ou moins comme urgente",()=>{
  const alert=getDeadlineAlert("2026-10-03T23:59:00+02:00",now);
  expect(alert?.status).toBe("urgent");
  expect(alert?.daysLeft).toBeLessThanOrEqual(7);
 });

 it("signale une échéance aujourd'hui",()=>{
  const alert=getDeadlineAlert("2026-09-27T23:59:00+02:00",now);
  expect(alert?.status).toBe("today");
  expect(alert?.label).toBe("Échéance aujourd’hui");
 });

 it("signale une échéance dépassée",()=>{
  expect(getDeadlineAlert("2026-09-26T10:00:00+02:00",now)?.status).toBe("overdue");
 });

 it("refuse une date invalide",()=>{
  expect(getDeadlineAlert("pas-une-date",now)).toBeNull();
 });
});
