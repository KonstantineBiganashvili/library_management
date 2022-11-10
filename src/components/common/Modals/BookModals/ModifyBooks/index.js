import React, { useState } from 'react';
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  MenuItem,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import {
  inputValidation,
  submitValidation,
} from '../../../../../helpers/bookValidations';
import { useDispatch, useSelector } from 'react-redux';
import { booksActions } from '../../../../../store/book-slice';
import { imageToBase64 } from '../../../../../helpers/imageToBase64';
import { clearErrors } from '../../../../../helpers/clearErrors';
import './ModifyBooks.scss';

const ModifyBooks = (props) => {
  const { bookModalIsOpen, setBookModalIsOpen } = props;
  const [error, setError] = useState({
    title: '',
    author_id: '',
    publication: '',
  });

  const { inputData, isEdit } = useSelector((state) => state.books);
  const { authors } = useSelector((state) => state.authors);

  const dispatch = useDispatch();

  const changeBookData = async (target, field) => {
    if (field !== 'img') {
      inputValidation(field, target.value, setError);
      return dispatch(
        booksActions.setInputData({ field, value: target.value })
      );
    }

    const base64 = await imageToBase64(target.files[0]);
    dispatch(booksActions.setInputData({ field, value: base64 }));
  };

  const handleAdd = () => {
    submitValidation(inputData, setError);

    if (!Object.keys(error).length) {
      const newBook = { ...inputData };
      newBook.id = uuidv4();

      dispatch(booksActions.addBook(newBook));

      setBookModalIsOpen(false);

      clearErrors(['title', 'author_id', 'publication'], setError);
    }
  };

  const handleEdit = () => {
    submitValidation(inputData, setError);

    !(
      error?.title?.length ||
      error?.author_id?.length ||
      error?.publication?.length
    ) &&
      dispatch(booksActions.editBookData(inputData)) &&
      dispatch(booksActions.setIsEdit(false)) &&
      dispatch(
        booksActions.setInputData({
          id: '',
          img: '',
          title: '',
          author_id: '',
          publication: '',
          created_at: '',
        })
      );

    clearErrors(['title', 'author_id', 'publication'], setError);
  };

  const handleCancel = () => {
    clearErrors(['title', 'author_id', 'publication'], setError);
    setBookModalIsOpen(false);

    dispatch(
      booksActions.cancelAdd({
        id: '',
        img: '',
        title: '',
        author_id: '',
        publication: '',
        created_at: '',
      })
    );

    isEdit &&
      dispatch(
        booksActions.cancelEdit({
          id: '',
          img: '',
          title: '',
          author_id: '',
          publication: '',
          created_at: '',
        })
      ) &&
      dispatch(booksActions.setIsEdit(false));
  };

  return (
    <Modal open={bookModalIsOpen || isEdit} onClose={handleCancel}>
      <Box className="add-book-modal">
        <Typography className="add-book-modal__title">
          {isEdit ? 'Edit A Book' : 'Add A Book'}
        </Typography>

        {inputData.img && (
          <img
            src={inputData.img}
            alt={inputData.title}
            className="add-book-modal__img"
          />
        )}

        <Button variant="contained" component="label" color={'primary'}>
          <input
            type="file"
            accept="image/*"
            onChange={({ target }) => changeBookData(target, 'img')}
            hidden
          />
          Upload Photo
        </Button>

        <TextField
          error={Boolean(error.title)}
          value={inputData.title}
          helperText={error?.title}
          label="Title"
          onChange={({ target }) => changeBookData(target, 'title')}
        />
        <Box className="add-book-modal_author-select">
          <TextField
            select
            error={Boolean(error.author_id)}
            label="Select Author"
            helperText={error?.author_id}
            value={inputData.author_id}
            onChange={({ target }) => changeBookData(target, 'author_id')}
            disabled={!authors.length}
          >
            {authors.map((author) => (
              <MenuItem key={author.id} value={author.id}>
                {author.author_name} {author.author_surname}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <TextField
          error={Boolean(error.publication)}
          value={inputData.publication}
          helperText={error?.publication}
          label="Publication Date"
          InputLabelProps={{ shrink: true }}
          type="date"
          onChange={({ target }) => changeBookData(target, 'publication')}
        />
        <Box className="add-book-modal__btn-container">
          <Button variant="contained" color="error" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={isEdit ? handleEdit : handleAdd}
          >
            {isEdit ? 'Edit' : 'Add'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModifyBooks;
