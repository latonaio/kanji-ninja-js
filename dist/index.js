"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalize = void 0;
const kana_1 = require("./mapping/kana");
const kanji_1 = require("./mapping/kanji");
const mapping = Object.assign({}, kana_1.default, kanji_1.default);
const removeVariationSelectors = (text) => {
    // SVS, IVS のための特殊文字 (VS1 - VS16, VS17 - VS256) の削除
    return text.replace(/[\ufe00-\ufe0f\u{e0100}-\u{e01ef}]/gu, '');
};
const translateWithMapping = (text, mapping) => {
    const result = [];
    for (const char of text) {
        if (mapping.hasOwnProperty(char)) {
            result.push(mapping[char]);
        }
        else {
            result.push(char);
        }
    }
    return result.join('');
};
const normalize = (text) => {
    // Unicode 正規化
    // * 英数字・記号の全角 → 半角化
    // * 半角カナの全角化
    // * 組み文字のバラシ
    // など
    // (この時点で一部の漢字の字形が変化する 神 → 神 など)
    text = text.normalize('NFKC');
    // variation selector の削除
    text = removeVariationSelectors(text);
    // 英字を小文字化
    text = text.toLowerCase();
    // 文字マッピングで変換
    // カタカナ → ひらがな, 漢字の字形を統一
    text = translateWithMapping(text, mapping);
    return text;
};
exports.normalize = normalize;
