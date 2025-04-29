import {
	APIApplicationCommandInteraction,
	APIChatInputApplicationCommandInteraction,
	APIInteractionResponse,
	APIInteractionResponsePong,
	APIInteractionResponseUpdateMessage,
	ApplicationCommandType,
	RESTPostAPIApplicationCommandsJSONBody,
	RESTPostAPIChatInputApplicationCommandsJSONBody,
} from "@discordjs/core";
import { discord } from "./core.ts";
import { envOrThrow } from "@dudasaus/env-or-throw";
import commands from "../discord/commands/mod.ts";

interface BaseCommand<
	Data extends RESTPostAPIApplicationCommandsJSONBody,
	Interaction extends APIApplicationCommandInteraction,
> {
	data: Data;
	execute(interaction: Interaction): CommandResponse;
}
export type CommandResponse = Exclude<
	APIInteractionResponse,
	APIInteractionResponsePong | APIInteractionResponseUpdateMessage
>;

export function findCommand(
	name: string,
	type: ApplicationCommandType.ChatInput,
): SlashCommand | undefined;
export function findCommand(
	name: string,
	type: ApplicationCommandType,
) {
	return commands.find((command) =>
		command.data.name === name && command.data.type === type
	);
}

export async function deployCommands() {
	await discord().applicationCommands.bulkOverwriteGlobalCommands(
		envOrThrow("DISCORD_ID"),
		commands.map((command) => command.data),
	);
}

export function slashCommand(
	{ data, execute }: BaseCommand<
		RESTPostAPIChatInputApplicationCommandsJSONBody,
		APIChatInputApplicationCommandInteraction
	>,
) {
	return {
		data: { ...data, type: ApplicationCommandType.ChatInput },
		execute,
	};
}
export type SlashCommand = ReturnType<typeof slashCommand>;

export type Command = SlashCommand;
