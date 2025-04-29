import {
	APIInteractionResponseUpdateMessage,
	APIMessageComponentButtonInteraction,
	APIMessageComponentInteraction,
	ComponentType,
} from "@discordjs/core";
import { CommandResponse } from "~/utils/command.ts";
import components from "~/discord/components/mod.ts";

interface BaseComponent<
	Interaction extends APIMessageComponentInteraction,
> {
	customId: string;
	execute(interaction: Interaction): ComponentResponse;
}

export type ComponentResponse =
	| CommandResponse
	| APIInteractionResponseUpdateMessage;

export function findComponent(
	customId: string,
	type: ComponentType.Button,
): ButtonComponent | undefined;
export function findComponent(
	customId: string,
	type: ComponentType,
) {
	return components.find((component) =>
		component.data.customId === customId && component.data.type === type
	);
}

export function buttonComponent(
	{ customId, execute }: BaseComponent<
		APIMessageComponentButtonInteraction
	>,
) {
	return { data: { customId, type: ComponentType.Button }, execute };
}

export type ButtonComponent = ReturnType<typeof buttonComponent>;

export type Component = ButtonComponent;
