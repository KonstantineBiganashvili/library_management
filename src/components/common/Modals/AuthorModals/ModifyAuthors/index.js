import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Modal, TextField } from '@mui/material';
import { authorsActions } from '../../../../../store/author-slice';
import { v4 as uuidv4 } from 'uuid';
import './ModifyAuthors.scss';
import {
  inputValidation,
  submitValidation,
} from '../../../../../helpers/authorValidation';

const ModifyAuthors = (props) => {
  const { authorModalIsOpen, setAuthorModalIsOpen } = props;

  const { inputData, isEdit } = useSelector((state) => state.authors);
  const dispatch = useDispatch();
  const [error, setError] = useState({
    author_name: '',
    author_surname: '',
  });

  const handleInputChange = (value, field) => {
    dispatch(
      authorsActions.setInputData({
        value,
        field,
      })
    );

    inputValidation(field, value, setError);
  };

  const handleAdd = () => {
    submitValidation(inputData, setError);

    if (inputData.author_name.length && inputData.author_surname.length) {
      const newAuthor = { ...inputData };
      newAuthor.id = uuidv4();

      dispatch(
        authorsActions.resetInputData({
          author_name: '',
          author_surname: '',
        })
      );
      setError({
        author_name: '',
        author_surname: '',
      });
      setAuthorModalIsOpen(false);
      dispatch(authorsActions.addAuthor(newAuthor));
    }
  };

  const handleEdit = () => {
    if (inputData.author_name.length && inputData.author_surname.length)
      dispatch(authorsActions.editAuthor(inputData));
  };

  const handleClose = () => {
    if (isEdit) {
      return dispatch(authorsActions.cancelEdit());
    }

    dispatch(
      authorsActions.resetInputData({
        author_name: '',
        author_surname: '',
      })
    );

    setError({
      author_name: '',
      author_surname: '',
    });

    setAuthorModalIsOpen(false);
  };

  return (
    <Modal open={authorModalIsOpen || isEdit} onClose={handleClose}>
      <Box className="modify-books-modal">
        <TextField
          value={inputData.author_name}
          label="Author Name"
          onChange={({ target }) =>
            handleInputChange(target.value, 'author_name')
          }
          error={Boolean(error.author_name)}
          helperText={error.author_name}
        />
        <TextField
          value={inputData.author_surname}
          label="Author Surname"
          onChange={({ target }) =>
            handleInputChange(target.value, 'author_surname')
          }
          error={Boolean(error.author_surname)}
          helperText={error.author_surname}
        />
        <Box className="modify-books-modal__btn-container">
          <Button variant="contained" color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={isEdit ? handleEdit : handleAdd}>
            {isEdit ? 'Edit' : 'Add'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModifyAuthors;
