import { configureStore } from '@reduxjs/toolkit';
import authorsSlice from './author-slice';
import booksSlice from './book-slice';

const store = configureStore({
  reducer: {
    books: booksSlice.reducer,
    authors: authorsSlice.reducer,
  },
});

export default store;
