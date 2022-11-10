import React, { useEffect, useState } from 'react';
import { TableCell, TableRow, Typography } from '@mui/material';
import ImageIcon from '@mui/icons-material/ImageOutlined';
import CellActionButton from '../../common/CellActionButton';
import DeleteBook from '../../common/Modals/BookModals/DeleteBook';
import './Book.scss';
import { useDispatch, useSelector } from 'react-redux';
import { booksActions } from '../../../store/book-slice';
import { useNavigate } from 'react-router-dom';
import { sanitize } from 'dompurify';

const Book = (props) => {
  const { book } = props;

  const { id, img, title, author_id, publication } = book;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(null);
  const [author, setAuthor] = useState({});
  const { authors } = useSelector((state) => state.authors);

  const handleDeleteModal = () => {
    setDeleteId(id);
  };

  const handleEdit = () => {
    dispatch(booksActions.setEditData(id)) &&
      dispatch(booksActions.setIsEdit(true));
  };

  const handleViewDetails = () => {
    navigate(`./${id}`);
  };

  useEffect(() => {
    setAuthor(authors.find((author) => author.id === author_id));
  }, [author.id, author_id, authors]);

  return (
    <>
      <TableRow>
        <TableCell>
          {img.length ? (
            <img src={img} alt={title} className="table__img-main" />
          ) : (
            <ImageIcon className="table__img-placeholder" />
          )}
        </TableCell>
        <TableCell>
          <Typography
            dangerouslySetInnerHTML={{
              __html: sanitize(title),
            }}
          ></Typography>
        </TableCell>
        <TableCell>
          <Typography
            dangerouslySetInnerHTML={{
              __html: sanitize(author.author_name),
            }}
          ></Typography>
        </TableCell>
        <TableCell>
          <Typography
            dangerouslySetInnerHTML={{
              __html: sanitize(author.author_surname),
            }}
          ></Typography>
        </TableCell>
        <TableCell>
          <Typography>{publication}</Typography>
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
      <DeleteBook deleteId={deleteId} setDeleteId={setDeleteId} />
    </>
  );
};

export default Book;
