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
      const sign = ss[ss.length - 1].substring(SIGN_PREFIX.length);
      const ss2 = [];
      for (let i = 0; i < ss.length - 1; i++) {
        ss2.push(ss[i]);
      }
      return [ss2.join("\n"), sign];
    }
    return [s, null];
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
