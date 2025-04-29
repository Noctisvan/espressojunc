import { useState } from "preact/hooks";

export function DeployCommands() {
	const [status, setStatus] = useState<SyncStatus>("notSyncing");

	async function deployCommands() {
		setStatus("syncing");

		const response = await fetch("/api/sync", {
			method: "POST",
		});

		if (response.ok) {
			setStatus("synced");
		} else {
			setStatus("notSyncing");
		}
	}

	return (
		<button
			class="flex items-center justify-center w-24 h-8 bg-[#8BA981] font-medium font-[Outfit] text-[#4A5E43] text-sm rounded-xl disabled:opacity-50"
			type="button"
			onClick={() => deployCommands()}
			disabled={status !== "notSyncing"}
		>
			<p>
				{status === "synced"
					? "Synced"
					: status === "notSyncing"
					? "Sync Now"
					: "Syncing"}
			</p>
		</button>
	);
}

type SyncStatus = "notSyncing" | "syncing" | "synced";
