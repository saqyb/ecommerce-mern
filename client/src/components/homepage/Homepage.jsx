import React from "react";
import CardContainer from "./CardContainer";
import CarouselComponent from "./Carousel";
import { useContext, useEffect } from "react";
import { userContext } from "../../services/UserContext";

const Homepage = () => {
  const { currentUser, setCurrentUser } = useContext(userContext);
  const callHome = async () => {
    try {
      const res = await fetch("/authenticate", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status == 200) {
        setCurrentUser(data);
        // console.log(currentUser);
      } else if (res.status !== 200) {
        setCurrentUser(null);
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log("Error");
      console.log(err);
      // navigate("/login");
    }
  };
  useEffect(() => {
    callHome();
  }, []);
  return (
    <>
      <div className='mt-16'>
        <CarouselComponent></CarouselComponent>
        <h1 className='w-10/12 my-10 mx-auto text-gray-800 text-4xl font-semibold'>
          Featured Products:
        </h1>
        <CardContainer />
      </div>
    </>
  );
};

export default Homepage;
