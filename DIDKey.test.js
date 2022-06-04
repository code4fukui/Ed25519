import * as t from "https://deno.land/std/testing/asserts.ts";
import { DIDKey, DIDKEY_ED25519_PUBLIC, DIDKEY_ED25519_PRIVATE } from "./DIDKey.js";

//import { PubFile } from "./PubFile.js";
//const name = "key";
//const pubkey = PubFile.decode(await Deno.readTextFile(name + ".pub"))

const pubkey = new Uint8Array([
  44,  14, 197, 27,  99, 124,  36, 178,
  10,   5, 249, 21,  22, 232, 188,   3,
  88, 103,  37,  5, 146, 238, 230, 244,
 140, 100,  64, 34, 245, 120, 228, 192
]);
const didchk = "did:key:z6MkhRF3fggZqHRuY64PXSWsGF3kpFfvhFPbyK5NZ2xjNkPq";

const prikey = pubkey;
const didchk2 = "z3u2UBnndZSHk4fNYzR5AVS16H3j23Acgk6uU5ETAC28DtLP";

Deno.test("encodePublicKey", () => {
  const did = DIDKey.encodePublicKey(pubkey);
  t.assertEquals(did, didchk);
});
Deno.test("decodePublicKey", () => {
  const pubkey2 = DIDKey.decode(didchk);
  t.assertEquals({ name: "key", type: DIDKEY_ED25519_PUBLIC, data: pubkey }, pubkey2);
});
Deno.test("encodePrivateKey", () => {
  const did = DIDKey.encodePrivateKey(prikey);
  t.assertEquals(did, didchk2);
});
Deno.test("decodePrivateKey", () => {
  const prikey2 = DIDKey.decode(didchk2);
  t.assertEquals({ name: "", type: DIDKEY_ED25519_PRIVATE, data: prikey }, prikey2);
});
Deno.test("decodePublicKey2", () => {
  const pubkey2 = DIDKey.decode(didchk.substring(8));
  t.assertEquals({ name: "", type: DIDKEY_ED25519_PUBLIC, data: pubkey }, pubkey2);
});
Deno.test("decodePrivateKey3", () => {
  const prikey2 = DIDKey.decode(didchk2);
  t.assertEquals({ name: "", type: DIDKEY_ED25519_PRIVATE, data: prikey }, prikey2);
});
