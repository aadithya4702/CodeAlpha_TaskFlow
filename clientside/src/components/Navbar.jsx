import React, { useContext } from "react";
import { UserContext } from "../context/userContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-free/css/all.css";

const Navbar = () => {
  const { user } = useContext(UserContext);

  const openmenu = () => {
    const menu = document.getElementById("dropdownNavbar");
    menu.classList.toggle("hidden");
  };

  const openprofile = () => {
    const profile = document.getElementById("profilebar");
    profile.classList.toggle("hidden");
  };

  const { logout } = useContext(UserContext);
  const handleLogout = () => {
    logout();
    // Redirect or perform additional actions after logout
  };

  return (
    <>
      <nav className="container mx-auto p-4 relative mt-5">
        <div className=" flex justify-between items-center ">
          <div className="custom_logo_font text-3xl">
            <h3>TaskFlow</h3>
          </div>
          {/* <ul className="space-x-8 text-lg  hidden md:flex ">
            <a
              href="/home"
              className="hover:text-red-600 hover:border-b-2 border-black"
            >
              <li>Home</li>
            </a>
            <a
              href="/myrecipes"
              className="hover:text-red-600 hover:border-b-2 border-black"
            >
              <li>My Recipes</li>
            </a>
            {/* <a
              href="/favorites"
              className="hover:text-red-600 hover:border-b-2 border-black"
            >
              <li>My Favorites</li>
            </a> */}
           {/* <a
              href="/category"
              className="hover:text-red-600 hover:border-b-2 border-black"
            >
              <li>Category</li>
            </a>
          </ul> */}
          <div className="flex items-center space-x-5">
            <img
              src="https://www.pngitem.com/pimgs/m/78-786293_1240-x-1240-0-avatar-profile-icon-png.png"
              alt="profile pic"
              className="w-10 rounded-full h-10"
              onClick={openprofile}
            />
            {/* <div className=" md:hidden">
              <FontAwesomeIcon
                onClick={openmenu}
                className=" text-xl  hover:text-green-600 hover:border-2 border-gray-600 p-2 rounded"
                icon={faBars}
              />
            </div> */}
          </div>
        </div>

        <div
          id="profilebar"
          className="z-10 absolute top-20 right-10 hidden   font-normal bg-slate-200 divide-y divide-gray-700 rounded-lg shadow w-44"
        >
          <ul
            className="py-2 text-lg text-black  "
            aria-labelledby="dropdownLargeButton"
          >
            <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              {user.username}
            </li>
            <li
              title={user.useremail}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 overflow-hidden dark:hover:text-white"
            >
              {user.useremail}
            </li>
            <li
              className="block px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </div>
        <div
          id="dropdownNavbar"
          className="z-10 absolute top-20 right-10 hidden  font-normal bg-slate-200 divide-y divide-gray-700 rounded-lg shadow w-44"
        >
          <ul
            className="py-2 text-lg text-black  "
            aria-labelledby="dropdownLargeButton"
          >
            <li>
              <a
                href="/home"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/myrecipes"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                My Recipes
              </a>
            </li>
            {/* <li>
              <a
                href="/favorites"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                My Favorites
              </a>
            </li> */}
            <li>
              <a
                href="/category"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Category
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
