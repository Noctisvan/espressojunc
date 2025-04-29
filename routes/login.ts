import { OAuth2Scopes } from "@discordjs/core";
import { define, discord } from "../utils/core.ts";
import { envOrThrow } from "@dudasaus/env-or-throw";

export const handler = define.handlers({
	GET(ctx) {
		const scopes = [OAuth2Scopes.Identify, OAuth2Scopes.GuildsMembersRead];

		return ctx.redirect(
			discord().oauth2.generateAuthorizationURL({
				client_id: envOrThrow("DISCORD_ID"),
				response_type: "code",
				redirect_uri: envOrThrow("DISCORD_REDIRECT_URI"),
				scope: scopes.join(" "),
			}),
		);
	},
});
