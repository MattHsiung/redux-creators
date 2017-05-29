export const fetchRepos = (user) =>
	fetch(`https://api.github.com/users/${user}/repos?sort=created`)
		.then(res => res.json());