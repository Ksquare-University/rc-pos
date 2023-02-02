//...react, hooks
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//images from the assets folder
import hamburger from "../../assets/hamburger.png";
import pizza from "../../assets/pizza.png";
import poke from "../../assets/poke.png";

//style sheet
import "./style.css";

//components 
import { Timer } from "../../components/Timer";
import { useDataContext } from "../../context/IncommingOrderContext";
import ButtonControl from "../../components/ButtonControl";
import DefaultTemplateMenu from "../../templates/DefaultTemplateMenu";

//array of images
const imgs = [hamburger, pizza, poke];

const Welcome = () => {
  const context = useDataContext();

  /* useNavigate hook from the react-router-dom library,
   which provides the navigate function  */
  const navigate = useNavigate();

  /* The component uses two useState hooks to manage the state of the current 
  image and its class. */
  const [currentImg, setCurrentImg] = useState(0);
  const [imgClass, setImgClass] = useState("");

  /* The component also uses two useState
   hooks to manage the state of the button. */
  const [buttonActive, setButtonActive] = useState<string>("");
  const [restaurantName, setRestaurantName] = React.useState<any>("");

  /*  The handleOpenButton function is called when
  the button 'buttonRestaurant' is clicked. */
  const handleOpenButton = () => {
    if (buttonActive !== "active") return;
    navigate("/orders");
  };

  /*   
  -The useEffect hook runs the loadRestaurants function,
   which fetches restaurant data from an API.
  -The setRestaurantName state is updated with the restaurantData variable.
  -The useEffect hook depends on the setRestaurantName state, so it will only 
  run when setRestaurantName is updated. 
  */
  useEffect(() => {
    const loadRestaurants = async () => {
      const data = await fetch(
        `http://localhost:5000/restaurant/${context.restaurantId}`
      );
      const restaurantData = await data.json();
      setRestaurantName(restaurantData);
    };
    loadRestaurants();
  }, [setRestaurantName]);

  /* The useEffect hook sets the imgClass state to "active" 
  and starts a timer that calls the zoomOut */
  useEffect(() => {
    setImgClass("active");
    const timer = setTimeout(() => {
      zoomOut();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [currentImg]);

  /* zoomOut function
  -First, it sets the imgClass state to "inactive" 
  -Then, it sets a timer to run after 1 second,
   which updates the currentImg state to the next image
   */
  const zoomOut = () => {
    setImgClass("inactive");
    setTimeout(() => {
      setCurrentImg((prevVal) => {
        const newVal = prevVal >= imgs.length - 1 ? 0 : prevVal + 1;
        return newVal;
      });
    }, 1000);
  };

  return (
    <div className="container">
      <div style={{ width: "86vw", marginBottom: "3vh", marginTop: "1vh" }}>
        <DefaultTemplateMenu isOpen={buttonActive === "active"}>
          <div className="welcome">
            <img src={imgs[currentImg]} alt="loading..." className={imgClass} />
            <h1>Welcome, {restaurantName.name} </h1>
            <ButtonControl
              nameClass={"buttonRestaurant " + buttonActive}
              label={"Open Restaurant"}
              disabled={buttonActive !== "active"}
              handleClick={handleOpenButton}
            />
            {buttonActive !== "active" && (
              <>
                <h2>The restaurant must open in :</h2>
                <Timer
                  handleOpen={() => {
                    setButtonActive("active");
                  }}
                />
              </>
            )}
            {buttonActive === "active" && (
              <div style={{ paddingBottom: 150 }} />
            )}
          </div>
        </DefaultTemplateMenu>
      </div>
    </div>
  );
};

export default Welcome;
