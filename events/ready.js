const { Events, ActivityType } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {

		client.user.setPresence({ activities: [{ name: 'Lobby dos Gamers' }], status: 'online' });

		console.log(client.user)

		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};