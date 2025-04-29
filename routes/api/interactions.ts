import { HttpError } from "fresh";
import { define } from "../../utils/core.ts";
import { envOrThrow } from "@dudasaus/env-or-throw";
import { STATUS_CODE } from "@std/http/status";
import {
	APIInteraction,
	APIInteractionResponsePong,
	InteractionResponseType,
	InteractionType,
} from "@discordjs/core";
import tweetnacl from "tweetnacl";
import { decodeHex } from "@std/encoding/hex";
import {
	isButtonComponentInteraction,
	isSlashCommandInteraction,
} from "../../utils/interaction.ts";
import { findCommand } from "../../utils/command.ts";
import { findComponent } from "~/utils/component.ts";

export const handler = define.handlers({
	async POST(ctx) {
		const body = await ctx.req.text();
		const publicKey = envOrThrow("DISCORD_PUBLIC_KEY");
		const signature = ctx.req.headers.get("x-signature-ed25519");
		const timestamp = ctx.req.headers.get("x-signature-timestamp");

		const unauthorized = new HttpError(STATUS_CODE.Unauthorized);

		if (!signature || !timestamp) {
			throw unauthorized;
		} else {
			const valid = tweetnacl.sign.detached.verify(
				new TextEncoder().encode(timestamp + body),
				decodeHex(signature),
				decodeHex(publicKey),
			);

			if (!valid) {
				throw unauthorized;
			} else {
				const interaction: APIInteraction = JSON.parse(body);

				switch (interaction.type) {
					case InteractionType.ApplicationCommand: {
						const unknownCommand = new Error("Unknown Command");
						if (isSlashCommandInteraction(interaction)) {
							const slashCommand = findCommand(
								interaction.data.name,
								interaction.data.type,
							);

							if (slashCommand) {
								return Response.json(
									slashCommand.execute(interaction),
								);
							} else {
								throw unknownCommand;
							}
						} else {
							throw unknownCommand;
						}
					}
					case InteractionType.MessageComponent: {
						const unknownComponent = new Error("Unknown Component");

						if (isButtonComponentInteraction(interaction)) {
							const buttonComponent = findComponent(
								interaction.data.custom_id,
								interaction.data.component_type,
							);

							if (buttonComponent) {
								return Response.json(
									buttonComponent.execute(interaction),
								);
							} else {
								throw unknownComponent;
							}
						} else {
							throw unknownComponent;
						}
					}
					case InteractionType.Ping: {
						return Response.json(
							{
								type: InteractionResponseType.Pong,
							} satisfies APIInteractionResponsePong,
						);
					}
					default: {
						throw new HttpError(STATUS_CODE.NotImplemented);
					}
				}
			}
		}
	},
});
