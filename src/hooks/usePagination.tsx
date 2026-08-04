'use client';

import { useState } from 'react';

const usePagination = (length: number) => {
	const [page, setPage] = useState(1);

	const handlePage = (pageNumber: number) => {
		setPage(pageNumber);
		window.scrollTo(0, 0);
	};

	return { page, totalCount: length, handlePage };
};

export default usePagination;
