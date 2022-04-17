export interface ITransactionInitiatedEvent {
  amount: number;
  projectId: string;
  id: string;
}

export interface ITransactionFinalizedEvent {
  projectId: string;
  id: string;
}
