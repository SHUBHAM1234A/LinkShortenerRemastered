const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Sends the Help menu.")

    .addSubcommand((subcommand) =>
      subcommand
        .setName("shorten")
        .setDescription("Help menu for the shorten command.")
    )

    .addSubcommand((subcommand) =>
      subcommand
        .setName("invite")
        .setDescription("Help menu for the invite command.")
    )

    .addSubcommand((subcommand) =>
      subcommand
        .setName("ping")
        .setDescription("Help menu for the ping command.")
    )

    .addSubcommand((subcommand) =>
      subcommand
        .setName("qrcode")
        .setDescription("Help menu for the qrcode command.")
    )

    .addSubcommand((subcommand) =>
      subcommand.setName("all").setDescription("The entire help menu.")
    ),

  run: ({ interaction, client, handler }) => {
    let subcommand = interaction.options.getSubcommand();

    const embed = new EmbedBuilder()
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      })
      .setTimestamp()
      .setColor("Random");

    switch (subcommand) {
      case "invite":
        embed.setTitle('The "/invite" Command');
        embed.setDescription(
          `The "invite" command allows users to invite the bot to their own servers, granting access to all its features and functionalities.`
        );
        break;
      case "ping":
        embed.setTitle('The "/ping" Command');
        embed.setDescription(
          `The "ping" command provides detailed information such as uptime, memory used, and CPU power in addition to the bot's ping. It also reports the number of users and servers the bot is active on, as well as the versions of NodeJS and Discord.js.`
        );

        break;
      case "qrcode":
        embed.setTitle('The "/qrcode" Command');
        embed.setDescription(
          `The "qrcode" command creates a scannable QR code from any given text input. Users can quickly generate a QR code for easy sharing or use with compatible devices, making it a useful tool for communication and information sharing.`
        );

        break;
      case "shorten":
        embed.setTitle('The "/shorten" Command');
        embed.setDescription(
          `The "shorten" command shortens URLs using the rebrandly.com API. By taking a URL input, the command generates a shortened link, allowing for a more concise and shareable link.`
        );

        break;

      default:
        embed.setTitle("Help Menu");
        embed.setDescription(
          `\`\`\`yaml\n/shorten - Shortens a URL.\n/qrcode - Generates a QR code for a text.\n/ping - Sends the bot latency and bunch of other stuff.\n/invite - Lets the user invite the bot to their server.\`\`\``
        );
        embed.setFooter({text: "use /help [command] for more info"})
        break;
    }

    interaction.reply({ embeds: [embed] });
  },
};
