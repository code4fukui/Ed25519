# Ed25519

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A DID (Decentralized Identifier) e-signature tool based on the Ed25519 algorithm.

## Demo
- [DID e-signature Tool](https://code4fukui.github.io/Ed25519/)
- [DID e-signature Verifier](https://code4fukui.github.io/Ed25519/verify.html)
- [Create your DID](https://code4fukui.github.io/Ed25519/createDID.html)

## Features
- Generate Ed25519 key pairs and encode as DID
- Sign text with private key and add signature
- Verify signed text against public key

## Requirements
This project uses the Deno runtime environment. No other dependencies.

## Usage
Run the key generation script:

```
deno run -A https://code4fukui.github.io/Ed25519/makeKey.js
```

This will output the private and public keys as PEM and PubFile formats.

## Dependencies
- [forge-es](https://github.com/taisukef/forge-es) - Forked from [digitalbazaar/forge](https://github.com/digitalbazaar/forge)

## License
MIT License — see [LICENSE](LICENSE).