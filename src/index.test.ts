import { strictEqual } from 'assert';

import { normalize } from '.';


test('equals', () => {
	const tests: string[][] = [
		// 以下の配列内の文字列がすべて等しいと判定されるかのテスト
		['ラトナ株式会社', 'ﾗﾄﾅ㍿', 'らとな株式会社'],
		['ラトナ(株)', 'ﾗﾄﾅ㈱'],
		['Latona, Inc.', 'LATONA, INC.', 'latona, inc.'],
		['齊藤', '齋藤', '斉藤', '齊藤'],
		['高橋', '髙橋'],
		['山崎', '山﨑'],
		['渡辺', '渡邉', '渡邊'],
		['あ い う え お', 'ア　イ　ウ　エ　オ', 'ｱ ｲ ｳ ｴ ｵ'],
		['がぎぐげご', 'ガギグゲゴ', 'ｶﾞｷﾞｸﾞｹﾞｺﾞ'],
	];

	for (const strs of tests) {
		const targets = [...strs];
		const first = targets.pop()!;
		const normalizedFirst = normalize(first);
		for (const target of targets) {
			const normalizedTarget = normalize(target);
			strictEqual(normalizedFirst, normalizedTarget, `${first} -> ${normalizedFirst}, ${target} -> ${normalizedTarget}`);
		}
	}
});
