export const formatMoney = (amountCents: number) => {
  return `$${(amountCents / 100).toFixed(2)}`;
};
