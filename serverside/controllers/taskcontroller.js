const mongoose = require("mongoose");
const userModel = require("../models/userdata");
const taskmodel = require("../models/tasks");
const { promisify } = require("util");
const sendotpmail = require("../utils/sendOtpEmail");
const moment = require("moment-timezone");

const { secretKey } = require("../config/keys");

const getmytask = async (req, res) => {
  const { name } = req.body;

  try {
    const user = await userModel.findById(name);
    const tasks = await taskmodel.find({
      username: { $in: user._id },
    });

    if (tasks.length > 0) {
      // Convert each task's deadline to "Asia/Kolkata" time zone
      const tasksWithLocalDeadline = tasks.map((task) => {
        const deadlineDate = moment(task.deadline).tz("Asia/Kolkata");
        const deadlineUTC = deadlineDate.format();
        return { ...task._doc, deadlineUTC };
      });

      res.status(200).json({ tasks: tasksWithLocalDeadline });
    } else {
      res
        .status(404)
        .json({ message: "No tasks found for the specified author." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createtask = async (req, res) => {
  try {
    const { author, title, description, priority, deadline, status, subtask } =
      req.body;

    const authorExists = await userModel.findById(author);
    if (!authorExists) {
      return res.status(400).json({ error: "Author (User) not found" });
    }

    const newtask = new taskmodel({
      username: author,
      title,
      description,
      priority,
      deadline,
      status,
      subtask,
    });

    const savedtask = await newtask.save();

    res.status(201).json(savedtask);
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

const editmytask = async (req, res) => {
  try {
    const { author, title, description, priority, deadline, status, subtask } =
      req.body;

    const authorExists = await userModel.findById(author);
    if (!authorExists) {
      return res.status(400).json({ error: "Author (User) not found" });
    }

    const updatedTask = await taskmodel.findOneAndUpdate(
      { title },
      {
        $set: {
          username: author,
          title,
          description,
          priority,
          deadline: deadline,
          status,
          subtask,
        },
      },
      { new: true, upsert: true }
    );

    res.status(201).json(updatedTask);
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      // Handle validation errors
      res.status(400).json({ error: error.message });
    } else {
      // Handle other errors
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

const taskdesciption = async (req, res) => {
  try {
    const taskId = req.params.taskId;

    if (taskId.toLowerCase() === "search") {
      const tasks = await taskmodel.find();
      res.status(200).json({ tasks });
      return;
    }

    const task = await taskmodel.findById(taskId);

    if (task) {
      const deadlineDate = moment(task.deadline).tz("Asia/Kolkata");
      const deadlineUTC = deadlineDate.format();

      const updatedTask = { ...task._doc, deadlineUTC };

      res.status(200).json({ task: updatedTask });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const searchtasks = async (req, res) => {
  try {
    const { query } = req.body;

    console.log("Received query:", query);

    if (query) {
      const tasks = await taskmodel.find({
        title: { $regex: new RegExp(query, "i") },
      });

      console.log("Matching tasks:", tasks);

      res.status(200).json({ tasks });
    } else {
      console.log("Query is missing");
      res.status(400).json({ error: "Query parameter is missing" });
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getmytask,
  createtask,
  editmytask,
  taskdesciption,
  searchtasks,
};
