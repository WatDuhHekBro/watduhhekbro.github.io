const fs = require("fs/promises");
const fetch = require("node-fetch");

// This file will autogenerate a TOML file based on the repositories listed from GitHub's API.
// The purpose of autogenerating this TOML file is to track renames and deletions of repositories.
// I will still manually keep track of each repository's info as not everything can or should be expressed through GitHub's API.
// Use a diff checker to see what repos are new/moved/deleted.
(async () => {
	const apiData = await (
		await fetch("https://api.github.com/users/WatDuhHekBro/repos")
	).json();
	const lines = [];

	for (const { name, description, html_url, homepage } of apiData) {
		lines.push("[[repositories]]");
		lines.push(`name = "${name}"`);
		lines.push(`url = "${html_url}"`);
		lines.push(`description = "${description}"`);

		if (homepage) {
			lines.push(`website = "${homepage}"`);
		}

		lines.push("");
	}

	await fs.writeFile("autogen.toml", lines.join("\n"));
})();
