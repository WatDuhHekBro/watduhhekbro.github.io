# WatDuhHekBro's Profile

This website serves as an organized version of my GitHub profile, where each repository is manually categorized.

# Project Structure

The root directory contains a Node.js project to format the code and build the HTML. There are some dynamic elements to the page, but because none are necessary at runtime, it's better to build it beforehand.

- `npm install`: Installs dependencies
- `npm start`: Builds the project to be hosted on `/docs`
- `npm run server`: Runs a simple HTTP server to host files with the root of `/docs` (at **port 3000**), use `npm start` in another terminal to continue building
- `npm run format`: Runs the formatter
