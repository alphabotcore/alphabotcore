const { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction, Client } = require('discord.js');
const axios = require('axios');
const core = require('alphabotcore');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('github')
        .setDescription('Github Command')
        .addSubcommand(subcommand => subcommand
            .setName("search-repo")
            .setDescription("Search a repository of GitHub.")
            .addStringOption(option =>
                option.setName('name')
                    .setDescription('Enter a repository name.')
                    .setRequired(true))
        ),
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
    */
    async execute(interaction) {
        switch (interaction.options.getSubcommand()) {
            case "search-repo":
                const repoName = interaction.options.getString('name');
                const response = await axios.get(`https://api.github.com/search/repositories?q=${encodeURIComponent(repoName)}`);
                const data = response.data;

                if (!data.items.length) {
                    return interaction.reply({ content: `${core.icons.crossmark} No repository with that name was found.` });
                }

                const repo = data.items[0];
                const repoInfo = await axios.get(repo.url);

                const embed = new EmbedBuilder()
                    .setColor(core.colors.embed)
                    .setTitle(`Information about the repository: "${repoName}"`)
                    .setDescription(`
                        \`📕\` Repository Name: ${repoInfo.data.name}
                        \`💼\` Description: ${repoInfo.data.description}
                        \`🌟\` Stars: ${repoInfo.data.stargazers_count || "No stars"}
                        \`🧶\` Forks: ${repoInfo.data.forks_count || "No forks"}
                        \`📰\` Open Issues: ${repoInfo.data.open_issues || "No open issues"}
                        \`🌎\` Principal language: ${repoInfo.data.language || "No language"}
                    `)
                    .setURL(repoInfo.data.html_url);

                await interaction.reply({ embeds: [embed] });

                break;
        }
    }
}