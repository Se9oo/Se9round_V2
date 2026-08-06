'use client';

import React from 'react';
import { PAGINATION_LIMIT_COUNT } from '@/constants/common';
import ChevronLeftIcon from '../icons/ChevronLeftIcon';
import ChevronRightIcon from '../icons/ChevronRightIcon';

const Pagination = ({
	totalCount,
	currentPage,
	handlePage,
}: {
	totalCount: number;
	currentPage: number;
	handlePage: (page: number) => void;
}) => {
	const pages = Array.from({ length: Math.ceil(totalCount / PAGINATION_LIMIT_COUNT) }, (_, i) => i + 1);

	const handleActions = (action: 'prev' | 'next') => {
		handlePage(action === 'prev' ? currentPage - 1 : currentPage + 1);
	};

	return (
		<div className="flex w-full items-center justify-center gap-1 py-4">
			<button
				type="button"
				className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-main/10 disabled:cursor-not-allowed
					disabled:opacity-30 disabled:hover:bg-transparent dark:hover:bg-main/20"
				onClick={() => handleActions('prev')}
				aria-label="previous pagination button"
				disabled={currentPage === 1}
			>
				<ChevronLeftIcon className="w-6" />
			</button>
			<ul className="flex items-center justify-center gap-1">
				{pages.map((item) => {
					return (
						<li key={item}>
							<button
								type="button"
								className={`h-8 w-8 rounded-md text-lg hover:bg-main/10 hover:text-main dark:hover:bg-main/20 ${
									currentPage === item
										? 'bg-main/10 font-bold text-main dark:bg-main/20'
										: 'text-dark dark:text-darkText'
								}`}
								onClick={() => handlePage(item)}
							>
								{item}
							</button>
						</li>
					);
				})}
			</ul>
			<button
				type="button"
				className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-main/10 disabled:cursor-not-allowed
					disabled:opacity-30 disabled:hover:bg-transparent dark:hover:bg-main/20"
				onClick={() => handleActions('next')}
				aria-label="next pagination button"
				disabled={currentPage === Math.ceil(totalCount / PAGINATION_LIMIT_COUNT)}
			>
				<ChevronRightIcon className="w-6" />
			</button>
		</div>
	);
};

export default Pagination;
