import {
	APIChatInputApplicationCommandGuildInteraction,
} from "@discordjs/core";
import { discord } from "~/utils/core.ts";
import { getStringOption } from "~/utils/interaction.ts";

export async function sayMessage(
	interaction: APIChatInputApplicationCommandGuildInteraction,
) {
	const bot = discord();
	const channelId = interaction.channel.id;
	const message = getStringOption(interaction, "message");

	await bot.channels.createMessage(channelId, { content: message?.value });
	await bot.interactions.editReply(
		interaction.application_id,
		interaction.token,
		{
			content: "Message sent.",
		},
	);
}
