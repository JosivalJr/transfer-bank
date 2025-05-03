import { isRepeatedArray } from './array';
import { removeNonNumericCharacters } from './string';

type CheckSums = [number, number];

const CPF_VALIDATORS = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];

function getRemainder(value: number): number {
  return value % 11 < 2 ? 0 : 11 - (value % 11);
}

function getCheckDocumentSums(
  numbers: Array<number>,
  validators: Array<number>,
) {
  const initialCheckSums: CheckSums = [0, 0];

  return validators.reduce(
    ([checkerA, checkerB], validator, index) =>
      [
        index === 0 ? 0 : checkerA + numbers[index - 1] * validator,
        checkerB + numbers[index] * validator,
      ] as CheckSums,
    initialCheckSums,
  );
}

export function formatCPF(document: string): string {
  const regex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
  return document.replace(regex, '$1.$2.$3-$4');
}

export function validateCPF(document: string): boolean {
  const cleanedDocument = removeNonNumericCharacters(document);
  const splittedDocument = cleanedDocument.split('').map(Number);

  if (isRepeatedArray(splittedDocument)) return false;

  const checkers = getCheckDocumentSums(splittedDocument, CPF_VALIDATORS);

  const isValid =
    splittedDocument[9] === getRemainder(checkers[0]) &&
    splittedDocument[10] === getRemainder(checkers[1]);

  return isValid;
}
