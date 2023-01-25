import React from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import LinkIcon from '../icons/LinkIcon';

const CopyLink = () => {
	const router = useRouter();
	const { theme } = useTheme();

	const handleCopyLink = () => {
		const copyLink = `${process.env.NEXT_PUBLIC_HOME_URL}/post/${router.query.title}`;
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
			className="w-9 h-9 flex justify-center items-center text-dark bg-darkText hover:bg-greyLight rounded-md transition-all"
			onClick={handleCopyLink}
		>
			<LinkIcon />
		</button>
	);
};

export default CopyLink;
