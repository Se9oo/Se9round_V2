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

/**
 *
 * @param {string} date
 * @param {kor | hyphen} type
 * @returns date formatter
 */
export const getFormattedDate = (date: string, type: 'kor' | 'hyphen') => {
	if (!date) {
		return date;
	}

	const FORMATTED_DATE_LENGTH = 8;

	const newDate = date.replace(/[-\D]/g, '');

	if (newDate.length !== FORMATTED_DATE_LENGTH) {
		return newDate;
	}

	const year = newDate.substring(0, 4);
	const month = newDate.substring(4, 6);
	const day = newDate.substring(6, 8);

	if (type === 'kor') {
		return `${year}년 ${month}월 ${day}일`;
	}

	if (type === 'hyphen') {
		return `${year}-${month}-${day}`;
	}

	return newDate;
};
