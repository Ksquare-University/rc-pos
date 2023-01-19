import { createSlice } from '@reduxjs/toolkit';
import reducers, { ITimer } from './reducer';

export const timerSlice = createSlice({
  name: 'timer',
  initialState: <ITimer> {openTime: new Date , closeTime:  new Date},
  reducers,
});

export const { updateTimer } = timerSlice.actions;

export default timerSlice.reducer;