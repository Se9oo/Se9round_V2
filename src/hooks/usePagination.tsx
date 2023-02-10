import React, { useEffect, useState } from 'react';

const usePagination = (length: number) => {
	const [totalCount, setTotalCount] = useState(0);
	const [page, setPage] = useState(1);

	const handlePage = (pageNumber: number) => {
		setPage(pageNumber);
		window.scrollTo(0, 0);
	};

	useEffect(() => {
		setTotalCount(length);
	}, [length]);

	return { page, totalCount, handlePage };
};

export default usePagination;
