const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('gera 4 numeros aleatórios'),
	async execute(interaction) {
		const numbers = new Set();
		while (numbers.size < 4) {
			numbers.add(1 + Math.floor(Math.random() * 10));
		}
		await interaction.reply(numbers.values);
	},
};