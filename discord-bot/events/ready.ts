import { Events } from 'discord.js';

export default {
    name: Events.ClientReady,
    once: true,
    execute(client: any) {
        console.log(`✅ Bot Discord connecté avec succès en tant que ${client.user.tag}`);
        client.user.setActivity('Protéger Raclif 🛡️');
    },
};
