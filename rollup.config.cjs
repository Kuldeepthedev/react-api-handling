const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { babel } = require('@rollup/plugin-babel');
const json = require('@rollup/plugin-json');
const replace = require('@rollup/plugin-replace');

module.exports = {
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
    resolve({
      preferBuiltins: true,
      browser: true,
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    json(), // Convert CommonJS modules to ES6
    babel({
      exclude: 'node_modules/**', // Exclude node_modules from being transpiled
      babelHelpers: 'bundled',
    }),
  ],
  resolve: {
    fallback: {
      util: require.resolve('util'),
      stream: require.resolve('stream-browserify'),
    },
  },
  external: ['react', 'react-dom'], // Adjust according to your library’s dependencies
};
