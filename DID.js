import { Base58 } from "https://code4fukui.github.io/Base58/Base58.js";

export class DID {
  static decode(txt) { // bin pubkey
    if (!txt.startsWith("did:key:z")) {
      return null;
    }
    const bin = Base58.decode(txt.substring(9));
    if (!(bin[0] == 0xed && bin[1] == 0x01)) {
      return null;
    }
    const res = new Uint8Array(32);
    for (let i = 0; i < res.length; i++) {
      res[i] = bin[i + 2];
    }
    return res;
  }
  static encode(pubkey) {
    const bin = new Uint8Array(pubkey.length + 2);
    bin[0] = 0xed;
    bin[1] = 0x01;
    for (let i = 0; i < pubkey.length; i++) {
      bin[i + 2] = pubkey[i];
    }
    return "did:key:z" + Base58.encode(bin);
  }
}
