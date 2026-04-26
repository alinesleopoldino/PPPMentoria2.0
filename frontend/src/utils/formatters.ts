export function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value || 0);
}

export function formatPercent(value: number) {
  return `${Number(value || 0).toFixed(1)}%`;
}

export function parseCurrencyInput(value: string) {
  const normalized = value
    .replace(/[R$\s]/g, '')
    .replace(/\./g, '')
    .replace(',', '.')
    .trim();

  if (!normalized) {
    return 0;
  }

  return Number(normalized) || 0;
}

export function formatCurrencyInput(value: string) {
  return formatCurrency(parseCurrencyInput(value));
}
