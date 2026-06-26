import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { sendDiscordWebhook, buildEmbed } from "@/lib/webhook";

const registerSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, email, password } = registerSchema.parse(body);

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email ou nom d'utilisateur déjà utilisé" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    if (process.env.DISCORD_WEBHOOK_REGISTRATIONS) {
      const embed = buildEmbed({
        title: "Nouvelle Inscription",
        description: `L'utilisateur **${username}** vient de s'inscrire sur Raclif.`,
        fields: [
          { name: "ID", value: user.id, inline: true },
          { name: "Email", value: user.email, inline: true }
        ]
      });
      await sendDiscordWebhook(process.env.DISCORD_WEBHOOK_REGISTRATIONS, embed);
    }

    return NextResponse.json(
      { message: "Utilisateur créé avec succès", userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'inscription" },
      { status: 500 }
    );
  }
}
