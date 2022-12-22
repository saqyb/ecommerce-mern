import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { userContext } from "../../services/UserContext";
import { ProductsContext } from "../../services/ProductContext";
import { NavLink } from "react-router-dom";
import { CategoriesContext } from "../../services/CategoriesContext";

const Products = () => {
  const { currentUser } = useContext(userContext);
  const { products, setProducts } = useContext(ProductsContext);
  const { categories, setCategories } = useContext(CategoriesContext);
  const filteredProducts = products.filter((item) => {
    if (item.userId == currentUser.id) return item;
  });

  const getProducts = async () => {
    try {
      const res = await fetch("/product", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (res.status === 200) {
        const arr = [...data];
        setProducts([...arr]);
        console.log(products);
      } else {
        console.log("Failed to fetch Products");
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

  const deleteProduct = async (id) => {
    // e.preventDefault();
    try {
      const res = await fetch("/product", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });
      const data = await res.json();
      if (res.status === 201) {
        console.log(data);
        getProducts();
      } else {
        console.log("Failed to Delete Product");
      }
      console.log("status code: ", res.status); // 200
      if (!res.ok) {
        console.log(res);
        throw new Error(`Error! status: ${res.status}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const CDate = new Date(Date.now());
  if (filteredProducts.length > 0)
    return (
      <>
        <div className='mb-16'>
          <div className='overflow-x-auto relative'>
            <p className='text-2xl ml-5 font-medium'>
              Your Products ({filteredProducts.length})
            </p>

            <table className='w-[80%] my-0 mx-auto text-sm text-left text-gray-500 dark:text-gray-400'>
              <thead className='text-xs h-16 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                <th scope='col' className='py-3 px-6'>
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
              </thead>
              <tbody>
                {filteredProducts.map((item) => {
                  const selectedCategory = categories.find(
                    (obj) => obj.id == item.categoryId
                  );
                  return (
                    <>
                      <tr className='bg-white border-b h-28 dark:bg-gray-800 dark:border-gray-700'>
                        <td className='h-full w-full'>
                          <NavLink to={"/product"} state={item}>
                            <img
                              src={
                                item.image
                                  ? `../products/${item.image}`
                                  : "../media/placeholder.jpg"
                              }
                              alt=''
                              className=''
                            />
                          </NavLink>
                        </td>

                        <th
                          scope='row'
                          className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                        >
                          <NavLink to={"/product"} state={item}>
                            {item.title}
                          </NavLink>
                        </th>
                        <td className='py-4 px-6'>
                          <NavLink to={`../../category/${selectedCategory.id}`}>
                            {selectedCategory.name}
                          </NavLink>
                        </td>

                        <td className='py-4 px-6'>${item.price}</td>
                        <td className='py-4 px-6'>{item.quantity}</td>
                        <td className='py-4 px-6'>
                          <NavLink to={"/dashboard/updateProduct"} state={item}>
                            <button class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md'>
                              Edit
                            </button>
                          </NavLink>
                        </td>
                        <td className='py-4 px-6'>
                          <button
                            onClick={() => deleteProduct(item.id)}
                            class='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md'
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  else {
    return <>No Data</>;
  }
};

export default Products;
