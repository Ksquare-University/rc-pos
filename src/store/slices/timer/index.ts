import { createSlice } from '@reduxjs/toolkit';
import reducers, { ITimer } from './reducer';
import { extraReducersRestaurant } from './extraReducers'

// slice of state called "timer" in the Redux store, to manage the timer data. 
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

/* The "timerSlice" object exposes the action creator "updateTimer" 
for updating the "timer" state in the store. */
export const { updateTimer } = timerSlice.actions;

export default timerSlice.reducer;