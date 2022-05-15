import { Base64 } from "https://js.sabae.cc/Base64.js";
import { bin2s, bin2i, subbin, setbin, i2bin, s2bin } from "https://js.sabae.cc/binutil.js";

export class PubFile {
  static decode(txt) { // bin pubkey
    const ss = txt.split(" ");
    const bin = Base64.decode(ss[1]);
    if (bin.length != 51) {
      return null;
    }
    if (bin2i(bin, 0) != 11) {
      return null;
    }
    if (bin2s(bin, 4, 11) != "ssh-ed25519") {
      return null;
    }
    if (bin2i(bin, 4 + 11) != 32) {
      return null;
    }
    const pub = subbin(bin, 4 + 11 + 4, 32);
    return pub;
  }
  static encode(pubkey) {
    const bin = new Uint8Array(51);
    i2bin(bin, 0, 11);
    s2bin(bin, 4, "ssh-ed25519");
    i2bin(bin, 4 + 11, 32);
    setbin(bin, 4 + 11 + 4, pubkey);
    const cr = "\n";
    return "ssh-ed25519 " + Base64.encode(bin) + cr;
  }
}
