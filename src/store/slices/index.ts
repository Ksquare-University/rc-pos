import timer from './timer';
import { ITimer } from './timer/reducer';

export interface StateI {
  timer: ITimer,
}

export default {
    timer,
}

