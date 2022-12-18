import React from "react";
import CardContainer from "./CardContainer";
import Carousel from "./Carousel";
const Homepage = () => {
  return (
    <>
      <div className='mt-24'>
        <Carousel></Carousel>
        <CardContainer />
      </div>
    </>
  );
};

export default Homepage;
