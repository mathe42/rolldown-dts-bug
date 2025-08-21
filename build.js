import { rolldown } from 'rolldown';
import { dts } from 'rolldown-plugin-dts';
import fs from 'fs';

console.log('🔨 Demonstrating d.ts naming issue\n');

// Build with entryFileNames set (shows the bug)
const config = {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es',
    entryFileNames: 'mylib.d.ts'  // This causes the issue
  },
  plugins: [
    dts({ emitDtsOnly: true })
  ]
};

const bundle = await rolldown(config);
await bundle.write(config.output);

// Show generated files
const files = await fs.promises.readdir('dist');
console.log('📁 Generated files:');
for (const file of files) {
  const content = await fs.promises.readFile(`dist/${file}`, 'utf-8');
  console.log(`\n${file}:`);
  console.log(content || '(empty)');
}

console.log('\n⚠️  BUG: mylib.d.ts is empty, actual content is in mylib2.d.ts');