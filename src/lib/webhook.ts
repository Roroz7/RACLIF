interface EmbedField {
    name: string;
    value: string;
    inline?: boolean;
}

interface EmbedOptions {
    title: string;
    description?: string;
    color?: number;
    fields?: EmbedField[];
}

export async function sendDiscordWebhook(webhookUrl: string | undefined, payload: any) {
    if (!webhookUrl) return false;
    
    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        return response.ok;
    } catch (e) {
        return false;
    }
}

export function buildEmbed({ title, description, color = 0x8B5CF6, fields = [] }: EmbedOptions) {
    return {
        embeds: [{
            title,
            description,
            color,
            fields,
            timestamp: new Date().toISOString()
        }]
    };
}
