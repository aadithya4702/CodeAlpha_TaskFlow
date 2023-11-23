import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faShare } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-free/css/all.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const taskDesc = () => {
  const [tasks, settasks] = useState([]);
  const { taskId } = useParams();
  const [splitins, setsplitins] = useState([]);
  const [spliting, setspliting] = useState([]);


  const handlesplitofsubtask = () => {
    if (tasks && tasks.subtask) {
      const ing = tasks.subtask;
      const result = ing.split(",");
      setspliting(result);
      
    
    }
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    const fetchtask = async () => {
      try {
        const response = await axios.get(`/users/${taskId}`);
        if (response.status === 200) {
          settasks(response.data.task);
        }
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchtask();
  }, [taskId]);

  useEffect(() => {
    handlesplitofsubtask();
  }, [tasks]);

  return (
    <>
      <Navbar />
      <div className="w-4/5 mx-auto mt-10 mb-10">
        {tasks && (
          <div>
            <div className="border-b-2 p-2 border-black">
              <h3 className="text-3xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl mb-2">
                {tasks.title}
              </h3>
              <div className="flex items-center space-x-2 mb-2 ">
                <img
                  src="https://www.pngitem.com/pimgs/m/78-786293_1240-x-1240-0-avatar-profile-icon-png.png"
                  alt="profile pic"
                  className="w-10 rounded-full h-10"
                />
                <p>Author</p>
              </div>
            </div>
            <div className="w-full h-1/4 m-5 mt-10 flex items-center overflow-hidden justify-center">
              <img
                className="rounded-lg max-w-500 max-h-96 object-cover transform transition-transform hover:scale-100"
                src="https://static.vecteezy.com/system/resources/previews/000/149/946/original/multitasking-task-vector-illustration.jpg"
                alt=""
              />
            </div>

            <div className="flex items-center justify-center mt-5 space-x-3">
              <div className="p-2 border-r-2 border-gray">
                <p>Deadline</p>
                <p className="text-gray-500 text-sm mt-1">
                  {tasks.deadlineUTC ? tasks.deadline.slice(0, 16) : "N/A"}
                </p>
              </div>
              <div>
                <p>Priority</p>
                <p className="text-gray-500 text-sm  mt-1"> {tasks.priority}</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-start border-b-8 pb-10 border-red-500 space-y-5 md:space-y-0 md:space-x-5 w-4/5 mx-auto justify-between mt-5">
              <div className="text-left w-full md:w-1/2">
                <h3 className="text-3xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl mb-5">
                  Sub Task
                </h3>
                <ul className=" list-inside">
                  {spliting.map((substring, index) => (
                    <li className="mb-3 flex space-x-1 " key={index}>
                      <input
                        type="checkbox"
                        className={`mr-2 rounded-full h-4 ${
                          isChecked ? "checked" : ""
                        }`}
                        onClick={handleCheckboxChange}
                      />

                      {substring}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-3xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl mb-5">
                  Description
                </h3>
                <p>{tasks.description}</p>
              </div>
            </div>
            <div></div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default taskDesc;
