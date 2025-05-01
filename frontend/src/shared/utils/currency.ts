export function formatCurrency(value: number): string {
  if (typeof value !== 'number') return '';

  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function parseCurrencyInput(value: string) {
  const numericValue = parseFloat(
    value.replace(/[^0-9,]/g, '').replace(',', '.'),
  );
  return isNaN(numericValue) ? 0 : numericValue;
}
