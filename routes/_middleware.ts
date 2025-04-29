import { getCookies } from "@std/http/cookie";
import { define } from "../utils/core.ts";
import { parseToken } from "../utils/auth.ts";

export const handler = define.middleware(async (ctx) => {
	const cookies = getCookies(ctx.req.headers);
	const accessToken = cookies["access_token"];

	if (accessToken) {
		ctx.state.user = await parseToken(accessToken);
	}

	return await ctx.next();
});
