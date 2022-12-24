const mongoose = require("mongoose");

const EmailNotificationConfigSchema = new mongoose.Schema(
  {
    triggerAfterInSeconds: {
      type: Number,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("EmailNotificationConfig", EmailNotificationConfigSchema);
