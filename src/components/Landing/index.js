import React from 'react';
import { Box, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './Landing.scss';

const Landing = () => {
  const navigate = useNavigate();

  const handleBooksNavigation = (e) => {
    e.preventDefault();

    navigate('/books');
  };

  const hanldeAuthorsNavigation = (e) => {
    e.preventDefault();

    navigate('/authors');
  };

  return (
    <Box className="landing">
      <Button className="landing__btn-navigation" variant="contained">
        <Link onClick={handleBooksNavigation}>Books List</Link>
      </Button>
      <Button className="landing__btn-navigation" variant="contained">
        <Link onClick={hanldeAuthorsNavigation}>Authors List</Link>{' '}
      </Button>
    </Box>
  );
};

export default Landing;
