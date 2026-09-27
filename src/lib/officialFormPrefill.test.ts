import { describe,expect,it } from "vitest";
import { buildOfficialFormPrefillManifest,type ApplicationInstance } from "./applicationEngine";
import type { ApplicationTemplate } from "./applicationTemplate";

const baseTemplate:ApplicationTemplate={
 id:"TEST",dispositifId:"CNM_PROD_PHONO",version:"1",sourceUrl:"https://example.invalid",fetchedAt:"2026-09-27",
 generationNote:"Template de test",documentRequirements:[],
 fields:[
  {id:"project_title",label:"Titre",type:"text",required:true},
  {id:"optional_note",label:"Note",type:"text",required:false},
 ],
};
const instance:ApplicationInstance={
 fields:[
  {field:baseTemplate.fields[0],value:"Album X",provenance:"manual",status:"filled"},
  {field:baseTemplate.fields[1],value:"",provenance:"manual",status:"missing"},
 ],
 documents:[],checks:[],requiredFieldsTotal:1,requiredFieldsFilled:1,requiredFieldsToConfirm:0,requiredFieldsMissing:0,
 requiredDocumentsTotal:0,requiredDocumentsFound:0,completeness:100,
};
describe("buildOfficialFormPrefillManifest",()=>{
 it("ne prétend jamais disposer d'un formulaire officiel pour un template préparatoire",()=>{
  expect(buildOfficialFormPrefillManifest(baseTemplate,instance)).toEqual({available:false,format:null,fileName:null,sourceUrl:null,entries:[],unmappedRequiredFieldIds:[]});
 });
 it("mappe uniquement les champs explicitement reliés au formulaire officiel",()=>{
  const template:ApplicationTemplate={...baseTemplate,officialForm:{sourceUrl:"https://example.invalid/form.pdf",format:"pdf",fileName:"form.pdf",fetchedAt:"2026-09-27",fieldMap:{project_title:"pdf_project_title"}}};
  const manifest=buildOfficialFormPrefillManifest(template,instance);
  expect(manifest.available).toBe(true);
  expect(manifest.entries).toHaveLength(1);
  expect(manifest.entries[0]).toMatchObject({applicationFieldId:"project_title",officialFieldId:"pdf_project_title",value:"Album X"});
  expect(manifest.unmappedRequiredFieldIds).toEqual([]);
 });
 it("signale tout champ obligatoire non mappé",()=>{
  const template:ApplicationTemplate={...baseTemplate,officialForm:{sourceUrl:"https://example.invalid/form.xlsx",format:"xlsx",fileName:"form.xlsx",fetchedAt:"2026-09-27",fieldMap:{}}};
  expect(buildOfficialFormPrefillManifest(template,instance).unmappedRequiredFieldIds).toEqual(["project_title"]);
 });
});
