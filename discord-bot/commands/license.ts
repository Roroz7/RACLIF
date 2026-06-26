import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
    data: new SlashCommandBuilder()
        .setName('license')
        .setDescription('Vérifiez le statut de vos licences Raclif.')
        .addStringOption((option: any) => 
            option.setName('key')
            .setDescription('La clé de licence spécifique à vérifier')
            .setRequired(false)
        ),
    async execute(interaction: any) {
        const key = interaction.options.getString('key');

        try {
            if (key) {
                const license = await prisma.license.findUnique({
                    where: { key },
                    include: { product: true }
                });

                if (!license) {
                    return interaction.reply({ content: "❌ Licence introuvable.", ephemeral: true });
                }

                const embed = new EmbedBuilder()
                    .setTitle(`Licence : ${license.product.name}`)
                    .setColor('#8B5CF6')
                    .addFields(
                        { name: 'Clé', value: `\`${license.key}\``, inline: false },
                        { name: 'Statut', value: license.status, inline: true },
                        { name: 'Expiration', value: license.expiresAt ? new Date(license.expiresAt).toLocaleDateString() : 'Lifetime', inline: true }
                    );

                return interaction.reply({ embeds: [embed], ephemeral: true });
            } else {
                // Find licenses for this discord user
                const user = await prisma.user.findUnique({
                    where: { discordId: interaction.user.id },
                    include: { licenses: { include: { product: true } } }
                });

                if (!user || user.licenses.length === 0) {
                    return interaction.reply({ content: "Vous n'avez aucune licence associée à ce compte Discord.", ephemeral: true });
                }

                const embed = new EmbedBuilder()
                    .setTitle(`Vos Licences (${user.licenses.length})`)
                    .setColor('#8B5CF6');

                user.licenses.forEach((lic: any) => {
                    embed.addFields({
                        name: lic.product.name,
                        value: `Statut: ${lic.status}\nExpiration: ${lic.expiresAt ? new Date(lic.expiresAt).toLocaleDateString() : 'Lifetime'}`,
                        inline: false
                    });
                });

                return interaction.reply({ embeds: [embed], ephemeral: true });
            }
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "Une erreur est survenue lors de la vérification.", ephemeral: true });
        }
    },
};
