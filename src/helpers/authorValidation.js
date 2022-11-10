export const inputValidation = (field, value, errorStateFunction) => {
  if (!value.trim()) {
    errorStateFunction((oldError) => ({
      ...oldError,
      [field]: 'Invalid Input',
    }));
  } else {
    errorStateFunction((oldError) => ({
      ...oldError,
      [field]: '',
    }));
  }
};

export const submitValidation = (state, errorStateFunction) => {
  if (!state.author_name.trim())
    errorStateFunction((oldError) => ({
      ...oldError,
      author_name: 'Invalid Input',
    }));

  if (!state.author_surname.trim())
    errorStateFunction((oldError) => ({
      ...oldError,
      author_surname: 'Invalid Input',
    }));
};
