import typescript from 'rollup-plugin-typescript'

export default {
  input: 'src/index.ts',
  output: {
      file: 'lib/index.js',
      format: 'cjs'
  },
  plugins: [typescript()],
  external: ['redux', 'runtypes']
}