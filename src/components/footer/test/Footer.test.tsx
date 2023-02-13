import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('footer', () => {
	test('footer init', () => {
		const { container } = render(<Footer />);

		const githubLink = container.querySelector('[data-id="github-link"]');
		expect(githubLink).toBeInTheDocument();

		const copyright = screen.getByText(/Copyright © 2023 se9oo/);
		expect(copyright).toBeInTheDocument();

		const githubProjectLink = screen.getByText('se9round.dev');
		expect(githubProjectLink).toBeInTheDocument();
	});

	test('github 이동', () => {
		const { container } = render(<Footer />);

		const githubLink = container.querySelector('[data-id="github-link"]');
		expect(githubLink).toHaveAttribute('href', 'https://github.com/Se9oo');
	});

	test('github project 이동', () => {
		render(<Footer />);

		const githubProjectLink = screen.getByText('se9round.dev');
		expect(githubProjectLink).toHaveAttribute('href', 'https://github.com/Se9oo/Se9round_V2');
	});
});
