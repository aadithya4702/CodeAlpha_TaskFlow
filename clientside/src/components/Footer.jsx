// Footer.js

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <div className="bg-stone-100 p-2 text-black py-12 mt-3">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="w-full sm:w-1/2 lg:w-1/4 mb-8 sm:mb-0">
          <h3 className="custom_logo_font text-3xl tracking-wider mb-4">
            TaskFlow
          </h3>
          <p>
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, libero.
          </p>
        </div>
        <div className="w-full mt-3 sm:w-1/2 lg:w-1/4 mb-8 sm:mb-0">
          <h3 className="text-xl font-semibold mb-4">TaskFlow</h3>
          <ul>
            <li>About us</li>
            <li>Contact us</li>
          </ul>
        </div>
        <div className="w-full mt-3 sm:w-1/2 lg:w-1/4 mb-8 sm:mb-0">
          <h3 className="text-xl font-semibold mb-4">Follow</h3>
          <ul>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
            <li>Youtube</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto mt-8 flex items-center  justify-between border-t-2  border-gray-600">
        <div className="flex items-center ">
          <FontAwesomeIcon className="text-black mr-2" icon={faCopyright} />
          <p className="text-sm">TaskFlow - All rights reserved</p>
        </div>
        <div className="flex items-center space-x-4 ">
          <FontAwesomeIcon className="text-black" icon={faFacebook} />
          <FontAwesomeIcon className="text-black" icon={faInstagram} />
          <FontAwesomeIcon className="text-black" icon={faTwitter} />
          <FontAwesomeIcon className="text-black" icon={faYoutube} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
