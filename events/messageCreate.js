const { Events } = require('discord.js');
const { ask } = require('../openai');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if(
            !message.author.bot || 
            message.author.username != "QOTD Bot" ||
            message.system
        ) return;
        // console.dir(message);
        let prompt = message.content;
        let answer="YES";
        if(message.embeds.length > 0){
            console.log(message.embeds[0].description);
            prompt = message.embeds[0].description;
        }
        
        answer = await ask(prompt);
        if(!answer) answer = "I don't know";
        await message.channel.send(answer);
    }

}