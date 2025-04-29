import {
	APIApplicationCommandInteraction,
	APIApplicationCommandInteractionDataOption,
	APIApplicationCommandInteractionDataStringOption,
	APIChatInputApplicationCommandInteraction,
	APIInteractionResponseCallbackData,
	APIInteractionResponseChannelMessageWithSource,
	APIInteractionResponseDeferredChannelMessageWithSource,
	APIInteractionResponseDeferredMessageUpdate,
	APIMessageComponentButtonInteraction,
	APIMessageComponentInteraction,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	ComponentType,
	InteractionResponseType,
	InteractionType,
} from "@discordjs/core";

export function isButtonComponentInteraction(
	interaction: APIMessageComponentInteraction,
): interaction is APIMessageComponentButtonInteraction {
	return interaction.data.component_type === ComponentType.Button;
}

export function isSlashCommandInteraction(
	interaction: APIApplicationCommandInteraction,
): interaction is APIChatInputApplicationCommandInteraction {
	return interaction.data.type === ApplicationCommandType.ChatInput;
}

export function deferReplyInteraction(
	data?: APIInteractionResponseCallbackData,
): APIInteractionResponseDeferredChannelMessageWithSource {
	return {
		data,
		type: InteractionResponseType.DeferredChannelMessageWithSource,
	};
}

export function deferUpdate(): APIInteractionResponseDeferredMessageUpdate {
	return { type: InteractionResponseType.DeferredMessageUpdate };
}

export function replyInteraction(
	data: APIInteractionResponseCallbackData,
): APIInteractionResponseChannelMessageWithSource {
	return { data, type: InteractionResponseType.ChannelMessageWithSource };
}

export function getStringOption(
	interaction: APIChatInputApplicationCommandInteraction,
	name: string,
) {
	return getOption<APIApplicationCommandInteractionDataStringOption>(
		interaction,
		name,
		ApplicationCommandOptionType.String,
	);
}

function getOption<
	T extends APIApplicationCommandInteractionDataOption<
		InteractionType.ApplicationCommand
	>,
>(
	interaction: APIChatInputApplicationCommandInteraction,
	name: string,
	type: ApplicationCommandOptionType,
): T | undefined {
	return interaction.data.options?.find((opt) =>
		opt.name === name && opt.type === type
	) as T;
}
