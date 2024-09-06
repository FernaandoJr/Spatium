const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('nickname')
		.setDescription('Troca o seu apelido de alguém do servidor!')
        .addUserOption(option =>
            option
            .setName("usuario")
            .setDescription("Selecione um usuário para modificar seu apelido!")
            .setRequired(true)
        )
        .addStringOption(option =>
                option.setName('apelido')
                .setDescription('Apelido desejado')
                .setMaxLength(32)
            )
        .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname),
	async execute(interaction) {
        const { options } = interaction;
        const user = options.getMember("usuario");
        const nick = options.getString("apelido");
        if(nick == null){
            interaction.reply("Apelido do usuário "+ `${user}` +" foi resetado!")
            .then(() =>
                setTimeout(
                    () => interaction.deleteReply(),
                    4_000
                )
            )
            user.setNickname("")
        } else{
            interaction.reply("Apelido do usuário "+ `${user}` +" alterado com sucesso para `"+ `${nick}` + "!`")
            .then(() =>
                setTimeout(
                    () => interaction.deleteReply(),
                    5_000
                )
            )
            user.setNickname(`${nick}`)
        }

	},
};