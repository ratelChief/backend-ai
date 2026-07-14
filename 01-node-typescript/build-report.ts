import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';

import { eventAppliers, eventSchema } from './constants.js';
import { createEmptyReport, formatHandlers, formatZodError } from './utils.js';
import type { InputFormat, Report } from './types.js';

function recordInvalid(report: Report, lineNumber: number, message: string): void {
  report.invalid++;
  report.errors.push({ line: lineNumber, message });
}

function processLine(report: Report, format: InputFormat, line: string, lineNumber: number): void {
  const handler = formatHandlers[format];

  if (handler.shouldSkipLine(lineNumber)) {
    return;
  }

  const trimmed = line.trim();
  if (!trimmed) {
    return;
  }

  report.total++;

  let parsed: unknown;
  try {
    parsed = handler.parseLine(trimmed);
  } catch {
    recordInvalid(report, lineNumber, 'Invalid line');
    return;
  }

  const result = eventSchema.safeParse(parsed);
  if (!result.success) {
    recordInvalid(report, lineNumber, formatZodError(result.error));
    return;
  }

  report.valid++;
  eventAppliers[result.data.type](report, result.data);
}

export async function buildReport(inputPath: string, format: InputFormat): Promise<Report> {
  const report = createEmptyReport();

  const rl = createInterface({
    input: createReadStream(inputPath, 'utf-8'),
    crlfDelay: Infinity,
  });

  let lineNumber = 0;
  for await (const line of rl) {
    lineNumber++;
    processLine(report, format, line, lineNumber);
  }

  return report;
}
