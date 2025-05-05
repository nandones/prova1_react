import { configureStore } from '@reduxjs/toolkit';
import bookreducer from './BookSlice';

export const store = configureStore({
  reducer: {
    livros: bookReducer,
  },
});
