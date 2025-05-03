import axios from 'axios';

export function formatErrorForNotification(unhandledError: any): string {
  let returnMessage = '';

  const errorMessageOrName = unhandledError.message
    ? unhandledError.message
    : unhandledError.name;

  if (axios.isAxiosError(unhandledError)) {
    const { message, errors } = unhandledError.response?.data || {
      message: errorMessageOrName,
    };

    let errorsStringify = '';

    if (Array.isArray(errors)) {
      errorsStringify = errors.reduce((prev, error) => {
        if (typeof error === 'object' && error.constraints) {
          return (
            prev + Object.values(error.constraints ?? {}).join('\n') + '\n'
          );
        }
        return prev + `${error} \n`;
      }, '');
    }

    if (typeof message === 'object' && message !== null) {
      if (Array.isArray(message)) {
        errorsStringify += message.reduce((prev, error) => {
          return prev + `${error} \n`;
        }, '');
      } else {
        errorsStringify += Object.entries(message)
          .map(([_key, value]) => {
            if (
              typeof value === 'object' &&
              value !== null &&
              'constraints' in value
            ) {
              return Object.values(
                (value as { constraints: Record<string, string> })
                  .constraints ?? {},
              ).join('\n');
            }
            return value === message ? '' : String(value ?? '');
          })
          .filter(Boolean)
          .join('\n');
      }
    } else {
      errorsStringify += String(message ?? '');
    }

    returnMessage = errorsStringify.trim();
  }

  return returnMessage.length ? returnMessage : errorMessageOrName;
}

export function callbackOnInvalidZod(error: unknown) {
  console.warn('ZOD Error: ', error);
}
