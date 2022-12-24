const sendEmail = require("../lib/sendEmail");
const EmailNotificationConfig = require("../models/EmailNotificationConfig");
const NotificationHistory = require("../models/NotificationHistory");
const User = require("../models/User");

const scheduler = async () => {
  console.log(`Notification Schedular Started at ${new Date().toLocaleString()}`);

  const users = await User.find({ enableNotificationFlag: true });
  const emailNotificationConfigs = await EmailNotificationConfig.find({});

  if (users.length <= 0) {
    console.log("=>User with enableNotificationFlag to true not found");
    return;
  }

  if (emailNotificationConfigs.length <= 0) {
    console.log("=>EmailNotificationConfigs not found");
    return;
  }

  users.map((user) => {
    emailNotificationConfigs.map(async (config) => {
      const userNotificationHistories = await NotificationHistory.find({
        user: user.id,
        notoficationConfigId: config.id,
      });
      if (userNotificationHistories.length <= 0) {
        // console.log(
        //   user.createdAt.getTime(),
        //   config.triggerAfterInSeconds * 1000,
        //   user.createdAt.getTime() + config.triggerAfterInSeconds * 1000,
        //   Date.now()
        // );
        if (user.createdAt.getTime() + config.triggerAfterInSeconds * 1000 < Date.now()) {
          let subject = config.subject;
          let body = config.body;
          body = body.replace(
            "#date#",
            new Date().toLocaleString("en-US", { year: "numeric", month: "long", day: "numeric" })
          );
          body = body.replace(
            "#time#",
            new Date().toLocaleString("en-US", {
              minute: "2-digit",
              hour: "numeric",
              second: "2-digit",
            })
          );
          console.log(`${subject} => ${body}`);
          sendEmail(user.email, subject, body);
          await NotificationHistory.create({
            type: "email",
            notoficationConfigId: config.id,
            user: user.id,
            nofiticationConfigs: JSON.stringify({ subject, body }),
          });
        }
      }
    });
  });

  console.log(`Notification Schedular Ended at ${new Date().toLocaleString()}`);
  console.log(`----------------------------------------------------------------`);
};

module.exports = {
  scheduler,
};
