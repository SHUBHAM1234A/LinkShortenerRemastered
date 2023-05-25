require("dotenv").config();

const testServers = process.env.TESTSRV.split("|")

module.exports = (interaction, commandObj) => {
  if (commandObj.testOnly) {
    if (!testServers.includes(interaction.guild.id)) {
      interaction.reply({
        content: "This command cannot be ran here.",
        ephemeral: true,
      });
      return `\`${interaction.member.tag}\` | \`${interaction.member.id}\` | \`${interaction.guild.name}\` | \`${interaction.guild.id}\` tried to use the developer only commmand.`;
    }
  }
};
