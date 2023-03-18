require('dotenv').config();
require('./cron').run();

const fs = require('fs');
const path = require('path');

// Require the necessary discord.js classes
const { Client, Collection,Events, GatewayIntentBits } = require('discord.js');

const token = process.env.DIS_TOKEN;

// Create a new client instance
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent
] });

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}


const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of events) {
    const filePath = `./events/${file}`
    const event = require(filePath);
    if ('name' in event && 'execute' in event) {

        if (event.once) 
            client.once(event.name, event.execute);
        else 
            client.on(event.name, event.execute);

    } else {
        console.log(`[WARNING] The event at ${filePath} is missing a required "name" or "execute" property.`);
    }
}


// Log in to Discord with your client's token
client.login(token);





// create a web server which will ping the bot every 15 minutes to keep it alive
const http = require('http');
const port = process.env.PORT || 3000;
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World!');
}
).listen(port);
