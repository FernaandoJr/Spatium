const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 10,
    data: new SlashCommandBuilder()
        .setName("echo")
        .setDescription("Repete o que o usuário digitar")
        .addStringOption(option =>
            option.setName('input')
            .setDescription('Conteúdo')
            .setMaxLength(100)
            .setRequired(true)
        ),
    async execute(interaction){
            const { options } = interaction;
            await interaction.reply(options.getString("input"));
        },
}