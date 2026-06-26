import { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('ticket')
        .setDescription('Ouvre un ticket avec le support Raclif.'),
    async execute(interaction: any) {
        const embed = new EmbedBuilder()
            .setTitle('🎫 Support Raclif')
            .setDescription('Besoin d\'aide avec un produit, votre compte, ou un paiement ?\nCliquez sur le bouton ci-dessous pour ouvrir un ticket avec notre équipe de support.')
            .setColor('#8B5CF6');

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('create_ticket')
                .setLabel('Ouvrir un ticket')
                .setEmoji('📩')
                .setStyle(ButtonStyle.Primary),
        );

        await interaction.reply({
            embeds: [embed],
            components: [row as any],
            ephemeral: true
        });
    },
};
