import React  from 'react';

const ReposList = ({ repos, loading, err }) => (
	<ul>
		{!loading && err &&
			<div>
				<h2>Error getting repos</h2>
				<p>{err.message}</p>
			</div>
		}
		{loading &&
			<h1>Loading...</h1>
		}
		{!loading && !err && repos.map((repo) =>
			<li>
				<a href={repo.html_url}>
					{repo.name}
				</a>
			</li>
		)}
	</ul>
);

ReposList.defaultProps = {
	repos: [],
};

export default ReposList;

