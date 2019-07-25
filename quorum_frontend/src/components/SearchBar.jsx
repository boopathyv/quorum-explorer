import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../styles/components/SearchBar.css';
import searchIcon from '../images/search.png';

import { strings } from '../strings/component';

class SearchBar extends Component {
	state = {
		searchInput: ''
	};

	searchBarNavigation = input => {
		const inputLength = input.length;
		if (inputLength === 0) {
			return null;
		} else if (inputLength < 42) {
			this.props.history.push({
				pathname: `/block/${input}`
			});
		} else if (inputLength === 42) {
			this.props.history.push({
				pathname: `/address/${input}`
			});
		} else {
			this.props.history.push({
				pathname: `/tx/${input}`
			});
		}
	};

	onKeyUpHandler = e => {
		const searchInput = e.target.value;
		if (e.keyCode === 13) {
			this.searchBarNavigation(searchInput);
		}
	};

	onChangeHandler = e => {
		this.setState({ searchInput: e.target.value });
	};

	onClickHandler = e => {
		this.searchBarNavigation(this.state.searchInput);
	};

	render() {
		return (
			<div className="searchBar">
				<input
					autoFocus
					className="searchBar__input"
					type="text"
					placeholder={strings.SEARCH__PLACEHOLDER}
					value={this.state.searchInput}
					onChange={this.onChangeHandler}
					onKeyUp={this.onKeyUpHandler}
				/>
				<button
					className="searchBar__button"
					type="submit"
					onClick={this.onClickHandler}
				>
					<img
						className="searchBar__icon"
						alt="search icon"
						src={searchIcon}
						height="10"
						width="10"
					/>
				</button>
			</div>
		);
	}
}

SearchBar.propTypes = {
	history: PropTypes.object.isRequired
};

export default withRouter(SearchBar);
