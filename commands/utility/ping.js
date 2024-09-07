const { SlashCommandBuilder, EmbedBuilder, Client } = require("discord.js");
const { cooldown } = require("./echo");

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Responde com um Pong!"),
	async execute(interaction) {
		const delay = Math.round(
			Math.abs(Date.now() - interaction.createdTimestamp) / 100
		);

		const ping = interaction.client.ws.ping;

		const days = Math.floor(interaction.client.uptime / 86400000);
		const hours = Math.floor(interaction.client.uptime / 3600000) % 24; // 1 Day = 24 Hours
		const minutes = Math.floor(interaction.client.uptime / 60000) % 60; // 1 Hour = 60 Minutes
		const seconds = Math.floor(interaction.client.uptime / 1000) % 60; // I Minute = 60 Seconds


		const locales = {
            "en-US": {
				field1_name: "🤖 Bot latency:",
				field1_value: `${delay}` + "ms",
				
				field2_name: "❤️  API latency:",
				field2_value: `${ping}` + "ms",

				field3_name: "Uptime:",
				field3_value:
						"My uptime is" +
						`${days == 1 ? `${days == 0 ? "" : ` ${days} Day `}` : `${days == 0 ? "" : ` ${days} Days`}`}` +
						`${hours == 1 ? `${hours == 0 ? "" : ` ${hours} Hour `}` : `${hours == 0 ? "" : ` ${hours} Hours`}`}` +
						`${minutes == 1 ? `${minutes == 0 ? "" : ` ${minutes} Minute `}` : `${minutes == 0 ? "" : ` ${minutes} Minutes`}`}` +
						`${seconds == 1 ? `${seconds == 0 ? "" : ` ${seconds} Second `}` : `${seconds == 0 ? "" : ` ${seconds} Seconds`}`}`
			},
            "pt-BR": {
				field1_name: "🤖 Latência do bot:",
				field1_value: `${delay}` + "ms",

				field2_name: "❤️  Latência da API:",
				field2_value: `${ping}` + "ms",

				field3_name: "Tempo Ativo:",
				field3_value: 
						"Eu estou ativo à" +
						`${days == 1 ? `${days == 0 ? "" : ` ${days} Dia `}` : `${days == 0 ? "" : ` ${days} Dias`}`}` +
						`${hours == 1 ? `${hours == 0 ? "" : ` ${hours} Hora `}` : `${hours == 0 ? "" : ` ${hours} Horas`}`}` +
						`${minutes == 1 ? `${minutes == 0 ? "" : ` ${minutes} Minuto `}` : `${minutes == 0 ? "" : ` ${minutes} Minutos`}`}` +
						`${seconds == 1 ? `${seconds == 0 ? "" : ` ${seconds} Segundo `}` : `${seconds == 0 ? "" : ` ${seconds} Segundos`}`}`
            }
        }

        if (!(interaction.locale in locales)) {
            interaction.locale = "en-US"; // Default to "en-US" if locale is not found
        }

		const embed = new EmbedBuilder()
			.setTitle("🏓 Pong!")
			.addFields(
				{
					name: locales[interaction.locale].field1_name,
					value: locales[interaction.locale].field1_value,
					inline: false,
				},
				{
					name: locales[interaction.locale].field2_name,
					value: locales[interaction.locale].field2_value,
					inline: false,
				},
				{
					name: locales[interaction.locale].field3_name,
					value: locales[interaction.locale].field3_value,
					inline: false,
				}
			)
			.setColor("#fec100")
			.setFooter({
				text: "Spatium",
				iconURL:
					"https://cdn.discordapp.com/avatars/1279813042061971517/28b6343a7e441a0ee1a9360f2811202e.webp",
			})
			.setTimestamp();
		await interaction.reply({ embeds: [embed] });
	},
};
