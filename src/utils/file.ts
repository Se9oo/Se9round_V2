import fs from 'fs';
import matter from 'gray-matter';
import supabase from '~/supabaseClient';
import { MARKDOWN_FILE_PATH } from '~/constants/url';
import { SUPABASE_BUCKET_NAME } from '~/constants/common';

const getMarkdownFileList = () => {
	return fs.readdirSync(MARKDOWN_FILE_PATH);
};

export const getPostDataAtFile = (fileName: string) => {
	const { data, content } = matter(fs.readFileSync(`${MARKDOWN_FILE_PATH}/${fileName}`, 'utf-8'));

	return { data, content };
};

const getThumbNailPath = (socialImageName: string | null) => {
	const {
		data: { publicUrl },
	} = supabase.storage.from(SUPABASE_BUCKET_NAME).getPublicUrl(socialImageName || 'default.png');

	return publicUrl;
};

export const getPostDataFromMarkdownFiles = () => {
	const files = getMarkdownFileList();

	const posts = files.map((fileName) => {
		const { data: postData, content } = getPostDataAtFile(fileName);
		const thumbnailPath = getThumbNailPath(postData.socialImage);

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
