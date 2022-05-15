import { Base64 } from "https://js.sabae.cc/Base64.js";
import { bin2s, bin2i, subbin, setbin, i2bin, s2bin } from "https://js.sabae.cc/binutil.js";

const BEGIN = "-----BEGIN OPENSSH PRIVATE KEY-----";
const END = "-----END OPENSSH PRIVATE KEY-----";

export class PEMFile {
  static decode(txt) {
    const ss = txt.split("\n").map(s => s.trim());
    const ns = ss.indexOf(BEGIN);
    const ne = ss.indexOf(END);
    if (ns < 0 || ne < 0 || ns > ne) {
      return null;
    }
    const bin = Base64.decode(ss.slice(ns + 1, ne).join(""));
    if (bin2s(bin, 0x2f, 11) != "ssh-ed25519") {
      return null;
    }
    if (bin2s(bin, 0x6e, 11) != "ssh-ed25519") {
      return null;
    }
    if (bin2i(bin, 0x3a) != 32) {
      return null;
    }
    const publicKey = subbin(bin, 0x3e, 32);
    if (bin2i(bin, 0x9d) != 64) {
      return null;
    }
    const privateKey = subbin(bin, 0xa1, 64);
    return { publicKey, privateKey };
  }
  static encode(keys) {
    const pubkey = keys.publicKey;
    const prikey = keys.privateKey;
    const bin = new Uint8Array(234);
    s2bin(bin, 0, "openssh-key-v1\0");
    i2bin(bin, 0xf, 4);
    s2bin(bin, 0x13, "none");
    i2bin(bin, 0x17, 4);
    s2bin(bin, 0x1b, "none");
    i2bin(bin, 0x1f, 0);
    i2bin(bin, 0x23, 1);
    i2bin(bin, 0x27, 0x33);
    i2bin(bin, 0x2b, 0xb);
    s2bin(bin, 0x2f, "ssh-ed25519");
    i2bin(bin, 0x3a, 32);
    setbin(bin, 0x3e, pubkey);
    i2bin(bin, 0x5e, 0x88);
    const rnd = (Math.random() * 0x100000000) >> 0;
    i2bin(bin, 0x62, rnd);
    i2bin(bin, 0x62 + 4, rnd);
    i2bin(bin, 0x6a, 0xb);
    s2bin(bin, 0x6e, "ssh-ed25519");
    i2bin(bin, 0x79, 32);
    setbin(bin, 0x7d, pubkey);
    i2bin(bin, 0x9d, 0x40);
    setbin(bin, 0xa1, prikey);
    setbin(bin, 0xc1, pubkey);
    i2bin(bin, 0xe1, 0);
    setbin(bin, 0xe5, new Uint8Array([1, 2, 3, 4, 5]));
    const cr = "\n";
    return [BEGIN, Base64.encode(bin).replace(/(.{70})/g, "$1" + cr), END].join(cr) + cr;
  }
}
