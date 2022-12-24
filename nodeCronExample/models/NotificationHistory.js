const mongoose = require("mongoose");

const NotificationHistorySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    notoficationConfigId: { type: mongoose.Schema.Types.ObjectId, ref: "EmailNotificationConfig" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    nofiticationConfigs: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("NotificationHistory", NotificationHistorySchema);
