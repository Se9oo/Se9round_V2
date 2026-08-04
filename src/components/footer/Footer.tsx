import React from 'react';
import GithubIcon from '../icons/GithubIcon';

const Footer = () => {
	const year = new Date().getFullYear();

	return (
		<footer className="mt-4 flex w-full flex-col items-center justify-center pt-4 pb-8 font-medium">
			<a
				href="https://github.com/Se9oo"
				target="_blank"
				rel="noreferrer"
				className="mb-2 rounded-full hover:bg-darkText dark:hover:bg-greyCopy"
				data-id="github-link"
				aria-label="move to github"
			>
				<GithubIcon />
			</a>
			<span className="mb-2 block text-sm">Copyright &copy; {year} se9oo</span>
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
