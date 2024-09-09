const { SlashCommandBuilder, EmbedBuilder, roleMention, TimestampStyles, time, userMention } = require("discord.js");

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName("user-info")
		.setNameLocalizations({
            "en-US": "user-info",
			"pt-BR": "usuario-info",
        })
		.setDescription("Mostra algumas informações de um usuário")
		.setDescriptionLocalizations({
			"en-US": "Show some informations about the users",
			"pt-BR": "Mostra algumas informações de um usuário",
		})
		.addUserOption((option) =>
			option
				.setName("usuario")
				.setNameLocalizations({
					"en-US": "user",
					"pt-BR": "usuario",
				})
				.setDescription("Selecione um usuário")
				.setDescriptionLocalizations({
					"en-US": "Select a user",
					"pt-BR": "Selecione um usuário",
				})
				.setRequired(true)
		),
	async execute(interaction) {
		const { options } = interaction;
		const { emoji } = require("../../config.json");
		const targetUser = options.getMember("usuario");

		//console.log(user.guild.members.me.permissions)

		// guarda todos os flags dos badges
		user_badges = targetUser.user.flags.toArray();
		
		// cicla pelos badges não for vazio
		if(!(user_badges.length === 0)){
			for(let i = 0; i < user_badges.length; i++){
				for(let j = 0; j < emoji.flags.length; j++){
					if(user_badges[i] == emoji.flags[j][0]){
						user_badges[i] = emoji.flags[j]

					}
				}
			}
		}

		// pega todas as roles do usuario, indexa [Posição, ID] e deixa ordenado em ordem decrescente
		const user_roles = targetUser.roles.cache
			.map((role) => [role.rawPosition, role.id])
			.sort((a, b) => b[0] - a[0]);

		if(!(user_roles.length === 0)){
			user_roles.pop();
		}
		
		const locales = {
			"en-US": {
				name: 			targetUser.user.username,
				badges: 		user_badges.map((badge) => `<:${badge[2]}:${badge[1]}>`,).join(" ") || "No badges",
				badgesName: 	"Badges",
				avatarURL: 		targetUser.displayAvatarURL(),
				ID: 			targetUser.id,
				IDName:			"ID",
				nickname: 		targetUser.nickname ?? "No nickname",
				nicknameName: 	"Nickname",
				joinedAt: 		`${time(Math.round(targetUser.joinedTimestamp / 1000), 
								TimestampStyles.LongDate)} (${time(Math.round(targetUser.joinedTimestamp / 1000), 
								TimestampStyles.RelativeTime)})`,
				joinedAtName:	"Joined on this server",
				createdIn:	 	`${time(Math.round(targetUser.user.createdTimestamp / 1000), 
								TimestampStyles.LongDate)} (${time(Math.round(targetUser.user.createdTimestamp / 1000), 
								TimestampStyles.RelativeTime)})`,
				createdInName:	"Account created on",			
				roles: 			user_roles.map((role) => roleMention(role[1])).join(", ") || "No roles",
				role_count: 	`Roles (${user_roles.length})`,
			},
			"pt-BR": {
				name: 			targetUser.user.username,
				badges: 		user_badges.map((badge) => `<:${badge[2]}:${badge[1]}>`,).join(" ") || "Nenhum",
				badgesName: 	"Emblemas",
				avatarURL: 		targetUser.displayAvatarURL(),
				ID: 			targetUser.id,
				IDName:			"ID",
				nickname: 		targetUser.nickname ?? "Nenhum",
				nicknameName: 	"Apelido",
				joinedAt: 		`${time(Math.round(targetUser.joinedTimestamp / 1000), 
								TimestampStyles.LongDate)} (${time(Math.round(targetUser.joinedTimestamp / 1000), 
								TimestampStyles.RelativeTime)})`,
				joinedAtName:	"Data de entrada",
				createdIn:	 	`${time(Math.round(targetUser.user.createdTimestamp / 1000), 
								TimestampStyles.LongDate)} (${time(Math.round(targetUser.user.createdTimestamp / 1000), 
								TimestampStyles.RelativeTime)})`,
				createdInName:	"Data da criação da conta",
				roles: 			user_roles.map((role) => roleMention(role[1])).join(", ") || "Nenhum cargo atribuído",
				role_count: 	`Cargos (${user_roles.length})`,
			},
		};

		if (!(interaction.locale in locales)) {
			interaction.locale = "en-US"; // Default to "en-US" if locale is not found
		}



		const embed = new EmbedBuilder()
			.setAuthor({
				name: locales[interaction.locale].name,
				iconURL: locales[interaction.locale].avatarURL,
			})
			.setDescription(userMention(locales[interaction.locale].ID))
			.addFields(
				{
					name: locales[interaction.locale].badgesName,
					value: locales[interaction.locale].badges,
					inline: true,
				},
				{
					name: locales[interaction.locale].nicknameName,
					value: locales[interaction.locale].nickname,
					inline: true,
				},
				{
					name: locales[interaction.locale].IDName,
					value: locales[interaction.locale].ID,
					inline: false,
				},
				{
					name: locales[interaction.locale].joinedAtName,
					value: locales[interaction.locale].joinedAt,
					inline: false,
				},
				{
					name: locales[interaction.locale].createdInName,
					value: locales[interaction.locale].createdIn,
					inline: false,
				},
				{
					name: locales[interaction.locale].role_count,
					value: locales[interaction.locale].roles,
					inline: false,
				},
			)
			.setThumbnail(locales[interaction.locale].avatarURL)
			.setColor("#fec100")
			.setFooter({
				text: "Spatium",
				iconURL: "https://cdn.discordapp.com/avatars/1279813042061971517/28b6343a7e441a0ee1a9360f2811202e.webp",
			})
			.setTimestamp();
		await interaction.reply({ embeds: [embed] });
	},
};
