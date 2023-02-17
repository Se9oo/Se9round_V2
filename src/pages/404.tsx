import React from 'react';
import Link from 'next/link';
import MainLayout from '~/components/layout/MainLayout';
import { PAGE_URLS } from '~/constants/url';

const Page404 = () => {
	return (
		<MainLayout>
			<div className="w-full h-[calc(100vh-104px-144px)] flex justify-center items-center">
				<div className="flex flex-col">
					<strong className="text-3xl mb-8">페이지를 찾을 수 없습니다</strong>
					<Link
						href={PAGE_URLS.HOME}
						className="flex justify-center items-center bg-main rounded h-12 font-bold text-white dark:text-darkText text-center"
					>
						홈으로
					</Link>
				</div>
			</div>
		</MainLayout>
	);
};

export default Page404;
