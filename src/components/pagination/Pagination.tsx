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
		<div className="w-full flex justify-center items-center py-4">
			{currentPage === 1 ? null : (
				<button type="button" onClick={() => handleActions('prev')}>
					<ChevronLeftIcon className="mt-1" />
				</button>
			)}
			<ul className="flex justify-center items-center">
				{pages.map((item) => {
					return (
						<li key={item} className="mx-3">
							<button
								type="button"
								className={`text-lg
              ${currentPage === item ? 'text-main font-bold' : 'text-dark dark:text-darkText'}`}
								onClick={() => handlePage(item)}
							>
								{item}
							</button>
						</li>
					);
				})}
			</ul>
			{currentPage === Math.ceil(totalCount / PAGINATION_LIMIT_COUNT) ? null : (
				<button type="button" onClick={() => handleActions('next')}>
					<ChevronRightIcon className="mt-1" />
				</button>
			)}
		</div>
	);
};

export default Pagination;
