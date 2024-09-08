const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName("user-info")
		.setDescription("Mostra algumas informações do usuário.")
		.addUserOption((option) =>
			option.setName("usuario")
			.setDescription("Selecione um usuário para ver as informações")
			.setRequired(true)
		),
	async execute(interaction) {
		const { options } = interaction;

		const user = options.getMember("usuario");

		console.log(user.guild.roles.cache)

		const MAX_ROLES_DISPLAY = 10;

		const locales = {
            "en-US": {
                title: "Informações do usuário " + user.user.username,
				avatarURL: user.displayAvatarURL(),
				ID: user.id,
				nickname: user.nickname ?? "Nenhum",
				joined_at: Math.round(user.joinedTimestamp / 1000),
				created_in: Math.round(user.user.createdTimestamp / 1000),
				roles: user.roles.cache
				.map(role => "<@&" + role.id + ">")
				.join(", ")
            },
            
        }

        if (!(interaction.locale in locales)) {
            interaction.locale = "en-US"; // Default to "en-US" if locale is not found
        }

		const embed = new EmbedBuilder()
			.setTitle(locales[interaction.locale].title)
			.addFields(
				{
					name: "Emblemas",
					value: "<:activedeveloper:1282096312342286386>",
					inline: true,
				},
				{
					name: "Apelido",
					value: locales[interaction.locale].nickname,
					inline: true,
				},
				{
					name: "Nome Exibido",
					value: "vazio",
					inline: true,
				},
				{
					name: "Data de Entrada do Servidor",
					value: "<t:" + locales[interaction.locale].joined_at + ":D>",
					inline: false,
				},
				{
					name: "Data da criação da conta",
					value: "<t:" + locales[interaction.locale].created_in + ":D>",
					inline: false,
				},
				{
					name: "Cargos",
					value: locales[interaction.locale].roles,
					inline: true,
				},
				{
					name: "ID do Discord",
					value: locales[interaction.locale].ID,
					inline: false,
				}
			)
			.setThumbnail(locales[interaction.locale].avatarURL)
			.setColor("#fec100")
			.setFooter({
				text: "Spatium",
				iconURL:
					"https://cdn.discordapp.com/avatars/1279813042061971517/28b6343a7e441a0ee1a9360f2811202e.webp",
			})
			.setTimestamp();

			//console.log(interaction.user.flags.toArray())
		await interaction.reply({ embeds: [embed] });
	},
};
