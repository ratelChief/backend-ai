import { parseArgs } from 'node:util';
import { readFile } from 'node:fs/promises';
import { stderr, stdout } from 'node:process';

const report = async () => {
  const { values } = parseArgs({
    options: {
      input: { type: 'string' },
      out: { type: 'string' },
      format: { type: 'string' },
    },
  });

  if (!values.input) {
    stderr.write('Input file is required');
    process.exit(1);
  }

  const data = await readFile(values.input, 'utf-8');

  stdout.write(data);
};

void report();
