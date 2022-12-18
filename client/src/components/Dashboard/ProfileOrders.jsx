import React from "react";
import { useState } from "react";
import { useContext, useEffect } from "react";
import { userContext } from "../../services/UserContext";

const ProfileOrders = () => {
  const [orders, setOrders] = useState([]);
  const { currentUser, setCurrentUser } = useContext(userContext);
  const getOrders = async () => {
    try {
      const res = await fetch("/getOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser.id,
        }),
      });
      const data = await res.json();
      if (res.status === 200) {
        const arr = [...data];
        setOrders([...arr]);
        console.log(orders);
      } else {
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
    getOrders();
  }, []);

  return (
    <>
      <div>
        <div className='overflow-x-auto relative'>
          <table className='w-[80%] my-0 mx-auto text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='py-3 px-6 w-36'>
                  Image
                </th>
                <th scope='col' className='py-3 px-6'>
                  Product name
                </th>
                <th scope='col' className='py-3 px-6'>
                  Category
                </th>
                <th scope='col' className='py-3 px-6'>
                  Price
                </th>
                <th scope='col' className='py-3 px-6'>
                  Quantity
                </th>
                <th scope='col' className='py-3 px-6'>
                  Edit
                </th>
                <th scope='col' className='py-3 px-6'>
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {/* {filteredProducts.map((item) => {
                const selectedCategory = categories.find(
                  (obj) => obj.id == item.categoryId
                );
                return (
                  <>
                    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                      <td className='py-4 px-6 w-20'>
                        <img
                          src={
                            item.image
                              ? `products/${item.image}`
                              : "media/placeholder.jpg"
                          }
                          alt=''
                        />
                      </td>
                      <th
                        scope='row'
                        className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                      >
                        {item.title}
                      </th>
                      <td className='py-4 px-6'>{selectedCategory.name}</td>
                      <td className='py-4 px-6'>${item.price}</td>
                      <td className='py-4 px-6'>{item.quantity}</td>
                      <td className='py-4 px-6'>
                        <NavLink to={"updateProduct"} state={item}>
                          <button class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md'>
                            Edit
                          </button>
                        </NavLink>
                      </td>
                      <td className='py-4 px-6'>
                        <button
                          onClick={() => deleteProduct(item.id)}
                          class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md'
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })} */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProfileOrders;
