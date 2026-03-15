# Ed25519

Ed25519アルゴリズムに基づくDID (Decentralized Identifier) 電子署名ツールです。

## デモ
- [DID電子署名ツール](https://code4fukui.github.io/Ed25519/)
- [DID電子署名検証ツール](https://code4fukui.github.io/Ed25519/verify.html)
- [DIDの作成](https://code4fukui.github.io/Ed25519/createDID.html)

## 機能
- Ed25519の鍵ペアの生成とDIDエンコーディング
- 秘密鍵による文書への電子署名の付与
- 公開鍵による署名の検証

## 必要環境
Denoランタイム環境を使用しています。その他の依存はありません。

## 使い方
鍵生成スクリプトを実行します:

```
deno run -A https://code4fukui.github.io/Ed25519/makeKey.js
```

これにより、秘密鍵と公開鍵がPEM形式とPubFile形式で出力されます。

## ライセンス
MIT License