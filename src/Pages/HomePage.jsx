import React from "react";
import Particles from '../video/videoplayback.mp4';


const HomePage = () => {
  return (
    <h1>
      <video autoPlay loop muted>
          <source src={Particles} type='video/mp4' />
      </video>
    </h1>
  );
};

export default HomePage;
