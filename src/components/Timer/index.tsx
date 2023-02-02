import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { StateI } from "../../store/slices";
import { getRestaurantTime } from "../../store/slices/timer/extraReducers";
import { useDataContext } from "../../context/IncommingOrderContext";

import "./style.css";

//interface for the props of the 'Timer' component
interface Props {
  handleOpen: () => void;
}

/* Component named 'Timer'
It has a 'handleOpen' property which is a callback function
 passed down from its parent component (Welcome). 
 */
export const Timer = ({ handleOpen }: Props) => {
  //hook to retrieve values from the Redux store and dispatch actions.
  const appDispatch = useDispatch<AppDispatch>();

  /*  It also uses a custom hook "useDataContext" 
  to access the data context(restaurant_id). */
  const context = useDataContext();

  /* "useSelector" hook used to retrieve values
   from the Redux store and dispatch actions. */
  const openTime = useSelector((state: StateI) => state.timer.openTime);
  const closeTime = useSelector((state: StateI) => state.timer.closeTime);

  /* state value "currentTimes" which holds the opening and closing times
   of the restaurant retrieved from the Redux store. */
  const [currentTimes, setCurrentTimes] = useState({
    opening_hour: openTime || "",
    closing_hour: closeTime || "",
  });

  /* state values "hours", "minutes", and "seconds" which keep track of 
  the time remaining until the restaurant opens. */
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  /* hook dispatches the getRestaurantTime action 
  to retrieve the opening and closing times  */
  useEffect(() => {
    appDispatch(getRestaurantTime(context.restaurantId));
  }, []);

  /* hook updates the currentTimes state with the latest values of 
  openTime and closeTime whenever either of them changes. */
  useEffect(() => {
    setCurrentTimes({
      opening_hour: openTime,
      closing_hour: closeTime,
    });
  }, [openTime, closeTime]);

  /* This code sets an interval that calls the getTime function every second
  to calculate the remaining time until the restaurant opens. */
  useEffect(() => {
    if (currentTimes.opening_hour && currentTimes.closing_hour) {
      const openHour = Number(currentTimes.opening_hour.split(":")[0]);
      const openMinutes = Number(currentTimes.opening_hour.split(":")[1]);

      const openDate = new Date();

      openDate.setHours(openHour);
      openDate.setMinutes(openMinutes);
      openDate.setSeconds(0);

      const interval = setInterval(() => {
        getTime(openDate);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentTimes]);

   //get time of the day
  const getTime = (openingDate: Date) => {
    const currentDate = new Date();

    const currentTime = currentDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    /* checks if the current time is greater than or equal 
    to the opening hour and less than the closing hour. */
    if (
      currentTime >= currentTimes.opening_hour &&
      currentTime < currentTimes.closing_hour
    ) {
      return handleOpen();
    }

    const time = openingDate.getTime() - Date.now();
    setHours(Math.abs(Math.floor((time / (1000 * 60 * 60)) % 24)));
    setMinutes(Math.abs(Math.floor((time / (1000 * 60)) % 60)));
    setSeconds(Math.abs(Math.floor((time / 1000) % 60)));
  };

  return (
    <div className="timer">
      <div className="box">
        <p>{hours}</p>
        <span className="text">Hours</span>
      </div>
      <div className="box">
        <p>{minutes}</p>
        <span className="text">Minutes</span>
      </div>
      <div className="box">
        <p>{seconds}</p>
        <span className="text">Seconds</span>
      </div>
    </div>
  );
};
