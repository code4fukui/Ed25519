import { Ed25519 } from "https://code4fukui.github.io/Ed25519/Ed25519.js";
import { Text } from "https://code4fukui.github.io/Ed25519/Text.js";
import { DIDKey } from "https://code4fukui.github.io/Ed25519/DIDKey.js";

export const checkSign = (did, body) => { // throws
  const publicKey = DIDKey.decode(did)?.data;
  if (!publicKey) {
    throw "no publicKey";
  }
  const sign = Text.extractSign(body);
  if (!sign) {
    throw "no sign";
  }
  const signature = DIDKey.decode(sign)?.data;
  if (!signature) {
    throw "sign not match";
  }
  const message = Text.encode(Text.normalize(body));
  const chk = Ed25519.verify({ signature, publicKey, message, encoding: "binary" });
  if (!chk) {
    throw "illegal sign";
  }
};
