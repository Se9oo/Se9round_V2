import React from 'react';
import PostCard from './PostCard';

const test = [1, 2, 3, 4, 5, 6];

const PostList = () => {
	return (
		<ul className="pt-16">
			{test.map((post) => {
				return (
					<li key={post} className="my-8 sm:my-11">
						<PostCard />
					</li>
				);
			})}
		</ul>
	);
};

export default PostList;
