import { Base58 } from "https://code4fukui.github.io/Base58/Base58.js";
import { subbin } from "https://js.sabae.cc/binutil.js";

export class DID {
  static decode(txt) { // bin pubkey or privatekey
    if (!txt.startsWith("did:")) {
      return null;
    }
    const n = txt.indexOf(":", 4);
    if (txt[n + 1] != "z") {
      return null;
    }
    const bin = Base58.decode(txt.substring(n + 2));
    if (!(bin[0] == 0xed && bin[1] == 0x01)) {
      return null;
    }
    const res = new Uint8Array(bin.length - 2);
    for (let i = 0; i < res.length; i++) {
      res[i] = bin[i + 2];
    }
    if (res.length == 32) {
      return res;
    }
    if (res.length != 64) {
      return null;
    }
    return {
      publicKey: subbin(res, 32, 64),
      privateKey: subbin(res, 0, 32),
    };
  }
  static encode(pubkey, name = "key") {
    const bin = new Uint8Array(pubkey.length + 2); // 0x1300
    // https://github.com/chrisdickinson/varint
    bin[0] = 0xed; // multicodec https://github.com/multiformats/multicodec https://github.com/multiformats/multicodec/blob/master/table.csv
    bin[1] = 0x01;
    for (let i = 0; i < pubkey.length; i++) {
      bin[i + 2] = pubkey[i];
    }
    return "did:" + name + ":z" + Base58.encode(bin);
  }
}
