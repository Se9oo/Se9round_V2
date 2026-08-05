'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const usePagination = (length: number) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const page = Number(searchParams.get('page')) || 1;

	const handlePage = (pageNumber: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set('page', String(pageNumber));
		router.push(`?${params.toString()}`);
	};

	return { page, totalCount: length, handlePage };
};

export default usePagination;
