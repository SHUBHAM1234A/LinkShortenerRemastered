const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Invite the bot to your server!"),
  run: ({ interaction, client, handler }) => {
    const embed = new EmbedBuilder()
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      })
      .setDescription(
        `Click the button below to invite the bot to your server!`
      )
      .setColor("Random")

    const invite = new ButtonBuilder()
      .setLabel("Invite The Bot")
      .setStyle(ButtonStyle.Link)
      .setURL(
        "https://discord.com/api/oauth2/authorize?client_id=896386860518084638&permissions=277025512512&scope=bot%20applications.commands"
      );

    const row = new ActionRowBuilder().addComponents(invite);

    interaction.reply({
      embeds: [embed],
      components: [row],
      ephemeral: true,
    });
  },
};
