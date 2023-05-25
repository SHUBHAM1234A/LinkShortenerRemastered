const blackListed = ["bad1", "bad2", "bad3"];

module.exports = (message, client, handler) => {
  for (let i of blackListed) {
    if (message.content.includes(i)) {
      message.delete();
      message.channel.send("blacklisted!");
    }
  }
};

