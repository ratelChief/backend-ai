import { parseArgs } from 'node:util';
import { stderr, stdout } from 'node:process';
import { createWriteStream } from 'node:fs';
import { access, mkdir } from 'node:fs/promises';
import { constants } from 'node:fs';
import { dirname } from 'node:path';
import { finished } from 'node:stream/promises';
import { ZodError } from 'zod';

import { buildReport } from './build-report.js';
import { cliSchema } from './constants.js';
import { resolveInputFormat } from './utils.js';

async function writeReportFile(outPath: string, report: unknown): Promise<void> {
  await mkdir(dirname(outPath), { recursive: true });

  const writeStream = createWriteStream(outPath, { encoding: 'utf-8' });
  writeStream.write(JSON.stringify(report, null, 2));
  writeStream.end();

  await finished(writeStream);
}

async function ensureInputExists(inputPath: string): Promise<void> {
  try {
    await access(inputPath, constants.F_OK);
  } catch {
    stderr.write(`Input file not found: ${inputPath}\n`);
    process.exit(1);
  }
}

async function main(): Promise<void> {
  const { values } = parseArgs({
    options: {
      input: { type: 'string' },
      out: { type: 'string' },
      format: { type: 'string' },
    },
  });

  const parsed = cliSchema.safeParse(values);
  if (!parsed.success) {
    stderr.write(`${parsed.error.message}\n`);
    process.exit(1);
  }

  const { input, out, format } = parsed.data;

  let inputFormat;
  try {
    inputFormat = resolveInputFormat(format, input);
  } catch (error) {
    const message = error instanceof ZodError ? error.message : String(error);
    stderr.write(`${message}\n`);
    process.exit(1);
  }

  await ensureInputExists(input);

  const reportData = await buildReport(input, inputFormat);

  await writeReportFile(out, reportData);

  stdout.write(
    `total=${reportData.total} valid=${reportData.valid} invalid=${reportData.invalid} revenue=${reportData.revenueCents}\n`,
  );
}

void main().catch((error) => {
  stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exit(1);
});
