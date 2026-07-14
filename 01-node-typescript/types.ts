export type InputFormat = 'ndjson' | 'csv';

export type EventType = 'login' | 'purchase' | 'logout';

export type LoginEvent = {
  id: string;
  type: 'login';
  userId: string;
  ts: string;
};

export type LogoutEvent = {
  id: string;
  type: 'logout';
  userId: string;
  ts: string;
};

export type PurchaseEvent = {
  id: string;
  type: 'purchase';
  userId: string;
  ts: string;
  amountCents: number;
  sku: string;
};

export type Event = LoginEvent | LogoutEvent | PurchaseEvent;

export type ReportError = {
  line: number;
  message: string;
};

export type Report = {
  total: number;
  valid: number;
  invalid: number;
  byType: Record<EventType, number>;
  revenueCents: number;
  errors: ReportError[];
};

export type FormatHandler = {
  shouldSkipLine: (lineNumber: number) => boolean;
  parseLine: (line: string) => unknown;
};

export type CliArgs = {
  input: string;
  out: string;
  format?: string | undefined;
};
