import { Button, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useDispatch } from 'react-redux';
import { booksActions } from '../../../../../store/book-slice';
import './DeleteBook.scss';

const DeleteBook = (props) => {
  const { deleteId, setDeleteId } = props;

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(booksActions.deleteBook(deleteId));
  };

  const handleCancelDelete = () => {
    setDeleteId(null);
  };

  return (
    <Modal open={deleteId !== null} onClose={handleCancelDelete}>
      <Box className="delete-book-modal">
        <Typography>Delete This Book?</Typography>
        <Box className="delete-book-modal__btn-container">
          <Button onClick={handleCancelDelete} variant="contained">
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteBook;
