require("dotenv-expand").expand(require("dotenv").config());
const express = require("express");
const authRouter = require("./routes/auth");
const cron = require("node-cron");
const configs = require("./config/config");

// connectDb
const connectDb = require("./db/connect");
const { scheduler } = require("./cron/schedule");
const EmailNotificationConfig = require("./models/EmailNotificationConfig");

// express app
const app = express();
app.use(express.json());

// router
app.use("/user", authRouter);
app.get("/", (req, res) => {
  res.send("Able to connect to Server");
});
app.all("*", (req, res) => {
  res.status(404).json({ message: "Route does not exist" });
});

const port = process.env.PORT || 3001;

const start = async () => {
  try {
    console.log("Connecting to Database");
    await connectDb(process.env.MONGODB_URI);
    console.log(`Connected to Database ${process.env.MONGODB_DATABASE_NAME}`);
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));

    console.log("Adding few Email Notification Configs ");
    // await EmailNotificationConfig.deleteMany({});
    // await EmailNotificationConfig.create({
    //   triggerAfterInSeconds: 60,
    //   subject: "Message 1 : After 60 Seconds",
    //   body: "Hi, #date# and #time#",
    // });
    // await EmailNotificationConfig.create({
    //   triggerAfterInSeconds: 30,
    //   subject: "Message 2 : After 30 Seconds",
    //   body: "Hi, #date# and #time#",
    // });
    // await EmailNotificationConfig.create({
    //   triggerAfterInSeconds: 90,
    //   subject: "Message 3 : After 90 Seconds",
    //   body: "Hi, #date# and #time#",
    // });

    // process.exit();

    console.log("Starting Cron Scheduler");
    cron.schedule(configs.schedular.cronTimer, async () => {
      await scheduler();
    });
    console.log("Started Cron Scheduler");
  } catch (error) {
    if (error.message) console.log(error.message);
    else console.log(error);
  }
};

start();
