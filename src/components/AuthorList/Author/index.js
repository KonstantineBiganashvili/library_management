import React, { useState } from 'react';
import { TableRow, TableCell, Typography } from '@mui/material';
import CellActionButton from '../../common/CellActionButton/index';
import { useNavigate } from 'react-router-dom';
import DeleteAuthor from '../../common/Modals/AuthorModals/DeleteAuthor/index';
import { useDispatch } from 'react-redux';
import { authorsActions } from '../../../store/author-slice';
import { booksActions } from '../../../store/book-slice';

const Author = (props) => {
  const { author } = props;
  const { id, author_name, author_surname } = author;

  const [deleteId, setDeleteId] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleViewDetails = () => {
    navigate(`./${id}`);
  };

  const handleEdit = () => {
    dispatch(authorsActions.setEditData(id));
  };

  const handleDeleteModal = () => {
    setDeleteId(id);
  };

  const handleCancelDelete = () => {
    setDeleteId(null);
  };

  const handleDelete = () => {
    dispatch(authorsActions.deleteAuthor(deleteId));
    dispatch(booksActions.deleteBook({ book_id: deleteId }));
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <Typography>{author_name}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{author_surname}</Typography>
        </TableCell>
        <TableCell className="table__btn-cell">
          <CellActionButton color="primary" onClick={handleViewDetails}>
            Details
          </CellActionButton>
        </TableCell>
        <TableCell className="table__btn-cell">
          <CellActionButton color="warning" onClick={handleEdit}>
            Edit
          </CellActionButton>
        </TableCell>
        <TableCell className="table__btn-cell">
          <CellActionButton color="error" onClick={handleDeleteModal}>
            Delete
          </CellActionButton>
        </TableCell>
      </TableRow>
      <DeleteAuthor
        authorId={deleteId}
        handleCancelDelete={handleCancelDelete}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default Author;
