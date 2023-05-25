require('dotenv').config();
const devs = process.env.DEV.split("|")

module.exports = (interaction, commandObj) => {
    if(commandObj.devOnly){
        if (!devs.includes(interaction.member.id)) {
            interaction.reply({
                content: "This command can only be ran by developers.",
                ephemeral: true
            });
            return `\`${interaction.member.tag}\` | \`${interaction.member.id}\` tried to use the developer only commmand.`;
        }
    }
}