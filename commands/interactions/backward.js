const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("backward")
    .setDescription("Backwards the playing song.")
    .addIntegerOption(option => option
      .setName('time')
      .setDescription('Provide time in seconds.')
      .setRequired(true)
    ),
  memberVoice: true,
  botVoice: true,
  sameVoice: true,
  queueNeeded: true,

  async execute(client, interaction, memberVC, botVC, queue) {

    await interaction.deferReply();

    const time = interaction.options.getInteger('time');

    try {

      await queue.seek(queue.currentTime - time);

      const seekEmbed = new Discord.EmbedBuilder()
        .setColor(config.MainColor)
        .setDescription(`Backwarded the song for ${time} seconds.`)
        .setFooter({
          text: `Commanded by ${interaction.user.tag}`,
          iconURL: interaction.user.displayAvatarURL({ size: 1024 })
        });

      return await interaction.editReply({ embeds: [seekEmbed] });

    } catch (error) {

      const errorEmbed = new Discord.EmbedBuilder()
        .setColor(config.ErrorColor)
        .setDescription(error.message.length > 4096 ? error.message.slice(0, 4093) + "..." : error.message)
        .setFooter({
          text: `Commanded by ${interaction.user.tag}`,
          iconURL: interaction.user.displayAvatarURL({ size: 1024 })
        });

      return await interaction.editReply({ embeds: [errorEmbed] });

    };

  },

};