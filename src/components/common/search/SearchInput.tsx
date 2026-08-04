'use client';

import { ChangeEvent } from 'react';

const SearchInput = ({
	handleChangeValue,
	placeholder,
}: {
	handleChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
}) => {
	return (
		<input
			type="text"
			className="mb-4 h-12 w-full rounded-sm border-[1.5px] border-grey p-4 leading-4 tracking-[-0.5px]
				focus:outline-main dark:border-none"
			placeholder={placeholder || ''}
			onChange={handleChangeValue}
		/>
	);
};

export default SearchInput;
