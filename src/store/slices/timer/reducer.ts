export type timerState = number;

export interface ITimer {
  openTime: String;
  closeTime: String;
  timeExists: Boolean;
}
const updateTimer = (state: ITimer, action: { payload: ITimer }) => {
  return {state, action}
}
export default {
  updateTimer,
}
