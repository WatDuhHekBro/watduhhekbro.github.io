const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const list = document.getElementById('list');
const updated = document.getElementById('updated');

function request(url, callback)
{
	let req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if(this.readyState === 4 && this.status === 200)
			callback && callback(JSON.parse(this.responseText));
	};
	req.open("GET", url);
	req.send();
}

function addLink(url, title)
{
	let link = document.createElement('li');
	let text = document.createElement('a');
	
	text.href = url;
	text.innerText = title;
	
	link.append(text);
	list.append(link);
}

request("https://api.github.com/users/WatDuhHekBro/repos", (data) => {
	for(let repo of data)
	{
		// Last Updated: Month Day, Year @ Hour:Minute Timezone
		if(repo.name === "watduhhekbro.github.io")
		{
			let date = new Date(repo.updated_at);
			updated.innerText = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} @ ${date.toLocaleTimeString(undefined, {timeZoneName: 'short'})}`;
		}
		else if(repo.homepage !== null && repo.homepage !== "" && !repo.archived)
			addLink(new URL(repo.homepage).pathname, repo.name);
	}
	
	addLink("https://github.com/WatDuhHekBro", "My GitHub Page");
	addLink("https://tinyurl.com/wdhb-repo", "Here's the Google Drive where I post other stuff I work on");
});