import { z } from 'zod';

import type { FormatHandler, InputFormat, Report } from './types.js';
import { inputFormatSchema } from './constants.js';

export function parseNdjsonLine(line: string): unknown {
  return JSON.parse(line);
}

export function parseCsvLine(line: string): unknown {
  const [id, type, userId, ts, amountCents, sku] = line.split(',');

  if (type === 'purchase') {
    return {
      id,
      type,
      userId,
      ts,
      amountCents: amountCents === '' ? undefined : Number(amountCents),
      sku: sku === '' ? undefined : sku,
    };
  }

  return { id, type, userId, ts };
}

export const formatHandlers: Record<InputFormat, FormatHandler> = {
  ndjson: {
    shouldSkipLine: () => false,
    parseLine: parseNdjsonLine,
  },
  csv: {
    shouldSkipLine: (lineNumber) => {
      return lineNumber === 1;
    },
    parseLine: parseCsvLine,
  },
};

export function createEmptyReport(): Report {
  return {
    total: 0,
    valid: 0,
    invalid: 0,
    byType: {
      login: 0,
      purchase: 0,
      logout: 0,
    },
    revenueCents: 0,
    errors: [],
  };
}

export function resolveInputFormat(explicit: string | undefined, inputPath: string): InputFormat {
  if (explicit !== undefined) {
    return inputFormatSchema.parse(explicit);
  }

  if (inputPath.endsWith('.csv')) {
    return 'csv';
  }

  return 'ndjson';
}

export function formatZodError(error: z.ZodError): string {
  return error.issues.map((issue) => issue.message).join('; ');
}
