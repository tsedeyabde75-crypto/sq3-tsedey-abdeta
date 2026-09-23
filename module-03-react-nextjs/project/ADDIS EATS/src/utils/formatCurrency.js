export const formatCurrency = (amount) => {
  const numericAmount = Number(amount) || 0;
  return `${numericAmount.toFixed(2)} ETB`;
};