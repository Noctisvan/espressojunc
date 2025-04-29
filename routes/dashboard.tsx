import { page } from "fresh";
import { define } from "../utils/core.ts";
import { DeployCommands } from "../islands/DeployCommands.tsx";

export const handler = define.handlers({
	GET(ctx) {
		const { user } = ctx.state;

		if (user) {
			return page({ user });
		} else {
			return ctx.redirect("/");
		}
	},
});

export default define.page<typeof handler>(({ data }) => {
	const { user } = data;

	return (
		<div class="flex flex-col gap-4 px-4 pt-4 h-dvh bg-[#F5F0D6]">
			<div class="flex items-center justify-between">
				<img class="size-8" src="/clover_green.png" />
				<img
					class="size-10 rounded-full border-2 border-[#593310]"
					src={user.avatar_url}
				/>
			</div>
			<div class="flex flex-col gap-2 overflow-y-auto">
				{user.admin && (
					<div class="flex flex-col gap-2 p-4 bg-[#C0B886] rounded-xl">
						<div class="flex flex-col text-[#593310]">
							<p class="font-extrabold font-[Poppins]">
								Deploy Commands
							</p>
							<p class="font-semibold font-[Outfit] text-sm">
								Sync all application commands to Discord
							</p>
						</div>
						<DeployCommands />
					</div>
				)}
			</div>
		</div>
	);
});
