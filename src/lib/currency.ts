export interface Currency {
  code: string;
  symbol: string;
  rate: number; // relative to USD (1.0)
}

export const SUPPORTED_CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$', rate: 1.0 },
  { code: 'EUR', symbol: '€', rate: 0.92 },
  { code: 'GBP', symbol: '£', rate: 0.78 },
  { code: 'CAD', symbol: 'C$', rate: 1.36 },
  { code: 'AUD', symbol: 'A$', rate: 1.50 },
  { code: 'JPY', symbol: '¥', rate: 155.0 },
  { code: 'KRW', symbol: '₩', rate: 1370.0 },
  { code: 'INR', symbol: '₹', rate: 83.5 },
  { code: 'CNY', symbol: '¥', rate: 7.25 },
  { code: 'AED', symbol: 'AED ', rate: 3.67 }
];

/**
 * Converts a USD price string (e.g., "$128.00" or "$150") to the target currency
 * and formats it with its symbol and proper decimals/locale grouping.
 */
export function convertAndFormatPrice(
  usdPriceStr: string | undefined, 
  targetCurrency: Currency
): string {
  if (!usdPriceStr) return '';
  
  // Remove currency symbol and parse float
  const numericUsd = parseFloat(usdPriceStr.replace(/[^0-9.-]/g, ''));
  if (isNaN(numericUsd)) return usdPriceStr;
  
  const converted = numericUsd * targetCurrency.rate;
  
  if (targetCurrency.code === 'JPY' || targetCurrency.code === 'KRW') {
    // Zero decimal places for Yen and Won
    return `${targetCurrency.symbol}${Math.round(converted).toLocaleString()}`;
  }
  
  // Two decimal places for others
  return `${targetCurrency.symbol}${converted.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

/**
 * Parses a USD price string to a raw float.
 */
export function parseUsdPrice(usdPriceStr: string | undefined): number {
  if (!usdPriceStr) return 0;
  const num = parseFloat(usdPriceStr.replace(/[^0-9.-]/g, ''));
  return isNaN(num) ? 0 : num;
}
