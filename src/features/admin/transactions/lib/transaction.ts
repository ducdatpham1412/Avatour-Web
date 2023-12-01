function getTransactionDeposit(data: Partial<TypeJoinEstimate> | undefined, price: number) {
  return data?.list_personals?.reduce((p, c) => p + c.deposit, 0) || 1;
}

function getTransactionPrice(data: Partial<TypeJoinEstimate> | undefined) {
  return data?.list_personals?.reduce((p, c) => p + c.price, 0) ?? 0;
}

export { getTransactionDeposit, getTransactionPrice };
