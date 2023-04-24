const Discord = require('discord.js');
const os = require('node:os');
const func = require('../../utils/functions');
const config = require('../../config.json');
const ping = require('ping');

module.exports = {
    name: "Status",
    aliases: ["S", "Latency", "Ping"],
    description: "Shows the bot\'s latency.",
    memberVoice: false,
    botVoice: false,
    sameVoice: false,
    queueNeeded: false,

    async execute(client, message, args, cmd, memberVC, botVC, queue) {

        const cpuUsage = process.cpuUsage();
        const uptimeSeconds = process.uptime();
        const cpuPercent = ((cpuUsage.user + cpuUsage.system) / 1000 / uptimeSeconds) * 100;
        const serverPing = await ping.promise.probe('discord.com');

        if (!serverPing || !serverPing.time) {
            serverPing.time = 'unknown';
          }

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
                    name: `🖥️ CPU:`,
                    // value: `${cpuPercent.toFixed(2)}%`,
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

            const messageReply = await message.reply({ embeds: [embed] });

            setInterval(async () => {
                const cpuUsage = process.cpuUsage();
                const uptimeSeconds = process.uptime();
                cpuPercent = ((cpuUsage.user + cpuUsage.system) / 1000 / uptimeSeconds) * 100;
                serverPing = await ping.promise.probe('discord.com');
    
                if (!serverPing || !serverPing.time) {
                    serverPing.time = 'unknown';
                }
    
                embed.fields[0].value = `${serverPing.time}ms`;
                embed.fields[2].value = `${cpuPercent.toFixed(2)}%`;
    
                await messageReply.edit({ embeds: [embed] });
            }, 5000);
    
        },
    
    };