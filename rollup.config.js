import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import eslint from 'rollup-plugin-eslint'
import includePaths from 'rollup-plugin-includepaths'
import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'

export default {
  entry: './src/scripts/main.js',
  dest: './dist/main.js',
  format: 'iife',
  sourceMap: true,
  plugins: [
    includePaths({
      paths: ['./node_modules/jasny-bootstrap/dist/js/']
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs(),
    babel({
      babelrc: false,
      presets: ['es2015-rollup'],
      exclude: './node_modules/**'
    }),
    uglify(),
    eslint()
  ]
}
