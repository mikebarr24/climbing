const { User } = require("../models/userModel");

const sendToNotifications = async (objectId, title, type, parent) => {
  await User.updateMany(
    {},
    {
      $push: {
        notifications: {
          objectId,
          title,
          type,
          parent,
        },
      },
    }
  );
};

module.exports = sendToNotifications;
