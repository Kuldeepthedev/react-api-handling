import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
export default {
  input: './index.js', // Adjust this to your entry point
  output: [
    {
      file: 'dist/bundle.cjs.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/bundle.esm.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    replace({
        'use client': '', // Replace 'use client' with an empty string or appropriate value
        delimiters: ['', ''], // Make sure to handle the full replacement scenario
        preventAssignment: true,
      }),
    resolve({ preferBuiltins: true }), // Set to true or false as needed
    commonjs(),
    json(), // Convert CommonJS modules to ES6
    babel({ // Transpile code with Babel
      exclude: 'node_modules/**', // Exclude node_modules from being transpiled
      babelHelpers: 'bundled',
    }),

  ],
  external: ['react', 'react-dom'], // Adjust according to your library’s dependencies
};
