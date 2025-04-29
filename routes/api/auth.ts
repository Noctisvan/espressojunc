import { HttpError } from "fresh";
import { define, discord } from "../../utils/core.ts";
import { STATUS_CODE } from "@std/http/status";
import { envOrThrow } from "@dudasaus/env-or-throw";
import { setCookie } from "@std/http/cookie";
import { API } from "@discordjs/core";
import { REST } from "@discordjs/rest";
import { createToken } from "../../utils/auth.ts";

export const handler = define.handlers({
	async GET(ctx) {
		const code = ctx.url.searchParams.get("code");

		if (!code) {
			throw new HttpError(STATUS_CODE.BadRequest);
		} else {
			const oauth = await discord().oauth2.tokenExchange({
				client_id: envOrThrow("DISCORD_ID"),
				client_secret: envOrThrow("DISCORD_SECRET"),
				grant_type: "authorization_code",
				code,
				redirect_uri: envOrThrow("DISCORD_REDIRECT_URI"),
			});

			const api = new API(
				new REST({ authPrefix: "Bearer" }).setToken(oauth.access_token),
			);
			const member = await api.users.getGuildMember(
				envOrThrow("DISCORD_GUILD_ID"),
			);

			const headers = new Headers({ location: "/dashboard" });
			setCookie(headers, {
				name: "access_token",
				value: await createToken(member),
				httpOnly: true,
				path: "/",
			});

			return new Response(null, { headers, status: STATUS_CODE.Found });
		}
	},
});
