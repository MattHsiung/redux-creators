import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../state/getRepos';
import ReposList from './ReposList';
import debounce from 'lodash/debounce';

class Repos extends Component {

	onChange = (e) => {
		const { value } = e.target;
		if (value) this.fetchRepos(value);
	}

	fetchRepos = debounce(this.props.fetchRepos, 500)

	render() {
		const { repos, loading, err } = this.props;
		return (
			<div>
				<h1>Find repos</h1>
				<h4>Enter github username:</h4>
				<input
					type="text"
				 	onChange={this.onChange}
				/>
				<ReposList
					repos={repos}
					loading={loading}
					err={err}
				/>
			</div>
		);
	}
}

const mapState = ({ repos }) => ({ ...repos });
export default connect(mapState, actions)(Repos);
