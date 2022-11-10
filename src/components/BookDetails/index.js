import React, { useEffect, useState } from 'react';
import { Box, Modal, Typography } from '@mui/material';
import ImageIcon from '@mui/icons-material/ImageOutlined';
import './BookDetails.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './BookDetails.scss';

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  const { books } = useSelector((state) => state.books);

  const [location, setLocation] = useState('');

  const currentLocation = useParams();

  useEffect(() => {
    setLocation(currentLocation['*']);
  }, [currentLocation]);

  useEffect(() => {
    const selectedBook = books.find((element) => {
      return element.id === location;
    });

    setBook(selectedBook);
  }, [books, location, navigate]);

  const handleClose = () => {
    setBook(null);
    navigate('/books');
  };

  return (
    book && (
      <Modal open onClose={handleClose}>
        <Box className="book-details">
          {book.img ? (
            <img
              src={book.img}
              alt={book.title}
              className="book-details__img-main"
            />
          ) : (
            <ImageIcon className="book-details__img-placeholder" />
          )}
          <Box className="book-details__info">
            <Typography>
              <strong>Title:</strong> {book.title}
            </Typography>
            <Typography>
              <strong>Author:</strong> {book.author_name} {book.author_surname}
            </Typography>
            <Typography>
              <strong>Publication Date:</strong> {book.publication}
            </Typography>
          </Box>
        </Box>
      </Modal>
    )
  );
};

export default BookDetails;
