import React from 'react';
import GithubIcon from '../icons/GithubIcon';

const Footer = () => {
	return (
		<footer className="flex flex-col items-center justify-center w-full pt-4 pb-8 mt-4 font-medium">
			<a
				href="https://github.com/Se9oo"
				target="_blank"
				rel="noreferrer"
				className="mb-2 rounded-full hover:bg-darkText dark:hover:bg-greyCopy"
				data-id="github-link"
			>
				<GithubIcon />
			</a>
			<span className="block mb-2 text-sm">Copyright &copy; 2023 se9oo</span>
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
