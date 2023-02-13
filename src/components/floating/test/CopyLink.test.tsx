import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CopyLink from '../CopyLink';

// eslint-disable-next-line global-require
jest.mock('next/router', () => require('next-router-mock'));

test('게시글 링크 복사 후 알림메시지 출력', async () => {
	const user = userEvent.setup();
	render(<CopyLink />);

	const copyButton = screen.getByRole('button');
	await user.click(copyButton);

	setTimeout(() => {
		const toastText = screen.getByText('링크 복사 완료');
		expect(toastText).toBeInTheDocument();
	}, 1000);
});
