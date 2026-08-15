import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import storybook from 'eslint-plugin-storybook';

/**
 * Flat config. `eslint-config-next` v16 and `eslint-plugin-storybook` v10 both
 * ship flat-config arrays directly, so no `FlatCompat` shim is needed.
 */
const eslintConfig = [
  {
    ignores: [
      '.next/**',
      'out/**',
      'storybook-static/**',
      'node_modules/**',
      'next-env.d.ts',
      '!.storybook/**',
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  ...storybook.configs['flat/recommended'],
];

export default eslintConfig;
