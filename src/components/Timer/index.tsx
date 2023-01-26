import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StateI } from '../../store/slices';
import './style.css';

interface Props {
  handleOpen: () => void;
}

export const Timer = ({ handleOpen }: Props) => {

 // const dispatch = useDispatch<AppDispatch>();

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const currentTimes = {
    opening_hour: '12:35',
    closing_hour: '20:00',
  };

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
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / (1000 * 60)) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
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
  }, []);

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
