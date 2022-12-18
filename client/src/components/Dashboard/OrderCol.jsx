import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const OrderCol = (props) => {
  const [user, setUser] = useState({});
  const getUser = async () => {
    try {
      const res = await fetch("/vendor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: props.Order.userId,
        }),
      });

      const data = await res.json();
      if (res.status === 200) {
        setUser({ ...data });
      } else {
        console.log("🚀 ~ file: Product.jsx:38 ~ getVendor ~ data");
        console.log(data);
        console.log("Failed to fetch Data");
      }
      // console.log("status code: ", res.status); // 200
      if (!res.ok) {
        console.log(res);
        throw new Error(`Error! status: ${res.status}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
        <td className='py-4 px-6'>
          {user.name}
          {/* {name} */}
          {/* {console.log(vendor)} */}
        </td>
        <td className='py-4 px-6'>{props.Order.quantity}</td>
        <td className='py-4 px-6'>
          ${props.Order.quantity * props.Product.price}
        </td>
      </tr>
    </>
  );
};

export default OrderCol;
