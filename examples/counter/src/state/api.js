export const fetchRepos = (user) =>
	fetch(`https://api.github.com/users/${user}/repos?sort=created`)
		.then(res => {
			if (res.status >= 400 && res.status < 600) {
				throw new Error(res.statusText);
			}
			return res.json();
		});