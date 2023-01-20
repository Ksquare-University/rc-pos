import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StateI } from "../../store/slices";
import { useDispatch, useSelector } from "react-redux";
import { updateTimer } from "../../store/slices/timer";
import ButtonControl from "../../components/ButtonControl";
import DefaultTemplateMenu from "../../templates/DefaultTemplateMenu";
import hamburger from "../../assets/hamburger.png";
import pizza from "../../assets/pizza.png";
import poke from "../../assets/poke.png";
import "./style.css";

const imgs = [hamburger, pizza, poke];

const Welcome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentImg, setCurrentImg] = useState(0);
  const [imgClass, setImgClass] = useState("");

  const [restaurants, setRestaurants] = useState<any>(null);
  const [restaurantsB, setRestaurantsB] = useState<any>(0);

  const [buttonActive, setButtonActive] = useState<string>("");

  const timer1 = useSelector<StateI>((state) => state.timer.openTime) as Date;
  const timer2 = useSelector<StateI>((state) => state.timer.closeTime) as Date;

  let OpenTimerTime = Number.parseInt(timer1.toLocaleTimeString("en-US"));
  let CloseTimerTime = Number.parseInt(timer2.toLocaleTimeString("en-US"));

  let currentHour = Number.parseInt(new Date().toLocaleTimeString("en-US"));

  let openingHour = timer1.getHours() * 60 + timer1.getMinutes();
  let closingHour = timer2.getHours() * 60 + timer2.getMinutes();

  let distance = openingHour - currentHour;

  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  useEffect(() => {
    const interval = setInterval(() => {
      if (1 < 10 && 1 < 10) {
        setButtonActive("active");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOpenButton = () => {
    if (buttonActive !== "active") return;
    navigate("/orders");
  };

  useEffect(() => {
    loadRestaurants();
  }, [restaurantsB]);

  const loadRestaurants = async () => {
    const response = await fetch("https://gist.githubusercontent.com/IvannaNouel-Ksquare/41a13a3d7302c629b773cba43a473f35/raw/22f2e2762d80f0917b452305812e7c70a5300da4/restaurants.json");
    console.log("res>", response);
    const data = await response.json();
    console.log("data>", data);
    setRestaurants(data);
  };

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
    <div className='container'>
      <DefaultTemplateMenu>
        <div className="welcome">
          <img src={imgs[currentImg]} alt="loading..." className={imgClass} />
          <h1>Welcome, Pizza Hut </h1>

          <ButtonControl
            nameClass={"buttonRestaurant " + buttonActive}
            label={"Open Restaurant"}
            disabled={buttonActive !== "active"}
            handleClick={handleOpenButton}
          />

          <h2>The restaurant must open in :</h2>
          <div className="timer">
            {Object.entries({
              Hours: hours,
              Minutes: minutes,
              Seconds: seconds,
            }).map(([label, value]) => (
              <div className="box">
                <p>{`${Math.floor(value)}`.padStart(2, "0")}</p>
                <span className="text">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </DefaultTemplateMenu>
    </div>
  );
};

export default Welcome;
