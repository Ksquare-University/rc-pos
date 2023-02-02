export type timerState = number;

//interface 'ITimer' defines the structure of the timer state
export interface ITimer {
  openTime: String;
  closeTime: String;
  timeExists: Boolean;
}

/* 
-function is a reducer function that updates the timer state
-function returns a new state object that is the result of merging
 the current state with the updated properties from the payload.
  */
const updateTimer = (state: ITimer, action: { payload: ITimer }) => {
  return { ...state, ...action.payload }
}

export default {
  updateTimer,
}
