import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TagList from './TagList';
import PostList from '../posts/PostList';
import { PostFileType } from '~/types/post';

const Tags = ({ tags, posts }: { tags: string[]; posts: PostFileType[] }) => {
	const router = useRouter();

	const [searchPosts, setSearchPosts] = useState<PostFileType[]>([]);
	const [searchTag, setSearchTag] = useState('');

	useEffect(() => {
		if (posts && searchTag) {
			setSearchPosts(posts.filter((post) => post.data.tags.includes(searchTag)));
		}
	}, [searchTag, posts]);

	useEffect(() => {
		if (router.query.tagName) {
			setSearchTag(router.query.tagName as string);
		}
	}, [router.query.tagName]);

	return (
		<>
			{tags && tags.length > 0 ? <TagList tags={tags} /> : null}
			{searchTag && <h2 className="block mt-8 sm:mt-16 text-[24px] underline">{`#${searchTag}`}</h2>}
			{searchPosts && searchPosts.length > 0 ? (
				<PostList posts={searchPosts} />
			) : (
				<span className="block w-full mt-24 text-center">태그를 선택해 주세요</span>
			)}
		</>
	);
};

export default Tags;
