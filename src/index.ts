import mappingKana from './mapping/kana';
import mappingKanji from './mapping/kanji';

export interface Mapping {
  [charFrom: string]: string;
}

const mapping: Mapping = Object.assign({}, mappingKana, mappingKanji);


const removeVariationSelectors = (text: string) => {
  // SVS, IVS のための特殊文字 (VS1 - VS16, VS17 - VS256) の削除
  return text.replace(/[\ufe00-\ufe0f\u{e0100}-\u{e01ef}]/gu, '');
};

const translateWithMapping = (text: string, mapping: Mapping) => {
  const result: string[] = [];
  for (const char of text) {
    if (mapping.hasOwnProperty(char)) {
      result.push(mapping[char]);
    } else {
      result.push(char);
    }
  }
  return result.join('');
};

export const normalize = (text: string) => {
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
