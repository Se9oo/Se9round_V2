import React from 'react';
import { PAGINATION_LIMIT_COUNT } from '~/constants/common';
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
		<div className="flex items-center justify-center w-full py-4">
			{currentPage === 1 ? null : (
				<button type="button" onClick={() => handleActions('prev')} aria-label="previous pagination button">
					<ChevronLeftIcon className="hover:text-main" />
				</button>
			)}
			<ul className="flex items-center justify-center">
				{pages.map((item) => {
					return (
						<li key={item}>
							<button
								type="button"
								className={`text-lg w-8 h-8 hover:text-main ${
									currentPage === item ? 'text-main font-bold' : 'text-dark dark:text-darkText'
								}`}
								onClick={() => handlePage(item)}
							>
								{item}
							</button>
						</li>
					);
				})}
			</ul>
			{currentPage === Math.ceil(totalCount / PAGINATION_LIMIT_COUNT) ? null : (
				<button type="button" onClick={() => handleActions('next')} aria-label="next pagination button">
					<ChevronRightIcon className="hover:text-main" />
				</button>
			)}
		</div>
	);
};

export default Pagination;
