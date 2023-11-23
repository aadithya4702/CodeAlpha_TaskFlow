// emailScheduler.js
const cron = require("cron");
const schedule = require("node-schedule");
const moment = require("moment-timezone");
const Task = require("../models/tasks");
const usermodel = require("../models/userdata");

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.mailer_email,
    pass: process.env.mailer_pass,
  },
});

// Function to send reminder emails
const sendReminderEmail = (task, user, reminderType) => {
  const mailOptions = {
    from: process.env.mailer_email,
    to: user.email, // Replace with the actual recipient's email
    subject: `Task Reminder: ${task.title}`,
    html: `
      <p>Dear ${user.username},</p>
      <p>This is a friendly remainder for your upcoming task:</p>
        <table>
    <tr>
      <th>Task Title</th>
      <td>${task.title}</td>
    </tr>
    <tr>
      <th>Task Description</th>
      <td>${task.description}</td>
    </tr>
    <tr>
      <th>Task Deadline</th>
      <td>${reminderType}</td>
    </tr>
    <tr>
      <th>Task Priority</th>
      <td>${task.priority}</td>
    </tr>
  </table>
      <p>Regards,<br/>TaskFlow</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

const scheduleEmailReminders = async () => {
  try {
    const tasks = await Task.find({ deadline: { $gt: new Date() } });

    tasks.forEach(async (task) => {
      const user = await usermodel.findById(task.username);

      if (user) {
        const userTimeZone = user.timezone || "Asia/Kolkata";
        const deadlineDateInUserTZ = moment(task.deadline).tz(userTimeZone);

        // Create cron expressions
        const dayBeforeCron = moment(deadlineDateInUserTZ)
          .subtract(1, "days")
          .format("m H D M d");
        const twoHoursBeforeCron = moment(deadlineDateInUserTZ)
          .subtract(2, "hours")
          .format("m H D M d");

        // Schedule cron jobs
        const dayBeforeJob = new cron.CronJob(
          dayBeforeCron,
          () => {
            try {
              console.log("day email has reched");
              sendReminderEmail(task, user, "One day before");
            } catch (error) {
              console.error("Error in sendReminderEmail:", error);
            }
          },
          null,
          true,
          userTimeZone
        );

        const twoHoursBeforeJob = new cron.CronJob(
          twoHoursBeforeCron,
          () => {
            sendReminderEmail(task, user, "Two hours before");
          },
          null,
          true,
          userTimeZone
        );

        await dayBeforeJob.start();
        await twoHoursBeforeJob.start();
      }
    });

    console.log("Email reminders scheduled successfully!");
  } catch (error) {
    console.error("Error scheduling email reminders:", error);
  }
};

module.exports = scheduleEmailReminders;
