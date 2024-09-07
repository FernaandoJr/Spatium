const { Events, Collection } = require("discord.js");

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		const { cooldowns } = interaction.client;

		

		if (!interaction.isChatInputCommand()) return;
		const command = interaction.client.commands.get(
			interaction.commandName
		);
		if (!command) {
			console.error(
				`No command matching ${interaction.commandName} was found.`
			);
			return;
		}

		if (!cooldowns.has(command.data.name)) {
			cooldowns.set(command.data.name, new Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.data.name);
		const defaultCooldownDuration = 5;
		const cooldownAmount =
			(command.cooldown ?? defaultCooldownDuration) * 1000;

		if (timestamps.has(interaction.user.id)) {
			const expirationTime =
				timestamps.get(interaction.user.id) + cooldownAmount;

			if (now < expirationTime) {
				const expiredTimestamp = Math.round(expirationTime / 1000);


				const locales = {
					"en-US": {
						cooldown: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`,
					},
					"pt-BR": {
						cooldown: `Espere um pouco! você está no cooldown do \`${command.data.name}\`. Você irá poder usá-lo daqui <t:${expiredTimestamp}:R>.`,
					}
				}
		
				if (!(interaction.locale in locales)) {
					interaction.locale = "en-US"; // Default to "en-US" if locale is not found
				}

				return interaction
					.reply({
						content: locales[interaction.locale].cooldown,
						ephemeral: true,
					})
					.then(() =>
						setTimeout(
							() => interaction.deleteReply(),
							command.cooldown * 1000
						)
					);
			}
			if (expirationTime > now) {
				return interaction.deleteReply();
			}
		}

		timestamps.set(interaction.user.id, now);
		setTimeout(
			() => timestamps.delete(interaction.user.id),
			cooldownAmount
		);

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({
					content: "There was an error while executing this command!",
					ephemeral: true,
				});
			} else {
				await interaction.reply({
					content: "There was an error while executing this command!",
					ephemeral: true,
				});
			}
		}
	},
};
