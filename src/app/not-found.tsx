import React from 'react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { PAGE_URLS } from '@/constants/url';

const NotFound = () => {
	return (
		<MainLayout>
			<div className="flex h-[calc(100vh-104px-144px)] w-full items-center justify-center">
				<div className="flex flex-col">
					<strong className="mb-8 text-3xl">페이지를 찾을 수 없습니다</strong>
					<Link
						href={PAGE_URLS.HOME}
						className="flex h-12 items-center justify-center rounded-sm bg-main text-center font-bold text-white
							dark:text-darkText"
					>
						홈으로
					</Link>
				</div>
			</div>
		</MainLayout>
	);
};

export default NotFound;
