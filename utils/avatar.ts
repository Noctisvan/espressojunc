import { APIUser } from "@discordjs/core";
import { discord } from "./core.ts";
import {
	calculateUserDefaultAvatarIndex,
	ImageURLOptions,
} from "@discordjs/rest";

export function avatar(user: APIUser, options?: Readonly<ImageURLOptions>) {
	const { cdn } = discord().rest;
	return user.avatar
		? cdn.avatar(user.id, user.avatar, options)
		: cdn.defaultAvatar(calculateUserDefaultAvatarIndex(user.id));
}
