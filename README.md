# Ed25519

## app

- [DID電子署名ツール](https://code4fukui.github.io/Ed25519/)
![ogp-png](https://user-images.githubusercontent.com/1715217/170382910-b9e75ff5-72cd-485d-b179-a7ae5fc918e5.png)

- [DID電子署名検証ツール](https://code4fukui.github.io/Ed25519/verify.html)
- [create your DID](https://code4fukui.github.io/Ed25519/createDID.html)

## How to use

```
deno run -A https://code4fukui.github.io/Ed25519/makeKey.js
```
output files
- key.private.pem
- key.pub

## test code

- [test-ed25519](https://github.com/taisukef/forge-es/blob/es/examples/test-ed25519.js)

## dependencies

- [forge-es](https://github.com/taisukef/forge-es) forked from [digitalbazaar/forge](https://github.com/digitalbazaar/forge)

## blog

- [サイバー時代のハンコ、テキストにDIDで署名する「DID電子署名ツール」と禁断のDID鍵公開](https://fukuno.jig.jp/3591)
