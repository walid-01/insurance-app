// Function to format currency
export function formatCurrency(amount) {
  // Formatting according to Algerian currency format
  return amount.toLocaleString("fr-FR") + ",00" + " DA";
}
