import { Events } from 'discord.js';

export default {
    name: Events.InteractionCreate,
    async execute(interaction: any, client: any) {
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return;

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                const errorMessage = 'Une erreur est survenue lors de l\'exécution de cette commande.';
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: errorMessage, ephemeral: true });
                } else {
                    await interaction.reply({ content: errorMessage, ephemeral: true });
                }
            }
        } else if (interaction.isButton()) {
            if (interaction.customId === 'create_ticket') {
                // Logique simplifiée : Création d'un thread ou channel
                await interaction.reply({ 
                    content: 'Le système complet de tickets avec channels dédiés est en cours de développement. Merci de contacter un administrateur directement en attendant.', 
                    ephemeral: true 
                });
            }
        }
    },
};
