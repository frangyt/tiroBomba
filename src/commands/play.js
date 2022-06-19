const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('gera 4 numeros aleatórios'),
	async execute(interaction) {
		const numbers = new Set();
		let senha = '';
		while (numbers.size < 4) {
			numbers.add(1 + Math.floor(Math.random() * 9));
		}
		for (const number of numbers) senha += number;
		await interaction.reply(senha);
	},
};