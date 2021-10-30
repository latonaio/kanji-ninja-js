# kanji-ninja-js

似た文字を同一視して検索するための、日本語正規化ライブラリです。

例として以下のような変換を行います。

* 似た漢字の統一 (髙 → 高, 邉 → 辺, 齋 → 斉 など)
* 半角・全角カタカナ → ひらがなに統一
* 全角英数・記号 → 半角に統一
* 英大文字 → 小文字に統一
* 組み文字の分解 (㍿ → 株式会社 など)


## インストール方法

yarn または npm でインストールしてください。

```sh
yarn add "git+https://github.com/latonaio/kanji-ninja-js.git#main"
```

または

```sh
npm install "git+https://github.com/latonaio/kanji-ninja-js.git#main"
```


## 使い方

本ライブラリをインポートします。

```js
import { normalize } from 'kanji-ninja-js';
```

以下のように、似た文字列を正規化により同一視することができます。

```js
normalize('ラトナ株式会社') === normalize('ﾗﾄﾅ㍿')
normalize('斎藤') === normalize('齋藤')
normalize('山﨑') === normalize('山崎')
```


### ライセンス

本ライブラリには、情報処理推進機構・文字情報技術促進協議会による文字情報基盤の事業成果物を基に作成したマッピングが含まれています。

当該マッピング部分 (`src/mapping/kanji.ts`, `dist/mapping/kanji.js`) のみ [CC-BY-SA-2.1-JP](https://creativecommons.org/licenses/by-sa/2.1/jp/) ライセンス、それ以外は MIT ライセンスとなります。
