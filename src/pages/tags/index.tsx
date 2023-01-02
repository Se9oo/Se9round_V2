/* eslint-disable array-callback-return */
import React from 'react';
import fs from 'fs';
import matter from 'gray-matter';
import { MARKDOWN_FILE_PATH } from '~/constants/url';
import MainLayout from '~/components/layout/MainLayout';
import TagList from '~/components/common/tag/TagList';

const Tags = (props: { tags: string[] }) => {
	const { tags } = props;

	return (
		<MainLayout>
			<h1 className="text-4xl mb-20">TAGS</h1>
			<TagList tags={tags} />
		</MainLayout>
	);
};

export default Tags;

export const getStaticProps = async () => {
	const files = fs.readdirSync(MARKDOWN_FILE_PATH);

	const tags = files.map((file) => {
		const fileName = file.replace('.md', '');

		const content = fs.readFileSync(`${MARKDOWN_FILE_PATH}/${file}`, 'utf-8');
		const parsedContent = matter(content);

		const { data } = parsedContent;

		return {
			tags: data.tags,
		};
	});
	const tagSet = new Set();

	tags.map((tagRow) => {
		tagRow.tags.map((tag: string) => {
			tagSet.add(tag);
		});
	});

	return {
		props: {
			tags: [...tagSet],
		},
	};
};
