import { useEffect, useState } from "react";
import ButtonControl from "../../components/Button";
import DefaultTemplateMenu from "../../templates/DefaultTemplateMenu";
import "./style.css";
import images from "../../assets/gif.gif";
import {Timer} from "../../components/Timer";
import hamburger from "../../assets/hamburger.png";
import pizza from "../../assets/pizza.png"
import poke from "../../assets/poke.png"

//const images = [hamburger, pizza, poke];

function Welcome() {
/*     const [index,setIndex] = useState(0);

    setInterval(function(){
     
        index === 3 ? setIndex(0) : setIndex(index + 1) ;
    
     }, 5000);
 */
  /* const [isDisabled, setSate] = useState(false);

   const handleChange = () => {
    if ()) {
      setSate(false);
    } else {
      setSate(true);
    }
  }; */

  return (
    <div className="container">
      <DefaultTemplateMenu>
        <div className="welcome">
        <img src={images} alt="loading..." />

          <h1>Welcome, Restaurant name* </h1>
          <ButtonControl
            nameClass="buttonRestaurant"
            label={"Open Restaurant"}
          />
          <h2>The restaurant must open in :</h2>
          <div className="timer">   <Timer/></div>
       
        </div>
      </DefaultTemplateMenu>
    </div>
  );
}

export default Welcome;
