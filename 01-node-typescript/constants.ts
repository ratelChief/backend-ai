import { z } from 'zod';

import type { Event, EventType, Report } from './types.js';

export const INPUT_FORMATS = ['ndjson', 'csv'] as const;

export const inputFormatSchema = z.enum(INPUT_FORMATS);

export const eventSchema = z.discriminatedUnion('type', [
  z.object({
    id: z.string(),
    type: z.literal('login'),
    userId: z.string(),
    ts: z.string().datetime(),
  }),
  z.object({
    id: z.string(),
    type: z.literal('logout'),
    userId: z.string(),
    ts: z.string().datetime(),
  }),
  z.object({
    id: z.string(),
    type: z.literal('purchase'),
    userId: z.string(),
    ts: z.string().datetime(),
    amountCents: z.number().int().nonnegative(),
    sku: z.string(),
  }),
]);

export const cliSchema = z.object({
  input: z.string(),
  out: z.string(),
  format: inputFormatSchema.optional(),
});

export const eventAppliers: Record<EventType, (report: Report, event: Event) => void> = {
  login: (report) => {
    report.byType.login++;
  },
  purchase: (report, event) => {
    if (event.type !== 'purchase') {
      return;
    }
    report.byType.purchase++;
    report.revenueCents += event.amountCents;
  },
  logout: (report) => {
    report.byType.logout++;
  },
};
