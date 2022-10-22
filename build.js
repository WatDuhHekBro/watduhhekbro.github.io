const pug = require("pug");
const toml = require("@ltd/j-toml");
const fs = require("fs");
const data = toml.parse(fs.readFileSync("data.toml"));

// Assume that the "docs" and "templates" directories exist for the sake of simplicity.

fs.writeFileSync(
	"docs/index.html",
	pug.renderFile("templates/index.pug", {
		name: "asdf",
	})
);

fs.writeFileSync(
	"docs/404.html",
	pug.renderFile("templates/404.pug", {
		name: "zxcv",
	})
);
