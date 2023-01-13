import React, { ChangeEvent } from 'react';

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
			className="w-full h-12 p-4 leading-4 tracking-[-0.5px] rounded mb-4 border-[1.5px] border-grey dark:border-none focus:outline-main"
			placeholder={placeholder || ''}
			onChange={handleChangeValue}
		/>
	);
};

export default SearchInput;
