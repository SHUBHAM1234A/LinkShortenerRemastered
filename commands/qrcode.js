const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("qrcode")
    .setDescription("Generate QR code for any text.")
    .addStringOption((o) =>
      o
        .setName("text")
        .setDescription("The text which is to be used to generate QR code.")
        .setRequired(true)
    ),
  run: ({ interaction, client, handler }) => {
    const embed = new EmbedBuilder()
        .setImage(`https://api.qrserver.com/v1/create-qr-code/?data=${interaction.options.getString("text")}/&size=512x512`)
        .setColor("Random")
        .setTimestamp()
    interaction.reply({ embeds: [embed] });
  },
};
