const mongoose = require("mongoose");
const moment = require("moment-timezone");
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    username: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
      timezone: "Asia/Kolkata",
    },
    status: {
      type: String,
      required: true,
    },
    subtask: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tasks", TaskSchema);
