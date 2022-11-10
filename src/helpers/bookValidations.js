export const inputValidation = (field, value, errorStateFunction) => {
  if (!value.trim()) {
    errorStateFunction((oldError) => ({
      ...oldError,
      [field]: 'Invalid Input',
    }));
  } else {
    errorStateFunction((oldError) => {
      delete oldError[field];
      return oldError;
    });
  }
};

export const submitValidation = (state, errorStateFunction) => {
  if (!state.title.trim())
    errorStateFunction((oldError) => ({
      ...oldError,
      title: 'Invalid Input',
    }));

  if (!state.author_id.trim())
    errorStateFunction((oldError) => ({
      ...oldError,
      author_id: 'Invalid Input',
    }));

  if (!state.publication.trim())
    errorStateFunction((oldError) => ({
      ...oldError,
      publication: 'Invalid Input',
    }));
};
