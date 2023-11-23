const { model } = require("mongoose");
const Task = require("../models/tasks");
const usermodel = require("../models/userdata");

const nodemailer = require("nodemailer");
const schedule = require("node-schedule");



module.exports = sendReminderEmail;
