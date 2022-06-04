const SIGN_PREFIX = "signature:"

export class Text {
  static normalize(s) {
    const s2 = s.trim().split("\n");
    let ss = s2.map(s => s.trim());
    if (ss.length > 0 && ss[ss.length - 1].startsWith(SIGN_PREFIX)) {
      ss[ss.length - 1] = "";
      const s0 = ss.join("\n");
      const s2 = s0.trim().split("\n");
      ss = s2.map(s => s.trim());
    }
    return ss.join("\n")
  }
  static extractSign(s) {
    const s2 = s.trim().split("\n");
    let ss = s2.map(s => s.trim());
    if (ss.length > 0 && ss[ss.length - 1].startsWith(SIGN_PREFIX)) {
      return ss[ss.length - 1].substring(SIGN_PREFIX.length);
    }
    return null;
  }
  static addSign(s, sign) {
    return s + "\n\n" + SIGN_PREFIX + sign;
  }
  static encode(s) {
    return new TextEncoder().encode(s);
  }
  static decode(bin) {
    return new TextDecoder().decode(bin);
  }
}
