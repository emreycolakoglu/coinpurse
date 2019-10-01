export const paymentAccountTypes = [{ key: "Bank", value: "fa-university" }];
export const creditCardTypes = [
  { key: "Credit Card", value: "fa-credit-card" }
];
export const assetTypes = [
  { key: "Home", value: "fa-home" },
  { key: "Credit Card", value: "fa-credit-card" },
  { key: "Paypal", value: "fa-paypal" }
];
export const debtTypes = [
  { key: "Credit Card", value: "fa-credit-card" },
  { key: "Paypal", value: "fa-paypal" },
  { key: "Bank", value: "fa-university" }
];

export const categoryTypes = [];

export default [
  ...paymentAccountTypes,
  ...creditCardTypes,
  ...assetTypes,
  ...categoryTypes,
  ...debtTypes
];
