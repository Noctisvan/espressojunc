import { Command } from "~/utils/command.ts";

import createMessage from "./create_message.ts";
import sayMessage from "./say.ts";

export default [
	createMessage,
	sayMessage,
] satisfies Command[];
