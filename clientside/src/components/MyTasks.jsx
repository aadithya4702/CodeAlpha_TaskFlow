import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = "http://localhost:4000/api";
axios.defaults.withCredentials = true;

const MyTasks = () => {
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mytask, setmytask] = useState([]);
  console.log(mytask);

  const [selectedTask, setselectedTask] = useState({
    title: "",
    description: "",
    priority: "",
    deadline: "",
    status: "",
    subtask: "",
  });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    deadline: "",
    status: "",
    subtask: "",
  });

  useEffect(() => {
    const fetchmytasks = async () => {
      try {
        const response = await axios.post("/users/getmytask", {
          name: user.userId,
        });

        if (response.status === 200) {
          setmytask(response.data.tasks);
        }
      } catch (error) {
        console.error("Error fetching  Tasks:", error);
      }
    };

    fetchmytasks();
  }, []);

  const openModal = (task) => {
    setselectedTask(task);

    setFormData({
      title: task ? task.title : "",
      description: task ? task.description : "",
      priority: task ? task.priority : "",
      deadline: task ? task.deadlineUTC.slice(0, -6) : "",
      status: task ? task.status : "",
      subtask: task ? task.subtask : "",
    });

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setselectedTask({
      title: "",
      description: "",
      priority: "",
      deadline: "",
      status: "",
      subtask: "",
    });
    setFormData({
      title: "",
      description: "",
      priority: "",
      deadline: "",
      status: "",
      subtask: "",
    });
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    const inputValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: inputValue,
    });
  };

  const handleAddtask = async () => {
    console.log("add functc called");
    try {
      if (!formData) {
        throw new Error("Form data is undefined");
      }

      const data = {
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        deadline: formData.deadline,
        status: formData.status,
        subtask: formData.subtask,
        author: user.userId,
      };

      const response = await axios.post("/users/addtask", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status == 201) {
        toast.success("task added successfully 👌", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setFormData({
          title: "",
          description: "",
          priority: "",
          deadline: "",
          status: "",
          subtask: "",
        });
      } else {
        toast.error("Error occured", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }

      closeModal();
    } catch (error) {
      console.error("Error:", error.message);
    }

    closeModal();
  };

  const handleAddEdittask = async () => {
    console.log("edit functc called", formData.deadline);
    try {
      if (!formData) {
        throw new Error("Form data is undefined");
      }

      const data = {
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        deadline: formData.deadline,
        status: formData.status,
        subtask: formData.subtask,
        author: user.userId,
      };

      // Send the data to the backend
      const response = await axios.post("/users/editmytask", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status == 201) {
        toast.success("task updated successfully 👌", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setFormData({
          title: "",
          description: "",
          priority: "",
          deadline: "",
          status: "",
          subtask: "",
        });
      } else {
        toast.error("Error occured", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }

      closeModal();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className=" w-4/5 sm:w-4/5 mx-auto mb-2 mt-20 ">
      <h3 className="text-lg">My Tasks</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mytask.map((task) => (
          <div
            key={task._id}
            className="bg-white p-4 rounded-lg flex flex-col items-center text-center transition-transform transform"
          >
            <a href={`/taskdesc/${task._id}`} key={task._id}>
              <div className="w-52 h-52 relative max-h-60 max-w-60">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/000/149/946/original/multitasking-task-vector-illustration.jpg"
                  className="w-full h-full rounded-lg"
                  alt={task.title}
                />
                <p className="absolute top-0 left-0 ">{task.priority}</p>
              </div>
              <h3 className="text-lg font-semibold hover:text-green-600">
                {task.title}
              </h3>
            </a>{" "}
            <div className="bg-slate-600 p-2 z-1 rounded-full">
              <FontAwesomeIcon
                className="text-white hover:text-green-600 cursor-pointer mt-2"
                icon={faEdit}
                onClick={() => openModal(task)}
              />
            </div>
          </div>
        ))}
        {/* Empty card for adding a new task */}
        <div className="bg-white p-4 rounded-lg flex flex-col justify-center items-center text-center transition-transform transform">
          <button
            className="text-green-600 hover:underline"
            onClick={() => openModal()}
          >
            <FontAwesomeIcon className="mr-2" icon={faPlus} />
            Add Task
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex  items-center  justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-full h-4/5 scrollbar-track-gray-300 scrollbar-thumb-blue-500 scrollbar-thumb-rounded-md  max-w-md overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {selectedTask ? "Edit Task" : "Add Task"}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                selectedTask ? handleAddEdittask() : handleAddtask();
              }}
            >
              {/* Title */}
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="mt-1 p-2 w-full border rounded-md"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Likes */}
              <div className="mb-4">
                <label
                  htmlFor="likes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  className="mt-1 p-2 w-full border rounded-md"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* priority */}
              <div className="mb-4">
                <label
                  htmlFor="priority"
                  className="block text-sm font-medium text-gray-700"
                >
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  className="mt-1 p-2 w-full border rounded-md"
                  value={formData.priority}
                  onChange={handleInputChange}
                  required
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <h3>{formData.deadline}</h3>
              <div className="mb-4">
                <label
                  htmlFor="likes"
                  className="block text-sm font-medium text-gray-700"
                >
                  DeadLine
                </label>

                <input
                  type="datetime-local"
                  id="deadline"
                  name="deadline"
                  className="mt-1 p-2 w-full border rounded-md"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="likes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Task Status
                </label>
                <input
                  type="text"
                  id="status"
                  name="status"
                  className="mt-1 p-2 w-full border rounded-md"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="likes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sub Tasks
                  <p className="text-red-400">
                    (Note: separate each sub-task by comma(,))
                  </p>
                </label>

                <textarea
                  id="subtask"
                  name="subtask"
                  className="mt-1 p-2 w-full border rounded-md"
                  value={formData.subtask}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button
                type="submit"
                id="editcreate"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                {selectedTask ? "Save Changes" : "Add Task"}
              </button>
              <button
                type="button"
                className="ml-2 text-green-600 hover:underline"
                onClick={closeModal}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTasks;
