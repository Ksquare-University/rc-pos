import ButtonControl from "../../components/ButtonControl";
import DefaultTemplateMenu from "../../templates/DefaultTemplateMenu";
import "./style.css";
import images from "../../assets/gif.gif";
import {Timer} from "../../components/Timer";
import { useNavigate } from "react-router-dom";


const Welcome = () => {
  const navigate = useNavigate();

  const handleOpenButton = () => {
    navigate('/orders');
  };

  return (
    <div className="container">
      <DefaultTemplateMenu>
        <div className="welcome">
        <img src={images} alt="loading..." />

          <h1>Welcome, Restaurant name* </h1>
          <ButtonControl
            nameClass='buttonRestaurant'
            label={'Open Restaurant'}
            handleClick={handleOpenButton}
          />
          <h2>The restaurant must open in :</h2>
          <div className="timer">   <Timer/></div>
       
        </div>
      </DefaultTemplateMenu>
    </div>
  );
}

export default Welcome;
