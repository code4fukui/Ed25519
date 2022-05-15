import { Ed25519 } from "./Ed25519.js";
import { PubFile } from "./PubFile.js";
import { PEMFile } from "./PEMFile.js";

const keys = Ed25519.generateKeyPair();
console.log(keys);

const name = "key";
await Deno.writeTextFile(name + ".private.pem", PEMFile.encode(keys));
await Deno.writeTextFile(name + ".pub", PubFile.encode(keys.publicKey));
