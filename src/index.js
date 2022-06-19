const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest');

// Require the necessary discord.js classes
const fs = require('node:fs');
const { Client, Intents } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Import dos comandos
const commands = [];
const commandFiles = fs.readdirSync('src/commands').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationCommands(process.env.DISCORD_CLIENT_ID),
			{ body: commands },
		)
			.then(console.log('Successfully reloaded application (/) commands.'))
			.catch(console.error);
	}
	catch (error) {
		console.error(error);
	}
})();


const eventFiles = fs.readdirSync('src/events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const numbers = new Set();
	let senha = ' ';

	switch (interaction.commandName) {
	case 'ping':
		await interaction.reply('Pong!');
		break;
	case 'play':
		while (numbers.size < 4) {
			numbers.add(Math.floor(1 + Math.random() * 9));
		}
		for (const number of numbers) senha += number;
		await interaction.reply(senha);
		break;
	}
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);