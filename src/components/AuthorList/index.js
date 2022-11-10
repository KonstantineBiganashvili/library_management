import React from 'react';
import Author from './Author';
import { useSelector } from 'react-redux';
import AuthorDetails from '../AuthorDetails/index';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import './AuthorList.scss';

const AuthorList = () => {
  const { authors } = useSelector((state) => state.authors);

  return (
    <>
      <TableContainer className="author-list-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Author Name</TableCell>
              <TableCell>Author Surname</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {authors.map((author, index) => {
              return <Author key={author.id} index={index} author={author} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <AuthorDetails />
    </>
  );
};

export default AuthorList;
