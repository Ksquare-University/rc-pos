import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import reducer from './slices';

/* The store is created using the 'configureStore' 
function and the state is managed by the 'reducer' */
const store = configureStore({
  reducer
});

export default store;

//hook is defined to provide the dispatch function from the store
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
