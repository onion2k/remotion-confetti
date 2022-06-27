const { build } = require('esbuild');
const { dependencies, peerDependencies } = require('./package.json');
const { Generator } = require('npm-dts');

const shared = {
  entryPoints: ['src/index.tsx'],
  bundle: true,
  external: Object.keys(dependencies).concat(Object.keys(peerDependencies)),
  sourcemap: true,
  minify: true
};

build({
  ...shared,
  outfile: 'dist/index.js'
}).catch(() => process.exit(1));

build({
  ...shared,
  outfile: 'dist/index.esm.js',
  format: 'esm',
  target: ['esnext']
}).catch(() => process.exit(1));

new Generator({
  entry: 'src/index.tsx',
  output: 'dist/index.d.ts'
}).generate();
