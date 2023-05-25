require("dotenv").config();
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const axios = require("axios");
const headers = {
  "Content-Type": "application/json",
  apikey: process.env.RBAPI,
  workspace: process.env.RBWSID,
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shorten")
    .setDescription("Shortens any URL.")
    .addStringOption((o) =>
      o.setName("url").setDescription("The URL input.").setRequired(true)
    ),
  run: async ({ interaction, client, handler }) => {
    async function shorten(url) {
      const endpoint = "https://api.rebrandly.com/v1/links";
      const payload = {
        destination: url,
        domain: { fullName: "rebrand.ly" },
      };
      const call = {
        method: "post",
        url: endpoint,
        data: payload,
        headers: headers,
      };
      const apiResponse = await axios(call);
      const link = apiResponse.data;
      return link.shortUrl;
    }

    function validateURL(str) {
      const pattern = new RegExp(
        "^([a-zA-Z]+:\\/\\/)?" +
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
          "((\\d{1,3}\\.){3}\\d{1,3}))" +
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
          "(\\?[;&a-z\\d%_.~+=-]*)?" +
          "(\\#[-a-z\\d_]*)?$",
        "i"
      );
      return pattern.test(str);
    }

    let thelink = interaction.options.getString("url");

    if (!thelink.includes("://")) {
      if (validateURL(thelink)) {
        thelink = `https://${thelink}`;
      } else {
        interaction.reply({
          content: `\`${thelink}\` does not seem to be a link.`,
          ephemeral: true,
        });
        return;
      }
    }
    let link;
    try {
      link = await shorten(thelink);
    } catch (error) {
      interaction.reply({
        content: `There was an error shortening that.`,
        ephemeral: true,
      });
      return;
    }
    const embed = new EmbedBuilder()
      .setAuthor({
        name: "Link Shortened!",
        iconURL: "https://www.facebook.com/images/emoji.php/v9/tba/1.5/16/2705.png",
      })
      .setDescription(
        `This link has been shortened by using the API of **rebrandly.com**
        
        **__NOTE__: This link will be deleted after 90 days.**

        Your Link ↓
        **__https://${link}/__**
      
            OR Code for your link ↓`
      )
      .setImage(
        `http://api.qrserver.com/v1/create-qr-code/?data=${link}/&size=512x512`
      )
      .setFooter({text: "Not associated with rebrandly.com"})
      .setColor("Random")
    interaction.reply({ embeds: [embed] });
  },
};