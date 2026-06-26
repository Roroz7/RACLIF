export async function checkUserOnServer(discordId: string) {
    const GUILD_ID = process.env.DISCORD_GUILD_ID;
    const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
    
    if (!GUILD_ID || !BOT_TOKEN) return false;

    try {
        const response = await fetch(`https://discord.com/api/v10/guilds/${GUILD_ID}/members/${discordId}`, {
            headers: {
                Authorization: `Bot ${BOT_TOKEN}`
            }
        });
        return response.ok;
    } catch (e) {
        return false;
    }
}

export async function addRoleToUser(discordId: string, roleId: string) {
    const GUILD_ID = process.env.DISCORD_GUILD_ID;
    const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

    if (!GUILD_ID || !BOT_TOKEN) return false;

    try {
        const response = await fetch(`https://discord.com/api/v10/guilds/${GUILD_ID}/members/${discordId}/roles/${roleId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bot ${BOT_TOKEN}`
            }
        });
        return response.ok;
    } catch (e) {
        return false;
    }
}
