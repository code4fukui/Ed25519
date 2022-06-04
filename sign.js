import { PEMFile } from "./PEMFile.js";
import { Ed25519 } from "./Ed25519.js";
import { DIDKey } from "./DIDKey.js";
import { Text } from "./Text.js";

if (Deno.args.length < 2) {
  console.log("deno sign.js [pem file] [text body]");
  Deno.exit(1);
}
const fn = Deno.args[0];
const body = Text.normalize(Deno.args[1]);

const pemb = await Deno.readTextFile(fn);
const keys = PEMFile.decode(pemb);

const message = Text.encode(body);
const sig = Ed25519.sign({ privateKey: keys.privateKey, message, encoding: "binary" });
const text = Text.addSign(body, DIDKey.encodeSign(sig));
console.log(DIDKey.encodePublicKey(keys.publicKey));
console.log(text);
