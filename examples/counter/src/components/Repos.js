import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../state/getRepos';

class Repos extends Component {
	componentDidMount() {
		this.props.fetchRepos('matthsiung');
	}

	render() {
		const { repos, loading, err } = this.props.repos;
		return (
			<ul>
				{!loading && err &&
					<h2>Error getting repos</h2>
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
	}
}

Repos.defaultProps = {
	repos: [],
};

const mapState = ({ repos }) => ({ repos });
export default connect(mapState, actions)(Repos);
