const { 
    SlashCommandBuilder,
} = require('discord.js');
const { ask } = require('../openai');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ask')
		.setDescription('ask anything to openai\'s gpt-3 via dotbot')
        .addStringOption(option =>
			option
            .setName('prompt')
            .setDescription('The prompt to ask openai')
        ),
	async execute(interaction) {
        try{
            const prompt = interaction.options.getString('prompt');
            await interaction.deferReply();
            const answer = await ask(prompt);
            // send response with author, prompt, and answer
            await interaction.editReply({ content: `**Author:** ${interaction.user.username}\n**Prompt:** ${prompt}\n**Answer:** ${answer}`, ephemeral: true });
        } catch (error) {
            console.log(error);
        }
	},
};
