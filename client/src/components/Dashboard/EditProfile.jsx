import React from "react";
import { useEffect, useState, useContext } from "react";
// import { userContext } from "../../contexts/user.context";
import { userContext } from "../../services/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditProfile = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(userContext);
  const [dp, setDp] = useState({});
  const [editBool, setEditBool] = useState(false);

  const updateUserContext = async () => {
    try {
      const res = await fetch("/vendor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: currentUser.id,
        }),
      });

      const data = await res.json();
      if (res.status === 200) {
        setCurrentUser({ ...data });
      } else {
        console.log(data);
        console.log("Failed to fetch Data");
      }
      if (!res.ok) {
        console.log(res);
        throw new Error(`Error! status: ${res.status}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateUserApi = async () => {
    const formData = new FormData();
    formData.append("id", currentUser.id);
    formData.append("name", currentUser.name);
    formData.append("email", currentUser.email);
    formData.append("dp", dp);
    console.log(formData);
    console.log("Update User");
    axios
      .patch("/user", formData)
      .then((res) => {
        updateUserContext();
      })
      .catch((err) => console.log(err));
    setDp({});
  };

  const changeImage = (e) => {
    e.preventDefault();
    // console.log("Change Image");
    const name = e.target.files[0];
    setDp(name);
    // updateUserApi();
    // setCurrentUser({ ...currentUser, dp: dp.name });
  };

  const editBoolHandler = (e) => {
    // e.preventDefault();
    setEditBool(!editBool);
  };

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const saveUser = (e) => {
    e.preventDefault();
    updateUserApi();
  };

  useEffect(() => {}, [currentUser]);

  if (currentUser) {
    return (
      <>
        <div className='m-4 flex justify-between pb-16'>
          <div>
            <form encType='multipart/form-data'>
              {currentUser.dp ? (
                <img
                  className='w-80 h-80 rounded-full flex-shrink-0 object-cover object-center'
                  src={`../users/${currentUser.dp}`}
                  alt={currentUser.dp}
                />
              ) : (
                <img
                  className='w-80 h-80 rounded-full flex-shrink-0 object-cover object-center'
                  src='../users/placeholder.png'
                  alt='DP'
                />
              )}
              <div>
                image: <br />
                {dp.name}
              </div>
              <label
                htmlFor='file-upload'
                class='relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500'
              >
                <span>Change DP</span>
                <input
                  id='file-upload'
                  name='file-upload'
                  type='file'
                  className='sr-only text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                  // value={blog.image}
                  onChange={changeImage}
                  // value={image}
                />
              </label>
              <br />
              <button
                onClick={saveUser}
                className='text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg'
              >
                Save
              </button>
            </form>
          </div>
          <br />
          <div>
            <button
              onClick={() => editBoolHandler()}
              className='text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg'
            >
              Edit Profile
            </button>
            <br />
            <div
              className={`profile ${editBool ? "hideDisplay" : "showDisplay"}`}
            >
              <div>Name: {currentUser.name}</div>
              <div>Email: {currentUser.email}</div>
              {/* <div>BIO: {currentUser.BIO}</div> */}
              <div>DP: {currentUser.dp}</div>
            </div>
            <div
              className={`profile ${editBool ? "showDisplay" : "hideDisplay"}`}
            >
              <br />
              <form encType='multipart/form-data'>
                <div className='relative z-0 mb-6 w-full group'>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                    value={currentUser.email}
                    onChange={handleInput}
                  />
                  <label
                    htmlFor='email'
                    className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                  >
                    Email address
                  </label>
                </div>
                <div className='grid md:grid-cols-2 md:gap-6'>
                  <div className='relative z-0 mb-6 w-full group'>
                    <input
                      type='text'
                      name='name'
                      id='Name'
                      className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                      value={currentUser.name}
                      onChange={handleInput}
                    />
                    <label
                      htmlFor='Name'
                      className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                    >
                      Name
                    </label>
                  </div>
                </div>
                <button
                  type='submit'
                  className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                  onClick={(e) => {
                    setEditBool(!editBool);
                    saveUser(e);
                  }}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
          <br />
        </div>
      </>
    );
  } else {
    navigate("/");
  }
};

export default EditProfile;
