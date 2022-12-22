import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../services/UserContext";
import { CategoriesContext } from "../../services/CategoriesContext";
import * as uuid from "uuid";
import axios from "axios";

const AddProduct = () => {
  const { categories, setCategories } = useContext(CategoriesContext);
  const { currentUser, setCurrentUser } = useContext(userContext);
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    userId: currentUser.id,
    id: uuid.v4(),
    categoryId: null,
    title: null,
    description: null,
    price: null,
    quantity: null,
  });

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setProduct({ ...product, [name]: value });
  };

  const [image, setImage] = useState("");

  const changeImage = (e) => {
    console.log("Image Selected");
    const name = e.target.files[0];
    setImage(name);
  };

  const addProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", product.id);
    formData.append("categoryId", product.categoryId);
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);
    formData.append("userId", product.userId);
    formData.append("image", image);
    console.log("Product Added");
    axios
      .post("/product", formData)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    console.log(product);
    navigate("/");
  };

  useEffect(() => {
    if (currentUser.name === null) {
      navigate("/");
    }
  }, []);

  return (
    <div className='bg-gray-100'>
      <section className='text-gray-600 body-font relative'>
        <div className=' px-8 flex flex-col'>
          <h2 className='text-gray-900 text-lg mb-1 font-medium title-font'>
            Add New Product
          </h2>
          <form encType='multipart/form-data'>
            <div className='relative mb-4'>
              <label
                htmlFor='email'
                className='leading-7 text-sm text-gray-600'
              >
                Title
              </label>
              <input
                value={product.title}
                onChange={handleInput}
                type='text'
                id='title'
                name='title'
                className='w-full  rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
              />
            </div>
            <div className='relative mb-4'>
              <label
                htmlFor='countries'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400'
              >
                Categories
              </label>
              <select
                onChange={handleInput}
                id='countries'
                name='categoryId'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              >
                <option defaultValue value={null}>
                  Select Category
                </option>
                {categories.map((item) => {
                  // console.log(item.title);
                  return (
                    <>
                      <option value={item.id}>{item.name}</option>;
                    </>
                  );
                })}
              </select>
            </div>
            <div className='flex text-sm text-gray-600 relative mb-4'>
              <label
                htmlFor='file-upload'
                class='relative cursor-pointer rounded-md  font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500'
              >
                <span>Upload a file</span>
                <input
                  id='file-upload'
                  name='file-upload'
                  type='file'
                  className='sr-only'
                  onChange={changeImage}
                  // value={image}
                />
              </label>
            </div>
            <div className='relative mb-4'>
              <label
                htmlFor='message'
                className='leading-7 text-sm text-gray-600'
              >
                Body
              </label>
              <textarea
                value={product.description}
                onChange={handleInput}
                id='body'
                name='description'
                className='w-full  rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out'
              ></textarea>
            </div>
            <div className='relative mb-4 flex'>
              <div className='w-full'>
                <label
                  htmlFor='price'
                  className='leading-7 text-sm text-gray-600 mr-2'
                >
                  Price ($)
                </label>
                <input
                  value={product.price}
                  onChange={handleInput}
                  type='number'
                  id='price'
                  name='price'
                  className='w-4/6  rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                />
              </div>
              <div className='w-full'>
                <label
                  htmlFor='quantity'
                  className='leading-7 text-sm text-gray-600 mx-2'
                >
                  Quantity
                </label>
                <input
                  value={product.quantity}
                  onChange={handleInput}
                  type='number'
                  id='quantity'
                  name='quantity'
                  className='w-4/6  rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                />
              </div>
              <div className='flex w-full'>
                <button
                  type='submit'
                  onClick={addProduct}
                  className='w-full my-0 mx-auto py-4 bg-blue-600 text-white font-medium text-base leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
                >
                  Add Product
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AddProduct;
