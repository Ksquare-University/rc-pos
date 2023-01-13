import ButtonControl from '../../components/Button';
import DefaultTemplateMenu from '../../templates/DefaultTemplateMenu';
import './style.css';
import images from '../../assets/gif.gif';
import { Timer } from '../../components/Timer';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = '#fe4730';
    document.body.style.color = 'black';
  }, []);

  const handleOpenButton = () => {
    navigate('/orders');
  };

  return (
    <div className='container'>
      <DefaultTemplateMenu>
        <div className='welcome'>
          <img src={images} alt='loading...' style={{ height: '40vh' }} />

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
