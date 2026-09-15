import {mkdirSync, readdirSync, readFileSync, writeFileSync} from "node:fs";
import path from "node:path";

const packageRoot=path.resolve(import.meta.dir,"..");
const sourceRoot=path.join(packageRoot,"assets-src");
const outputRoot=path.join(packageRoot,"public","assets");

const chunks=readdirSync(sourceRoot)
  .filter((name)=>name.startsWith("doi-v2.webp.b64."))
  .sort();

if(chunks.length===0){
  throw new Error("Missing doi-v2.webp base64 chunks");
}

const base64=chunks
  .map((name)=>readFileSync(path.join(sourceRoot,name),"utf8").replace(/\s+/g,""))
  .join("");

mkdirSync(outputRoot,{recursive:true});
writeFileSync(path.join(outputRoot,"doi-v2.webp"),Buffer.from(base64,"base64"));

console.log(`Materialized Đời V2 from ${chunks.length} chunks`);
