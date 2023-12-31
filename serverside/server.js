const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const userroute = require("./routes/approute");
const cors = require("cors");
const { secretKey } = require("./config/keys");
const cookieparser = require("cookie-parser");
const scheduleEmailReminders = require("./utils/emailschedular");

// Middleware
app.use((req, res, next) => {
  console.log("path " + req.path + " method " + req.method);
  next();
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({ extended: false }));

// DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const port = process.env.PORT || 3001;
    app.listen(port, () => {
      console.log("DB connected Successfully and listening to " + port);
      scheduleEmailReminders();
    });
  })
  .catch((error) => console.log(error));

app.use("/api/users", userroute);
