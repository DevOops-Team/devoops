export interface Event {
  actor: string;
  action: string;
  target?: string | null;
  detail?: string | null;
  createdAt: Date;
}
