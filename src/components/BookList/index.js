import React from 'react';
import { useSelector } from 'react-redux';

import Book from './Book';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import './BookList.scss';
import BookDetails from '../BookDetails/index';

const BookList = () => {
  const { books } = useSelector((state) => state.books);

  return (
    <>
      <TableContainer className="book-list-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Author Name</TableCell>
              <TableCell>Author Surname</TableCell>
              <TableCell>First Publication</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => {
              return <Book key={book.id} book={book} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <BookDetails />
    </>
  );
};

export default BookList;
