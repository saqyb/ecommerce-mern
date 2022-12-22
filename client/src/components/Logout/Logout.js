import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../services/UserContext";
import { CartContext } from "../../services/CartContext";

const Logout = () => {
  const { Cart, dispatch } = useContext(CartContext);
  const { setCurrentUser } = useContext(userContext);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        setCurrentUser(null);
        dispatch({ type: "Empty" });
        navigate("/");
        if (res.status !== 200) {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
};

export default Logout;
