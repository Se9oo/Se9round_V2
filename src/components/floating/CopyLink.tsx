import React from 'react';
import { useRouter } from 'next/router';
import LinkIcon from '../icons/LinkIcon';

const CopyLink = () => {
	const router = useRouter();

	const handleCopyLink = () => {
		const copyLink = `${process.env.NEXT_PUBLIC_HOME_URL}/post/${router.query.title}`;
		navigator.clipboard.writeText(copyLink);
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
