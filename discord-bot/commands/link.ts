import { SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('link')
        .setDescription('Liez votre compte Discord à votre compte Raclif.'),
    async execute(interaction: any) {
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        
        await interaction.reply({
            content: `🔗 **Liez votre compte**\nPour accéder à vos produits et obtenir le rôle client, connectez-vous sur la plateforme et associez votre Discord depuis le dashboard :\n\n👉 **${appUrl}/login**`,
            ephemeral: true
        });
    },
};
