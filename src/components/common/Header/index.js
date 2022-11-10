import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import ModifyBooks from '../Modals/BookModals/ModifyBooks/';
import './Header.scss';
import ModifyAuthors from '../Modals/AuthorModals/ModifyAuthors';

const Header = () => {
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const [bookModalIsOpen, setBookModalIsOpen] = useState(false);
  const [authorModalIsOpen, setAuthorModalIsOpen] = useState(false);

  const handleNavigation = (e) => {
    e.preventDefault();

    navigate(path.split('/').includes('books') ? 'authors' : 'books');
  };

  const handleAdd = () => {
    path.includes('books')
      ? setBookModalIsOpen(true)
      : setAuthorModalIsOpen(true);
  };

  return (
    path !== '/' && (
      <Box className="header__btn-container">
        <Button variant="contained" onClick={handleAdd}>
          {path.split('/').includes('books') ? 'Add A Book' : 'Add An Author'}
        </Button>
        <Button onClick={handleNavigation} variant={'outlined'}>
          {path.split('/').includes('books') ? 'All Authors' : 'All Books'}
        </Button>
        <ModifyBooks
          bookModalIsOpen={bookModalIsOpen}
          setBookModalIsOpen={setBookModalIsOpen}
        />
        <ModifyAuthors
          authorModalIsOpen={authorModalIsOpen}
          setAuthorModalIsOpen={setAuthorModalIsOpen}
        />
      </Box>
    )
  );
};

export default Header;
