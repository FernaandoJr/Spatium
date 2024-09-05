const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('apelido')
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
            )
        .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname),
	async execute(interaction) {
        const { options } = interaction;
        const user = options.getMember("usuario");
        const nick = options.getString("apelido");
        if(nick == null){
            user.setNickname("")
            interaction.reply('Apelido resetado!');
        } else{
            user.setNickname(`${nick}`)
            interaction.reply("Apelido alterado com sucesso para `"+ `${nick}` + "!`");
        }

	},
};