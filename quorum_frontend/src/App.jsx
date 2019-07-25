import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import classNames from 'classnames';

import './App.css';

import DetailViewPage from './container/DetailViewPage';
import DetailListPage from './container/DetailListPage';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './container/HomePage';
import ErrorPage from './components/ErrorPage';

function App() {
	return (
		<BrowserRouter>
			<Header />
			<div className={classNames('container', 'routerContainer')}>
				<Switch>
					<Route path="/" exact component={HomePage} />
					<Route path="/(block|tx)/:id" exact component={DetailViewPage} />
					<Route path="/address/:id" exact component={DetailListPage} />
					<Route path="/(blocks|transactions)/" component={DetailListPage} />
					<Route path="/error" component={ErrorPage} />
					<Route component={() => <ErrorPage error={true} />} />
				</Switch>
			</div>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
