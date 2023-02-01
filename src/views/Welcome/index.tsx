import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonControl from "../../components/ButtonControl";
import DefaultTemplateMenu from "../../templates/DefaultTemplateMenu";
import hamburger from "../../assets/hamburger.png";
import pizza from "../../assets/pizza.png";
import poke from "../../assets/poke.png";
import "./style.css";
import React from "react";
import { Timer } from "../../components/Timer";
import { useDataContext } from "../../context/IncommingOrderContext";

const imgs = [hamburger, pizza, poke];

const Welcome = () => {
  const context = useDataContext();

  const navigate = useNavigate();

  const [currentImg, setCurrentImg] = useState(0);
  const [imgClass, setImgClass] = useState("");

  const [buttonActive, setButtonActive] = useState<string>("");

  const [restaurantName, setRestaurantName] = React.useState<any>("");

  const handleOpenButton = () => {
    if (buttonActive !== "active") return;
    navigate("/orders");
  };

  useEffect(() => {
    const loadRestaurants = async () => {
      const data = await fetch(
        `http://localhost:3010/restaurant/${context.restaurantId}`
      );
      const restaurantData = await data.json();
      setRestaurantName(restaurantData);
    };
    loadRestaurants();
  }, [setRestaurantName]);

  useEffect(() => {
    setImgClass("active");
    const timer = setTimeout(() => {
      zoomOut();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [currentImg]);

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
            {buttonActive === 'active' && <div style={{ paddingBottom: 150 }} />}
          </div>
        </DefaultTemplateMenu>
      </div>
    </div>
  );
};

export default Welcome;
