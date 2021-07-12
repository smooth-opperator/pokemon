export const calculateOffset = (page: string) => (parseInt(page, 10) - 1) * 50;

// there is an error happening with jest-fetch-mock that is unresolved. This is workaround for now to let tests pass.
export const handleError = (error: any, message?: string) =>
  new Error(`${error} ${message}`);
