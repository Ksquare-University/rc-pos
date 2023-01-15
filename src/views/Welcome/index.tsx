import ButtonControl from '../../components/ButtonControl';
import DefaultTemplateMenu from '../../templates/DefaultTemplateMenu';
import './style.css';
import images from '../../assets/gif.gif';
import { Timer } from '../../components/Timer';
import { useNavigate } from 'react-router-dom';
import hamburger from '../../assets/hamburger.png';
import pizza from '../../assets/pizza.png';
import poke from '../../assets/poke.png';
import { useEffect, useRef, useState } from 'react';

const imgs = [hamburger, pizza, poke];

const Welcome = () => {
  const navigate = useNavigate();
  const [currentImg, setCurrentImg] = useState(0);
  const [imgClass, setImgClass] = useState('');

  const handleOpenButton = () => {
    navigate('/orders');
  };

  useEffect(() => {
    setImgClass('active');
    const timer = setTimeout(() => {
      zoomOut();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [currentImg]);

  const zoomOut = () => {
    setImgClass('inactive');
    setTimeout(() => {
      setCurrentImg((prevVal) => {
        const newVal = prevVal >= imgs.length - 1 ? 0 : prevVal + 1;
        return newVal;
      });
    }, 1000);
  };

  return (
    <div className='container'>
      <DefaultTemplateMenu>
        <div className='welcome'>
          <img src={imgs[currentImg]} alt='loading...' className={imgClass} />
          <h1>Welcome, Restaurant name* </h1>
          <ButtonControl
            nameClass='buttonRestaurant'
            label={'Open Restaurant'}
            handleClick={handleOpenButton}
          />
          <h2>The restaurant must open in :</h2>
          <div className='timer'>
            {' '}
            <Timer />
          </div>
        </div>
      </DefaultTemplateMenu>
    </div>
  );
};

export default Welcome;
