const Discord = require('discord.js');
const os = require('node:os');
const func = require('../../utils/functions');
const config = require('../../config.json');
const ping = require('ping');

module.exports = {
    name: "Status",
    aliases: ["S", "Latency", "Ping", "P"],
    description: "Shows the bot's latency and Memory usage",
    memberVoice: false,
    botVoice: false,
    sameVoice: false,
    queueNeeded: false,

    async execute(client, message, args, cmd, memberVC, botVC, queue) {
        let serverPing = await ping.promise.probe('discord.com');

        const embed = new Discord.EmbedBuilder()
            .setColor(config.MainColor)
            .setAuthor({
                name: `Pong!`,
                iconURL: client.user.displayAvatarURL({ size: 1024 })
            })
            .addFields(
                {
                    name: `📡 Ping:`,
                    value: `${serverPing.time}ms`,
                    inline: true
                },
                {
                    name: `💾 Memory:`,
                    value: `${func.numberWithCommas(Math.round((process.memoryUsage().rss / 1024 / 1024)))}/${func.numberWithCommas(Math.round(os.totalmem() / 1024 / 1024))}MB`,
                    inline: true
                },
                {
                    name: `💻 CPU:`,
                    value: `${(process.cpuUsage().user / 1000000).toFixed(2)}%`,
                    inline: true
                },
                {
                    name: `⏳ Uptime:`,
                    value: func.timestamp(client.readyTimestamp),
                    inline: false
                },
            )
            .setFooter({
                text: `Commanded by ${message.author.tag}`,
                iconURL: message.author.displayAvatarURL({ size: 1024 })
            });

        return await message.reply({ embeds: [embed] });

    },

};