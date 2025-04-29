import { createDefine } from "fresh";
import { envOrThrow } from "@dudasaus/env-or-throw";
import { REST } from "@discordjs/rest";
import { API } from "@discordjs/core";
import { User } from "./auth.ts";

export interface State {
	user?: User;
}

export const define = createDefine<State>();

export function discord() {
	const token = envOrThrow("DISCORD_TOKEN");
	const rest = new REST().setToken(token);
	return new API(rest);
}
