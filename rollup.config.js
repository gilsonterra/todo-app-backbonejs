import terser from '@rollup/plugin-terser';
import css from "rollup-plugin-import-css";

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/bundle.js',
      format: 'cjs',
    },
    {
      file: 'dist/bundle.min.js',
      format: 'iife',
      name: 'version',
      plugins: [terser()]
    }
  ],
  plugins: [css()]
};