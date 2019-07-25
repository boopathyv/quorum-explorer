import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import '../styles/components/Header.css';

import Card from '../components/Card';
import SearchBar from '../components/SearchBar';

import { strings } from '../strings/component';

function Header(props) {
	return (
		<Card className={classNames('header', 'container')}>
			<Link className="header__logo" to="/">
				{strings.SITE__TITLE}
			</Link>
			<SearchBar />
		</Card>
	);
}

export default Header;
