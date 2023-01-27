import React, { useEffect, useState } from 'react';
import PostCard from './PostCard';
import Pagination from '../pagination/Pagination';
import { PostFileType } from '~/types/post';
import { PAGINATION_LIMIT_COUNT } from '~/constants/common';

const PostList = ({ posts }: { posts: PostFileType[] }) => {
	const [page, setPage] = useState(1);
	const [totalCount, setTotalCount] = useState(0);

	const handlePage = (pageNumber: number) => {
		setPage(pageNumber);
		window.scrollTo(0, 0);
	};

	useEffect(() => {
		setTotalCount(posts.length);
	}, [posts.length]);

	return (
		<>
			<ul className="pt-8 sm:pt-16">
				{posts
					.slice(
						page * PAGINATION_LIMIT_COUNT - PAGINATION_LIMIT_COUNT,
						page * PAGINATION_LIMIT_COUNT > totalCount ? totalCount : page * PAGINATION_LIMIT_COUNT,
					)
					.map((post) => {
						const { data } = post;
						const { title, date } = data;

						return (
							<li key={`${title}-${date}`} className="mb-12 sm:mb-20">
								<PostCard metaData={data} />
							</li>
						);
					})}
			</ul>
			<Pagination totalCount={posts.length} currentPage={page} handlePage={handlePage} />
		</>
	);
};

export default PostList;
