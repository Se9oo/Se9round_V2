import React from 'react';
import PostCard from './PostCard';
import { PostFileType } from '~/types/post';

const PostList = ({ posts }: { posts: PostFileType[] }) => {
	return (
		<ul className="pt-16">
			{posts.map((post) => {
				const { data } = post;
				const { title, date } = data;

				return (
					<li key={`${title}-${date}`} className="mb-12 sm:mb-20">
						<PostCard metaData={data} />
					</li>
				);
			})}
		</ul>
	);
};

export default PostList;
