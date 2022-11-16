const fs = require("fs/promises");
const nunjucks = require("nunjucks");
const { minify } = require("html-minifier-terser");
const toml = require("@ltd/j-toml");

(async () => {
	const data = toml.parse(
		await fs.readFile("data.toml", { encoding: "utf-8" })
	);

	console.log(data);

	// Assume that the "docs" and "templates" directories exist for the sake of simplicity.
	await Promise.all([
		fs.writeFile(
			"docs/index.html",
			await minify(
				nunjucks.render("templates/index.njk", {
					name: "asdf",
				}),
				{
					collapseWhitespace: true,
				}
			)
		),
		fs.writeFile(
			"docs/404.html",
			await minify(
				nunjucks.render("templates/404.njk", {
					name: "zxcv",
				}),
				{
					collapseWhitespace: true,
				}
			)
		),
	]);
})();
