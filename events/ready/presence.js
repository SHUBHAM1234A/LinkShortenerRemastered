const { ActivityType } = require("discord.js");

module.exports = (client) => {
  client.user.setActivity({
    name: "/help all",
    type: ActivityType.Watching,
  });
};
