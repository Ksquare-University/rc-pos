import { createSlice } from '@reduxjs/toolkit';
import reducers, { ITimer } from './reducer';
import { extraReducersRestaurant } from './extraReducers'

export const timerSlice = createSlice({
  name: 'timer',
  initialState: <ITimer>{
    openTime: '',
    closeTime: '',
    timeExists: false
  },
  reducers,
  extraReducers: extraReducersRestaurant,
});

export const { updateTimer } = timerSlice.actions;

export default timerSlice.reducer;