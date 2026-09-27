import { describe,expect,it } from "vitest";
import { formatApplicationFieldValue } from "./applicationEngine";
import type { ApplicationFieldDef } from "./applicationTemplate";

describe("formatApplicationFieldValue",()=>{
 const selectField:ApplicationFieldDef={
  id:"project_type",
  label:"Nature du projet",
  type:"select",
  required:true,
  options:[
   {value:"creation",label:"Création"},
   {value:"creation_diffusion",label:"Création et diffusion"},
  ],
 };

 it("affiche le libellé humain d'une valeur select connue",()=>{
  expect(formatApplicationFieldValue(selectField,"creation_diffusion")).toBe("Création et diffusion");
 });

 it("conserve une valeur select inconnue sans perte",()=>{
  expect(formatApplicationFieldValue(selectField,"legacy_value")).toBe("legacy_value");
 });

 it("ne transforme pas la valeur d'un champ texte",()=>{
  const textField:ApplicationFieldDef={id:"title",label:"Titre",type:"text",required:true};
  expect(formatApplicationFieldValue(textField,"Mon projet")).toBe("Mon projet");
 });
});
