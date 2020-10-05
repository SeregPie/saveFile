import {terser} from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';

import {main} from './package.json';

export default {
	input: 'src/index.js',
	plugins: [
		babel({
			babelHelpers: 'bundled',
			presets: ['@babel/preset-env'],
		}),
		terser(),
	],
	output: {
		file: main,
		format: 'umd',
		name: 'saveFile',
	},
};
