import React from 'react';

const PostCard = () => {
	return (
		<article className="w-full h-48 flex justify-between cursor-pointer">
			<img src="./images/dongdong.jpeg" alt="dongdong" className="w-[36%] rounded-md mr-8 sm:mr-12 object-cover" />
			<div className="relative w-[60%] ">
				<h3 className="font-bold text-[22px] mb-2 sm:mb-4">게시글 제목</h3>
				<p className="text-lg">게시글 상세 설명</p>
				<span className="absolute bottom-0 right-0 text-[15px]">2022.12.20</span>
			</div>
		</article>
	);
};

export default PostCard;
