function getTransactionDeposit(data: Partial<TypeJoinEstimate> | undefined, price: number) {
  const amount = data?.list_personals?.reduce((p, c) => p + c.amount, 0) || 1;

  return price / amount;
}

function getTransactionPrice(data: Partial<TypeJoinEstimate> | undefined) {
  return data?.list_personals?.reduce((p, c) => p + c.price, 0) ?? 0;
}

export { getTransactionDeposit, getTransactionPrice };
