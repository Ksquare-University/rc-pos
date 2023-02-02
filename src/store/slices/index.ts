import timer from './timer';
import { ITimer } from './timer/reducer';

//The StateI interface defines the structure of the state
export interface StateI {
  timer: ITimer,
}

export default {
  timer,
}

/* 
The goal of this code is to centralize the state structure 
for easier state management.
*/
