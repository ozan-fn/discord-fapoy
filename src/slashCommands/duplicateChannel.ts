import { ChannelType, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../types";

export default {
    command: new SlashCommandBuilder().setName("duplicate_channel").setDescription("_"),
    execute: async (interaction) => {
        await interaction.deferReply();
        const oldChannel = interaction.guild?.channels.cache.find((channel) => channel.id === interaction.channelId);

        // Jika saluran lama ditemukan, hapuslah
        if (oldChannel) {
            await oldChannel.delete();
            console.log(`Deleted old channel: ${oldChannel.name}`);
        }

        // Buat saluran baru dengan nama yang sama
        try {
            const newChannel = await interaction.guild?.channels.create({
                name: oldChannel!.name,
                type: ChannelType.GuildText,
                parent: oldChannel?.parentId,
            });
            console.log(`Created new channel: ${newChannel?.name}`);
        } catch (error) {
            console.error(`Failed to create new channel: ${error}`);
        }
    },
} as SlashCommand;
