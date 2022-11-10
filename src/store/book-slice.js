import { createSlice } from '@reduxjs/toolkit';

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    inputData: {
      id: '',
      img: '',
      title: '',
      author_id: '',
      publication: '',
      created_at: '',
    },
    books: JSON.parse(localStorage.getItem('books')) || [],
    isEdit: false,
  },

  reducers: {
    setInputData(state, { payload }) {
      state.inputData = {
        ...state.inputData,
        [payload.field]: payload.value,
      };
    },

    setIsEdit(state, { payload }) {
      state.isEdit = payload;
    },

    setEditData(state, { payload }) {
      const bookToEdit = state.books.find((book) => book.id === payload);
      state.inputData = bookToEdit;
    },

    setEditDataInput(state, { payload }) {
      state.inputData = {
        ...state.inputData,
        [payload.field]: payload.value,
      };
    },

    cancelEdit(state, { payload }) {
      state.inputData = payload;
    },

    editBookData(state, { payload }) {
      const bookIndex = state.books.findIndex((book) => book.id === payload.id);

      bookIndex >= 0 &&
        state.books.splice(bookIndex, 1, payload) &&
        localStorage.setItem('books', JSON.stringify(state.books));
    },

    setBooks(state, { payload }) {
      state.books = payload;
    },

    addBook(state, { payload }) {
      const newBook = { ...payload };
      newBook.created_at = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
      state.books = [...state.books, newBook];
      state.inputData = {
        id: '',
        img: '',
        title: '',
        author_id: '',
        publication: '',
        created_at: '',
      };
      localStorage.setItem('books', JSON.stringify(state.books));
    },

    cancelAdd(state, { payload }) {
      state.inputData = payload;
    },

    deleteBook(state, { payload }) {
      if (payload.book_id) {
        state.books = state.books.filter(
          (book) => book.author_id !== payload.book_id
        );
        return localStorage.setItem('books', JSON.stringify(state.books));
      }

      state.books.splice(payload, 1) &&
        localStorage.setItem('books', JSON.stringify(state.books));
    },
  },
});

export const booksActions = booksSlice.actions;

export default booksSlice;
