export const clearErrors = (fields, errorsStateFunc) => {
  fields.forEach((field) => {
    errorsStateFunc((oldErrors) => ({
      ...oldErrors,
      [field]: '',
    }));
  });
};
