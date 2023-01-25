import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PostDataType } from '~/types/post';

const KakaoShare = ({ post }: { post: PostDataType }) => {
	const router = useRouter();
	const {
		metaData: { title, description, socialImage },
	} = post;

	useEffect(() => {
		const createKakaoButton = () => {
			if (window.Kakao) {
				const kakao = window.Kakao;
				const url = `${process.env.NEXT_PUBLIC_HOME_URL}/post/${router.query.title}`;

				kakao.Link.createDefaultButton({
					container: '#kakao-link-btn',
					objectType: 'feed',
					content: {
						title,
						description,
						imageUrl: socialImage || '',
						link: {
							mobileWebUrl: url,
							webUrl: url,
						},
					},
					buttons: [
						{
							title: '웹으로 보기',
							link: {
								mobileWebUrl: url,
								webUrl: url,
							},
						},
					],
				});
			}
		};

		createKakaoButton();
	}, [title, description, socialImage, router.query.title]);

	return (
		<button id="kakao-link-btn" type="button" className="w-9 h-9">
			<img
				src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"
				alt="카카오링크 보내기 버튼"
			/>
		</button>
	);
};

export default KakaoShare;