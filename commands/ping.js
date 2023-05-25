const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
require("moment-duration-format");
const cpuStat = require("cpu-stat");
const moment = require("moment");
const os = require("os");

module.exports = {
  data: new SlashCommandBuilder().setName("ping").setDescription("Sends the bot's latency."),
   run: async ({ interaction, client, handler }) => {
    const { version } = require("discord.js");
    cpuStat.usagePercent(async function (err, percent, seconds) {
      if (err) {
        return console.log(err);
      }
      const duration = moment
        .duration(interaction.client.uptime)
        .format(" D[d], H[h], m[m]");

      const embed = new EmbedBuilder();
      embed.setColor("Random");
      embed.setTitle(`Stats from \`${client.user.username}\``);
      embed.addFields(
        {
          name: ":ping_pong: Ping",
          value: `\`\`\`yaml\n ${Math.round(client.ws.ping)}ms\`\`\``,
          inline: true,
        },
        {
          name: ":clock1: Uptime",
          value: `\`\`\`yaml\n ${duration}\`\`\``,
          inline: true,
        },
        {
          name: ":file_cabinet: Memory",
          value: `\`\`\`yaml\n ${(
            process.memoryUsage().heapUsed /
            1024 ** 2
          ).toFixed(2)} MiB of ${(os.totalmem() / 1024 ** 3).toFixed(
            2
          )} GiB\`\`\``,
          inline: true,
        }
      );

      embed.addFields(
        {
          name: ":homes: Servers",
          value: `\`\`\`yaml\n ${client.guilds.cache.size}\`\`\``,
          inline: true,
        },
        {
          name: ":busts_in_silhouette: Users",
          value: `\`\`\`yaml\n ${client.users.cache.size}\`\`\``,
          inline: true,
        },
        {
          name: ":control_knobs: CPU Usage",
          value: `\`\`\`yaml\n ${percent.toFixed(2)}%\`\`\``,
          inline: true,
        }
      );
      embed
        .addFields(
          {
            name: ":blue_book: Discord.js",
            value: `\`\`\`yaml\n v${version}\`\`\``,
            inline: true,
          },
          {
            name: ":green_book: NodeJS",
            value: `\`\`\`yaml\n ${process.version}\`\`\``,
            inline: true,
          },
          {
            name: ":robot: CPU Speed",
            value: `\`\`\`yaml\n ${os.cpus()[0].speed} Hz\`\`\``,
            inline: true,
          }
        ).setTimestamp()

      return interaction.reply({ embeds: [embed] });
    });
  },
};
