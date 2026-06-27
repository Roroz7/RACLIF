import { Client, GatewayIntentBits, Collection, REST, Routes } from 'discord.js';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
    ]
});

// Création d'une collection pour les commandes
(client as any).commands = new Collection();

// Imports des commandes
import linkCommand from './commands/link';
import licenseCommand from './commands/license';
import ticketCommand from './commands/ticket';

(client as any).commands.set(linkCommand.data.name, linkCommand);
(client as any).commands.set(licenseCommand.data.name, licenseCommand);
(client as any).commands.set(ticketCommand.data.name, ticketCommand);

// Events
import readyEvent from './events/ready';
import interactionCreateEvent from './events/interactionCreate';

client.once('ready', (...args) => readyEvent.execute(...args, client));
client.on('interactionCreate', (...args) => interactionCreateEvent.execute(...args, client));

async function main() {
    const token = process.env.DISCORD_BOT_TOKEN;
    const clientId = process.env.DISCORD_CLIENT_ID;

    if (!token || !clientId) {
        console.error("⚠️ Missing DISCORD_BOT_TOKEN or DISCORD_CLIENT_ID");
        process.exit(1);
    }

    // Enregistrement des slash commands auprès de l'API Discord
    const rest = new REST({ version: '10' }).setToken(token);
    try {
        console.log('🔄 Actualisation des commandes slash...');
        await rest.put(
            Routes.applicationCommands(clientId),
            { body: [
                linkCommand.data.toJSON(),
                licenseCommand.data.toJSON(),
                ticketCommand.data.toJSON()
            ] },
        );
        console.log('✅ Commandes slash rechargées avec succès.');
    } catch (error) {
        console.error("Erreur lors de l'enregistrement des commandes:", error);
    }

    await client.login(token);
}

main();
