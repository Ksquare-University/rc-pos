import { createSlice } from '@reduxjs/toolkit';
import reducers, { ITimer } from './reducer';

export const timerSlice = createSlice({
  name: 'timer',
  initialState: <ITimer>{
    openTime: 9,
    closeTime: 10,
    timeExists: false
  },
  reducers,
});

export const { updateTimer } = timerSlice.actions;

export default timerSlice.reducer;