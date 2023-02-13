import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MoveToTop from '../MoveToTop';

window.scrollTo = jest.fn();

describe('페이지 상단 이동 버튼', () => {
	let moveToTopButton: HTMLElement;

	beforeEach(() => {
		render(<MoveToTop />);
		moveToTopButton = screen.getByRole('button');
	});

	test('페이지 상단 이동 버튼 화면 출력', () => {
		expect(moveToTopButton).toBeInTheDocument();
	});

	test('버튼 클릭시 페이지 상단 이동', async () => {
		await userEvent.click(moveToTopButton);

		expect(window.scrollTo).toHaveBeenCalledWith({
			top: 0,
			behavior: 'smooth',
		});
	});
});
