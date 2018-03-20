// transforms cents to dollars.
export const priceDisplay = (priceInCents) => {
  return `$${priceInCents / 100}`;
};
