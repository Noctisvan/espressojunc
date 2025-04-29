import { page } from "fresh";
import { define } from "../utils/core.ts";

export const handler = define.handlers({
	GET(ctx) {
		const { user } = ctx.state;

		if (user) {
			return ctx.redirect("/dashboard");
		} else {
			return page();
		}
	},
});

export default define.page((_ctx) => {
	return (
		<div class="flex flex-col gap-4 p-2 h-dvh items-center justify-center bg-[#F5F0D6]">
			<img class="size-16" src="/clover_green.png" />
			<div class="flex flex-col items-center gap-2">
				<p class="font-bold font-[Poppins] text-[#593310]">
					Login to access dashboard
				</p>
				<a
					class="flex px-4 py-2 font-semibold font-[Outfit] text-[#4A5E43] text-sm bg-[#8BA981] rounded-full"
					href="/login"
				>
					Login with Discord
				</a>
			</div>
		</div>
	);
});
