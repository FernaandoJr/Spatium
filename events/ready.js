const { Events, ActivityType } = require("discord.js");

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {

		const presences = [
			{
				name: "Kanye West (Official Audio) ft. Amostradinho, Bora Bill & Travis Scott - (Casca de Bala Remix)",
				type: ActivityType.Listening,
				url: "https://www.youtube.com/watch?v=8XpiEOfySBY"
			},
			{
				name: "Grand Theft Auto VI",
				type: ActivityType.Playing,
				url: "https://www.youtube.com/watch?v=Fs98GQnPnFU"
			},
			{
				name: "Bosta na janela",
				type: ActivityType.Playing,
				url: "https://www.youtube.com/watch?v=Fs98GQnPnFU"
			},
			{
				name: "BORA BILL & AMOSTRADIN - Podpah #10000",
				type: ActivityType.Watching,
				url: "https://www.youtube.com/watch?v=Fs98GQnPnFU"
			},
			{
				name: "AO VIVO COM IMAGENS: MEU PAU X SUA BUNDA | 2° RODADA | COPA DO MUNDO DE VIADOS 2024",
				type: ActivityType.Streaming,
				url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
			},
		]

		setInterval(() =>{
			const random = Math.floor(Math.random()*presences.length);
			client.user.setActivity(presences[random]);
		},10_000)

		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
