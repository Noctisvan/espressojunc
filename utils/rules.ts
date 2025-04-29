import {
	APIChatInputApplicationCommandInteraction,
	ButtonStyle,
	MessageFlags,
	SeparatorSpacingSize,
} from "@discordjs/core";
import { discord } from "~/utils/core.ts";
import {
	ActionRowBuilder,
	bold,
	ButtonBuilder,
	ContainerBuilder,
	heading,
	italic,
	MediaGalleryBuilder,
	MediaGalleryItemBuilder,
	orderedList,
	SeparatorBuilder,
	TextDisplayBuilder,
} from "@discordjs/builders";

export const rules: Rule[] = [
	{
		title: "༓ No NSFW Content",
		description:
			"Any form of NSFW content—images, videos, text, or audio—is strictly forbidden. Keep the filth outside this realm.",
	},
	{
		title:
			"༓ Be Toxic, But Tastefully",
		description:
			"A little chaos is welcome, but know your limits. No personal attacks, hate speech, or over-the-top provocations.",
	},
	{
		title: "༓ Respect the Realm",
		description:
			"Respect fellow members and staff. Mods and admins are the guardians of this domain—heed their words.",
	},
	{
		title: "༓ Keep Drama in the Shadows",
		description:
			"Personal drama stays in DMs. Don’t bring unnecessary chaos into the public chambers.",
	},
	{
		title: "༓ Stay in Your Lane",
		description:
			"Each channel serves its own purpose. No spamming, no misplaced conversations.",
	},
	{
		title: "Don't bring sensitive/controversial topics here",
		description:
			"This isn't the place for political, religious, or heavy real-life debates. Keep it light.",
	},
	{
		title: "No weird or sketchy files",
		description:
			"Don't send anything shady. If it looks sus, it's getting deleted and you might too.",
	},
];

export interface Rule {
	title: string;
	description: string;
}

export async function showRules(
	interaction: APIChatInputApplicationCommandInteraction,
) {
	const bot = discord();

	await bot.channels.createMessage(interaction.channel.id, {
		flags: MessageFlags.IsComponentsV2,
		components: [
			new ContainerBuilder().setAccentColor(0x120921)
				.addTextDisplayComponents(
					new TextDisplayBuilder({
						content: heading("🌙 Noctis Guidelines"),
					}),
				).addSeparatorComponents(
					new SeparatorBuilder({
						spacing: SeparatorSpacingSize.Small,
						divider: false,
					}),
				).addTextDisplayComponents(
					new TextDisplayBuilder({
						content: italic(
							"Follow Discord Community Guidelines and Terms of Service",
						),
					}),
				).addActionRowComponents(
					new ActionRowBuilder<ButtonBuilder>().setComponents(
						new ButtonBuilder({
							style: ButtonStyle.Link,
							label: "Community Guidelines",
							url: "https://discord.com/guidelines",
						}),
						new ButtonBuilder({
							style: ButtonStyle.Link,
							label: "Terms of Service",
							url: "https://discord.com/terms",
						}),
					),
				).addSeparatorComponents(
					new SeparatorBuilder({
						spacing: SeparatorSpacingSize.Large,
					}),
				).addTextDisplayComponents(
					new TextDisplayBuilder({
						content: orderedList(
							rules.map((rule) =>
								`${bold(rule.title)} - ${
									italic(rule.description)
								}`
							),
						),
					}),
				).addMediaGalleryComponents(
					new MediaGalleryBuilder().addItems(
						new MediaGalleryItemBuilder({
							media: {
								url: "attachment://rules.png",
							},
						}),
					),
				).addSeparatorComponents(
					new SeparatorBuilder({
						spacing: SeparatorSpacingSize.Small,
					}),
				).addTextDisplayComponents(
					new TextDisplayBuilder({
						content: bold("Have u read the rules?"),
					}),
				).addActionRowComponents(
					new ActionRowBuilder<ButtonBuilder>().setComponents(
						new ButtonBuilder({
							custom_id: "verify",
							style: ButtonStyle.Primary,
							label: "Yes, I do",
							emoji: { name: "🌙" },
						}),
					),
				).toJSON(),
		],
		files: [
			{
				name: "rules.png",
				data: await Deno.readFile("./discord/assets/rules.png"),
			},
		],
	});
	await bot.interactions.editReply(
		interaction.application_id,
		interaction.token,
		{ content: "Rules created." },
	);
}
 