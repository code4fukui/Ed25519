import * as t from "https://deno.land/std/testing/asserts.ts";
import { DID } from "./DID.js";

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
//const didchk = "did:key:z6MkpTHR8VNsBxYAAWHut2Geadd9jSwuBV8xRoAnwWsdvktH";

Deno.test("encode", () => {
  const did = DID.encode(pubkey);
  t.assertEquals(did, didchk);
});
Deno.test("decode", () => {
  const pubkey2 = DID.decode(didchk);
  t.assertEquals(pubkey, pubkey2);
});
