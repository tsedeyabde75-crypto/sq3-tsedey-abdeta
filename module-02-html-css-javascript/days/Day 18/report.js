export const totalByType = (txns, type) =>
  txns
    .filter(t => t.type === type)
    .reduce((sum, { amount }) => sum + amount, 0);

export const generateReceipts = (txns) =>
  txns.map(
    ({ customer, amount, type }) =>
      `Receipt: ${customer} paid ${amount} ETB (${type.toUpperCase()})`
  );

export const updateTransaction = (txns, id, newDetails) =>
  txns.map((txn) => (txn.id === id ? { ...txn, ...newDetails } : txn));