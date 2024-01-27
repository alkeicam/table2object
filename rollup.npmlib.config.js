import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/gameyngine.ts',
  output: [
    {
      file: 'dist/gameyngine.esm.js',
      format: 'es',
      globals: { three: 'THREE' }
    },
    {
      file: 'dist/gameyngine.umd.js',
      format: 'umd',
      name: 'gngine',
      globals: { three: 'THREE' }
    },
  ],
  external:['three'],
  plugins: [typescript()],
};
