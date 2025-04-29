import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageFlags, PermissionFlagsBits } from "@discordjs/core";
import { slashCommand } from "~/utils/command.ts";
import { deferReplyInteraction } from "~/utils/interaction.ts";
import { showRules } from "~/utils/rules.ts";

export default slashCommand({
	data: new SlashCommandBuilder().setName("create-message").setDescription(
		"Create a built-in message",
	).addSubcommand((subcommand) =>
		subcommand.setName("rules").setDescription(
			"Create a rules message and verify button",
		)
	).setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild).toJSON(),
	execute(interaction) {
		queueMicrotask(() => showRules(interaction));
		return deferReplyInteraction({ flags: MessageFlags.Ephemeral });
	},
});
