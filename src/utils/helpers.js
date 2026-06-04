export const calculatePrice = (basePrice, customizations) => {
  let price = basePrice;
  const { servings, dietPreference, proteinLevel } = customizations;

  if (servings === '2 Persons') price = basePrice * 1.5;
  else if (servings === '3 Persons') price = basePrice * 2;

  if (dietPreference === 'Non-Vegetarian') price += 20;
  if (proteinLevel === 'High Protein') price += 20;

  return Math.round(price);
};

export const getCustomizationSummary = (customizations) => {
  const { spiceLevel, servings, dietPreference } = customizations;
  return `${spiceLevel} Spice | ${servings} | ${dietPreference}`;
};

export const formatPrice = (amount) => `₹${amount}`;

export const generateSessionCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};
