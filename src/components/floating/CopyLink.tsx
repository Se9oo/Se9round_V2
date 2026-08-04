'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import LinkIcon from '../icons/LinkIcon';

const CopyLink = () => {
	const params = useParams<{ title: string }>();
	const { theme } = useTheme();

	const handleCopyLink = () => {
		const copyLink = `${process.env.NEXT_PUBLIC_HOME_URL}/post/${params.title}`;
		navigator.clipboard.writeText(copyLink);

		toast.success('링크 복사 완료', {
			position: 'top-center',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: undefined,
			theme: theme === 'light' ? 'light' : 'dark',
		});
	};

	return (
		<button
			type="button"
			className="flex h-9 w-9 items-center justify-center rounded-md bg-darkText text-dark transition-all
				hover:bg-greyLight"
			onClick={handleCopyLink}
		>
			<LinkIcon />
		</button>
	);
};

export default CopyLink;
