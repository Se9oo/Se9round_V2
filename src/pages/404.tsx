import React from 'react';
import { useRouter } from 'next/router';
import MainLayout from '~/components/layout/MainLayout';

const Page404 = () => {
	const router = useRouter();

	const handleMoveHome = () => {
		router.push('/');
	};

	return (
		<MainLayout>
			<div className="w-full h-[calc(100vh-104px-144px)] flex justify-center items-center">
				<div className="flex flex-col">
					<strong className="text-3xl mb-8">페이지를 찾을 수 없습니다</strong>
					<button
						type="button"
						className="bg-main rounded h-12 font-bold text-white dark:text-darkText"
						onClick={handleMoveHome}
					>
						홈으로
					</button>
				</div>
			</div>
		</MainLayout>
	);
};

export default Page404;
