export type timerState = number;

export interface ITimer {
  openTime: Date;
  closeTime: Date;
}
const updateTimer = (state: ITimer, action: { payload: ITimer }) => {
  return state = action.payload
}

export default {
  updateTimer,
}