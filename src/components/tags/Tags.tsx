import React, { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import { useRouter } from 'next/router';
import TagList from './TagList';
import PostList from '../posts/PostList';
import SearchInput from '../common/search/SearchInput';
import { PostFileType } from '~/types/post';

const Tags = ({ tags, posts }: { tags: string[]; posts: PostFileType[] }) => {
	const router = useRouter();

	const [searchPosts, setSearchPosts] = useState<PostFileType[]>([]);
	const [searchTag, setSearchTag] = useState('');

	const handleSearchTag = _.debounce((e: ChangeEvent<HTMLInputElement>) => {
		setSearchTag(e.target.value);
	}, 300);

	const handleTagClick = useCallback((e: MouseEvent, tagName: string) => {
		setSearchTag(tagName);
	}, []);

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
			<SearchInput value={searchTag} handleChangeValue={handleSearchTag} placeholder="태그를 입력하세요" />
			{tags && tags.length > 0 ? <TagList tags={tags} handleTagClick={handleTagClick} /> : null}
			{searchPosts && searchPosts.length > 0 ? <PostList posts={searchPosts} /> : null}
		</>
	);
};

export default Tags;
