// const Discord = require('discord.js');
// const config = require('../config.json');

// module.exports = async (client) => {

//   await client.user.setPresence({
//     activities: [
//       {
//         name: `to ${config.Prefix}Play`,
//         type: Discord.ActivityType.Listening
//       }
//     ],
//     status: 'online'
//   });

//   console.log(`${client.user.tag} is online and ready to play music for you!`);

// };

const Discord = require('discord.js');
const config = require('../config.json');

const colors = require('colors');

module.exports = async (client) => {
  let activities = [
    {
      name: `to ${config.Prefix}help`,
      type: Discord.ActivityType.Listening
    },
    {
      name: 'Coded by Kasuma#3236',
      type: Discord.ActivityType.Watching
    },
    {
      name: 'Your Favorites Radio on Discord',
      type: Discord.ActivityType.Playing
    }
  ];
  
  let i = 0;

  setInterval(() => {
    client.user.setPresence({
      activities: [activities[i]],
      status: 'online'
    });

    i++;

    if (i == activities.length) {
      i = 0;
    }
  }, 10000); // 10 detik

  console.log(`${client.user.tag}`.yellow + ' sudah siap ndan!'.magenta); // warna
};
