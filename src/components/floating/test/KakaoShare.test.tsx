import React from 'react';
import { render, screen } from '@testing-library/react';
import KakaoShare from '../KakaoShare';
import { PostDataType } from '~/types/post';

const post: PostDataType = {
	content: '',
	metaData: {
		date: '2022-02-13',
		description: '',
		tags: ['tag'],
		timestamp: 202202130000,
		title: 'title',
		socialImage: '',
	},
};

// eslint-disable-next-line global-require
jest.mock('next/router', () => require('next-router-mock'));

test('카카오 공유하기', async () => {
	render(<KakaoShare post={post} />);

	const kakaoShareButton = screen.getByRole('button');
	expect(kakaoShareButton).toBeInTheDocument();
});
