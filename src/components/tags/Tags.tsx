'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import TagList from './TagList';
import PostList from '../posts/PostList';
import { PostFileType } from '@/types/post';

const Tags = ({ tags, posts }: { tags: string[]; posts: PostFileType[] }) => {
	const searchParams = useSearchParams();
	const searchTag = searchParams.get('tagName') ?? '';
	const searchPosts = searchTag ? posts.filter((post) => post.data.tags.includes(searchTag)) : [];

	return (
		<>
			{tags && tags.length > 0 ? <TagList tags={tags} /> : null}
			{searchTag && <h2 className="mt-8 block text-[24px] underline sm:mt-16">{`#${searchTag}`}</h2>}
			{searchPosts && searchPosts.length > 0 ? (
				<PostList posts={searchPosts} />
			) : (
				<span className="mt-24 block w-full text-center">태그를 선택해 주세요</span>
			)}
		</>
	);
};

export default Tags;
