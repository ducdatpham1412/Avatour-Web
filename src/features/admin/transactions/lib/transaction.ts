function getTransactionPrice(data: Partial<TypeJoinEstimate> | undefined) {
  return data?.list_personals?.reduce((p, c) => p + c.price, 0) ?? 0;
}

export { getTransactionPrice };
