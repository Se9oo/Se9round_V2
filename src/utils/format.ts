/* eslint-disable import/prefer-default-export */

/**
 *
 * @param {string} text
 * @returns 공백을 -로 치환 (ex 이건 타이틀 이다 -> 이건-타이틀-이다)
 */
export const convertSpaceToDash = (text: string) => {
	return text.replace(/ /g, '-');
};

/**
 *
 * @param {string} str
 * @returns heading tag의 id 생성
 */
export const generateSlug = (str: string) => {
	const text = str
		?.replace(/^\s+|\s+$/g, '')
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-');

	return text;
};
