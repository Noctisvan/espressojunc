import { APIGuildMember } from "@discordjs/core";
import { decode, encode } from "@gz/jwt";
import { avatar } from "./avatar.ts";
import { envOrThrow } from "@dudasaus/env-or-throw";

export async function createToken(member: APIGuildMember) {
	const payload: User = {
		admin: member.roles.includes(envOrThrow("DISCORD_ADMIN_ROLE_ID")),
		avatar_url: avatar(member.user),
		username: member.user.username,
	};
	return await encode(payload, envOrThrow("JWT_SECRET"));
}

export async function parseToken(token: string): Promise<User> {
	return await decode(token, envOrThrow("JWT_SECRET"));
}

export interface User {
	admin: boolean;
	avatar_url?: string;
	username: string;
}
