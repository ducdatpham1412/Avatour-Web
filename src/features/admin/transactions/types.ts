type TransactionData = {
  totalPages: number;
  totalItems: number;
  take: number;
  pageIndex: number;
  data: Partial<TypeJoinEstimate>[];
};

interface TransactionsProps {
  data: TransactionData;
  query: Record<string, any>;
}

export type { TransactionData, TransactionsProps };
