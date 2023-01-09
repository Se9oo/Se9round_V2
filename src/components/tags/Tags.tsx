import React, { ChangeEvent, useState } from 'react';
import _ from 'lodash';
import SearchInput from '../common/search/SearchInput';
import TagList from '../common/tag/TagList';
import PostList from '../posts/PostList';
import { PostFileType } from '~/types/post';

const Tags = ({ tags, posts }: { tags: string[]; posts: PostFileType[] }) => {
	const [searchPosts, setSearchPosts] = useState<PostFileType[]>([]);

	const handleSearchPosts = _.debounce((e: ChangeEvent<HTMLInputElement>) => {
		setSearchPosts(posts.filter((post) => post.data.tags.includes(e.target.value)));
	}, 300);

	return (
		<>
			<SearchInput handleChangeValue={handleSearchPosts} placeholder="태그를 입력하세요" />
			{tags && tags.length > 0 ? <TagList tags={tags} /> : null}
			{searchPosts && searchPosts.length > 0 ? <PostList posts={searchPosts} /> : null}
		</>
	);
};

export default Tags;
