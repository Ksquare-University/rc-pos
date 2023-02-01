import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDataContext } from '../../context/IncommingOrderContext';
import { AppDispatch, useAppDispatch } from '../../store';
import { StateI } from '../../store/slices';
import { getRestaurantTime } from '../../store/slices/timer/extraReducers';

import './style.css';

interface Props {
  handleOpen: () => void;
}

export const Timer = ({ handleOpen }: Props) => {
  const appDispatch = useDispatch<AppDispatch>();

  const context = useDataContext();

  const openTime = useSelector((state: StateI) => state.timer.openTime);
  const closeTime = useSelector((state: StateI) => state.timer.closeTime);

  const [currentTimes, setCurrentTimes] = useState({
    opening_hour: openTime || '',
    closing_hour: closeTime || '',
  });

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    appDispatch(getRestaurantTime(context.restaurantId));
  }, []);

  useEffect(() => {
    setCurrentTimes({
      opening_hour: openTime,
      closing_hour: closeTime,
    });
  }, [openTime, closeTime]);

  useEffect(() => {
    if (currentTimes.opening_hour && currentTimes.closing_hour) {
      const openHour = Number(currentTimes.opening_hour.split(':')[0]);
      const openMinutes = Number(currentTimes.opening_hour.split(':')[1]);

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

  const getTime = (openingDate: Date) => {
    const currentDate = new Date();

    const currentTime = currentDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

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
    <div className='timer'>
      <div className='box'>
        <p>{hours}</p>
        <span className='text'>Hours</span>
      </div>
      <div className='box'>
        <p>{minutes}</p>
        <span className='text'>Minutes</span>
      </div>
      <div className='box'>
        <p>{seconds}</p>
        <span className='text'>Seconds</span>
      </div>
    </div>
  );
};

