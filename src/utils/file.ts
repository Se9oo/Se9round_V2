import fs from 'fs';
import matter from 'gray-matter';
import { MARKDOWN_FILE_PATH } from '~/constants/url';
import { CLOUDFLARE_BUCKET_URL } from '~/constants/common';

const getMarkdownFileList = () => {
	return fs.readdirSync(MARKDOWN_FILE_PATH);
};

export const getPostDataAtFile = (fileName: string) => {
	const { data, content } = matter(fs.readFileSync(`${MARKDOWN_FILE_PATH}/${fileName}`, 'utf-8'));

	return { data, content };
};

export const getPostDataFromMarkdownFiles = () => {
	const files = getMarkdownFileList();

	const posts = files.map((fileName) => {
		const { data: postData, content } = getPostDataAtFile(fileName);
		const thumbnailPath = `${CLOUDFLARE_BUCKET_URL}/${postData.socialImage}`;

		const newData = {
			...postData,
			socialImage: thumbnailPath,
			tags: postData.tags,
			timestamp: postData.timestamp,
			title: postData.title,
		};

		return {
			fileName: fileName.replace('.md', ''),
			data: newData,
		};
	});

	return posts;
};
