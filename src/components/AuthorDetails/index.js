import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography } from '@mui/material';
import './AuthorDetails.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthorDetails = () => {
  const [author, setAuthor] = useState(null);
  const navigate = useNavigate();

  const { authors } = useSelector((state) => state.authors);

  const [location, setLocation] = useState('');

  const currentLocation = useParams();

  useEffect(() => {
    setLocation(currentLocation['*']);
  }, [currentLocation]);

  useEffect(() => {
    const selectedAuthor = authors.find((element) => {
      return element.id === location;
    });

    setAuthor(selectedAuthor);
  }, [authors, location, navigate]);

  const handleClose = () => {
    setAuthor(null);
    navigate('/authors');
  };

  return (
    author && (
      <Modal open onClose={handleClose}>
        <Box className="author-details-container">
          <Typography>
            <strong>First Name: </strong>
            {author.author_name}
          </Typography>
          <Typography>
            <strong>Last Name: </strong>
            {author.author_surname}
          </Typography>
        </Box>
      </Modal>
    )
  );
};

export default AuthorDetails;
