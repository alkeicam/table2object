import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/table2object.ts',
  output: [
    {
      file: 'dist/table2object.esm.js',
      format: 'es'
    },
    {
      file: 'dist/table2object.umd.js',
      format: 'umd',
      name: 'table2object'      
    },
  ],  
  external:['moment'],
  plugins: [typescript()],
};
