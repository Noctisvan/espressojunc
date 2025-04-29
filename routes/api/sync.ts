import { HttpError } from "fresh";
import { define } from "../../utils/core.ts";
import { STATUS_CODE } from "@std/http/status";
import { deployCommands } from "../../utils/command.ts";

export const handler = define.handlers({
	async POST(ctx) {
		const { user } = ctx.state;

		if (!user?.admin) {
			throw new HttpError(STATUS_CODE.Unauthorized);
		} else {
			await deployCommands();
			return new Response(null, { status: STATUS_CODE.NoContent });
		}
	},
});
