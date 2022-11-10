import { createSlice } from '@reduxjs/toolkit';

const authorsSlice = createSlice({
  name: 'authors',
  initialState: {
    inputData: {
      id: '',
      author_name: '',
      author_surname: '',
    },
    authors: JSON.parse(localStorage.getItem('authors')) || [],
    isEdit: false,
  },

  reducers: {
    setInputData(state, { payload }) {
      state.inputData = {
        ...state.inputData,
        [payload.field]: payload.value,
      };
    },

    resetInputData(state, { payload }) {
      state.inputData = payload;
    },

    setAuthors(state, { payload }) {
      state.authors = payload;
    },

    addAuthor(state, { payload }) {
      state.authors = [...state.authors, payload];
      localStorage.setItem('authors', JSON.stringify(state.authors));
    },

    deleteAuthor(state, { payload }) {
      const authorToDelete = state.authors.findIndex(
        (author) => author.id === payload
      );

      state.authors.splice(authorToDelete, 1);
      localStorage.setItem('authors', JSON.stringify(state.authors));
    },

    setEditData(state, { payload }) {
      const authorToEdit = state.authors.find(
        (author) => author.id === payload
      );

      authorToEdit && (state.inputData = authorToEdit);
      state.isEdit = true;
    },

    editAuthor(state, { payload }) {
      const toEditAuthorIndex = state.authors.findIndex(
        (author) => author.id === payload.id
      );

      state.inputData = {
        id: '',
        author_name: '',
        author_surname: '',
      };

      state.isEdit = false;

      state.authors.splice(toEditAuthorIndex, 1, payload);
      localStorage.setItem('authors', JSON.stringify(state.authors));
    },

    cancelEdit(state, { payload }) {
      state.inputData = {
        id: '',
        author_name: '',
        author_surname: '',
      };

      state.isEdit = false;
    },
  },
});

export const authorsActions = authorsSlice.actions;

export default authorsSlice;
