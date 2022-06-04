// https://w3c-ccg.github.io/did-method-key/

import { Base58 } from "https://code4fukui.github.io/Base58/Base58.js";
import { subbin, bincat } from "https://js.sabae.cc/binutil.js";
import { Varint } from "https://code4fukui.github.io/Varint/Varint.js";

// multicodec
// https://github.com/multiformats/multicodec/blob/master/table.csv
export const DIDKEY_ED25519_PUBLIC = 0xed; // ed25519-pub
export const DIDKEY_ED25519_SIGN = 0xef; // ed25519-sign // https://github.com/multiformats/multicodec/pull/142
export const DIDKEY_ED25519_PRIVATE = 0x1300; // ed25519-priv

export class DIDKey {
  static decode(txt) { // bin pubkey or privatekey or sign
    const [name, bin] = (() => {
      if (txt.startsWith("z")) {
        return ["", Base58.decode(txt.substring(1))];
      }
      if (!txt.startsWith("did:")) {
        return ["", null];
      }
      const n = txt.indexOf(":", 4);
      if (txt[n + 1] != "z") {
        return ["", null];
      }
      const name = txt.substring(4, n);
      const bin = Base58.decode(txt.substring(n + 2));
      return [name, bin];
    })();
    const type = Varint.decode(bin);
    const typelen = Varint.encodingLength(type);
    const data = subbin(bin, typelen, bin.length - typelen);
    return { type, data, name };
  }
  static encode(key, type, iskey) {
    const btype = Varint.encode(type);
    const typelen = Varint.encodingLength(type);
    const bin = bincat(btype, key);
    const enc = "z" + Base58.encode(bin);
    return (iskey ? "did:key:" : "") + enc;
  }
  static encodePublicKey(key) {
    return DIDKey.encode(key, DIDKEY_ED25519_PUBLIC, true);
  }
  static encodePrivateKey(key) {
    if (key.length == 64) {
      key = subbin(key, 0, 32);
    }
    return DIDKey.encode(key, DIDKEY_ED25519_PRIVATE, false);
  }
  static encodeSign(sign) {
    return DIDKey.encode(sign, DIDKEY_ED25519_SIGN, false);
  }
}
