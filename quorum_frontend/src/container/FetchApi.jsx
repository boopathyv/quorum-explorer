import React, { Component } from 'react';
import axios from '../config';
import { withRouter, Redirect } from 'react-router-dom';
import queryString from 'query-string';

import getMainUrl from '../utils/getMainUrl';

class FetchApi extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			error: null,
			data: null
		};
		this.fetchData = this.fetchData.bind(this);
	}

	componentDidMount() {
		this.fetchData();
	}

	componentDidUpdate(prevProps) {
		if (
			this.props.api !== prevProps.api ||
			this.props.location.search !== prevProps.location.search
		) {
			this.fetchData();
		}
	}

	async fetchData() {
		try {
			let { api } = this.props,
				pageNo = queryString.parse(this.props.location.search).page,
				url = getMainUrl(this.props);

			if (pageNo) {
				if (url === 'address' || url === 'blocks' || url === 'transactions') {
					api = `${api}&page=${pageNo}`;
				} else {
					api = `${api}?page=${pageNo}`;
				}
			}

			this.setState({ loading: true });
			const { data } = await axios.get(api);
			this.setState({ loading: false, data: data });
		} catch (error) {
			this.setState({ loading: false, error: error });
		}
	}

	render() {
		const { error, loading, data } = this.state;
		if (error) {
			return <Redirect to="/error" />;
		} else if (data || loading) {
			return this.props.children(data, loading);
		} else {
			return null;
		}
	}
}

export default withRouter(FetchApi);
