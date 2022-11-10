import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import './DeleteAuthor.scss';

const DeleteAuthor = (props) => {
  const { authorId, handleDelete, handleCancelDelete } = props;

  return (
    <Modal open={authorId !== null} onClose={handleCancelDelete}>
      <Box className="delete-author-modal">
        <Typography>Delete This Author?</Typography>
        <Box className="delete-author-modal__btn-container">
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

export default DeleteAuthor;
