const Discord = require('discord.js');
const fs = require('node:fs');
const config = require('./config.json');
const commands = [];
const dotenv = require('dotenv');
dotenv.config();

const commandFiles = fs.readdirSync(`./commands/interactions`).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/interactions/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new Discord.REST({ version: '10' }).setToken(process.env.TOKENBOT);

(async () => {

    try {

        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data = await rest.put(
            Discord.Routes.applicationCommands(process.env.ClientID),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);

    } catch (error) {
        console.error(error);
    }

})();