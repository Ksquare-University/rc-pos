export type timerState = number;

export interface ITimer {
  openTime: Number;
  closeTime: Number;
  timeExists: Boolean;

}
const updateTimer = (state: ITimer, action: { payload: ITimer }) => {
  return state = action.payload
}

export default {
  updateTimer,
}