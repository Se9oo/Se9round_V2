import eslint from '@eslint/js';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import eslintConfigPrettier from 'eslint-config-prettier';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	eslint.configs.recommended,
	tseslint.configs.recommended,
	...nextCoreWebVitals,
	eslintConfigPrettier,
	{
		plugins: {
			'unused-imports': unusedImports,
		},
		rules: {
			'no-unused-vars': 'off',
			'unused-imports/no-unused-imports': 'error',
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_|[A-Z]',
					caughtErrors: 'none',
					ignoreRestSiblings: true,
				},
			],
			'react-hooks/exhaustive-deps': 'off',
			'react/display-name': 'off',
			'react/jsx-uses-react': 'off',
			'react/react-in-jsx-scope': 'off',
		},
	},
);
