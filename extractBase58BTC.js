import { PEMFile } from "./PEMFile.js";
//import { Base58BTC } from "https://code4fukui.github.io/Base58/Base58.js";
import { Base58BTC } from "../Base58/Base58BTC.js";

const name = "key";
const keys = PEMFile.decode(await Deno.readTextFile(name + ".private.pem"))
console.log(keys);

console.log(Base58BTC.encodePublicKey(keys.publicKey));
console.log(Base58BTC.encodePrivateKey(keys.privateKey));

//console.log(Base58BTC.decode("z6MknCCLeeHBUaHu4aHSVLDCYQW9gjVJ7a63FpMvtuVMy53T"));
//console.log(Base58BTC.decode("zrv2EET2WWZ8T1Jbg4fEH5cQxhbUS22XxdweypUbjWVzv1YD6VqYuW6LH7heQCNYQCuoKaDwvv2qCWz3uBzG2xesqmf"));
