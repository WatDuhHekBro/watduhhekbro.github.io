const fs = require("fs/promises");
const fetch = require("node-fetch");
const toml = require("@ltd/j-toml");

// Crude function to check if the repository by a specified name still exists as-is (or if it moved or got deleted).
function contains(name, repositories) {
	if (repositories) {
		for (const repo of repositories) {
			if (repo.name === name) {
				return true;
			}
		}
	}

	return false;
}

// This file will autogenerate a TOML file based on the repositories listed from GitHub's API.
// The purpose of autogenerating this TOML file is to track renames and deletions of repositories.
// I will still manually keep track of each repository's info as not everything can or should be expressed through GitHub's API.
(async () => {
	const tomlData = toml.parse(
		await fs.readFile("data.toml", { encoding: "utf-8" })
	);
	const apiData = await (
		await fetch("https://api.github.com/users/WatDuhHekBro/repos")
	).json();
	const lines = [];

	for (const { name, description, html_url, homepage } of apiData) {
		// Only autogenerate new repositories
		if (!contains(name, tomlData.repositories)) {
			lines.push("[[repositories]]");
			lines.push(`name = "${name}"`);
			lines.push(`url = "${html_url}"`);
			lines.push(`description = "${description}"`);

			if (homepage) {
				lines.push(`website = "${homepage}"`);
			}

			lines.push("");
		}
	}

	await fs.writeFile("autogen.toml", lines.join("\n"));

	/*for (const { name, description, html_url, homepage } of data) {
		const repo = {
			name,
			url: html_url,
			description: description ?? "",
		};

		if (homepage) {
			repo.website = homepage;
		}

		repositories.push(repo);
	}

	await fs.writeFile(
		"autogen.toml",
		toml.stringify({ repositories }, { newline: "\n" })
	);*/
})();
