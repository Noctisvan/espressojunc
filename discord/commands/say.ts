import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageFlags, PermissionFlagsBits, Utils } from "@discordjs/core";
import { slashCommand } from "~/utils/command.ts";
import {
	deferReplyInteraction,
	replyInteraction,
} from "~/utils/interaction.ts";
import { sayMessage } from "~/utils/say.ts";

export default slashCommand({
	data: new SlashCommandBuilder().setName("say").setDescription(
		"Sent message as bot",
	).setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
		.addStringOption((opt) =>
			opt.setName("message").setDescription("Message to sent")
				.setRequired(true)
		).toJSON(),
	execute(interaction) {
		if (Utils.isGuildInteraction(interaction)) {
			queueMicrotask(() => sayMessage(interaction));
			return deferReplyInteraction({ flags: MessageFlags.Ephemeral });
		} else {
			return replyInteraction({
				content: "This command should only available on guild.",
				flags: MessageFlags.Ephemeral,
			});
		}
	},
});
