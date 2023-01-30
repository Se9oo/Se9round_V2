import React from 'react';
import GithubIcon from '../icons/GithubIcon';

const Footer = () => {
	return (
		<footer className="w-full flex flex-col justify-center items-center mt-4 pt-4 pb-8 font-medium">
			<a
				href="https://github.com/Se9oo"
				target="_blank"
				rel="noreferrer"
				className="mb-2 hover:bg-darkText dark:hover:bg-greyCopy rounded-full"
			>
				<GithubIcon />
			</a>
			<span className="block text-sm mb-2">Copyright &copy; 2023 se9oo</span>
			<a
				href="https://github.com/Se9oo/Se9round_V2"
				target="_blank"
				rel="noreferrer"
				className="text-[12px] hover:underline"
			>
				se9round.dev
			</a>
		</footer>
	);
};

export default Footer;
