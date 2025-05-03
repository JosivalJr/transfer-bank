export function normalize(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function removeNonNumericCharacters(value: string): string {
  return value.replace(/\D/g, '');
}

export function removeSpecialCharacters(value: string): string {
  return value.replace(/[^a-zA-Z0-9 ]/g, '');
}

export function abbreviate(value: string, limit: number): string {
  return value.length <= limit ? value : value.slice(0, limit) + '...';
}
