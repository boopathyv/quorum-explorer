import React from 'react';
import classNames from 'classnames';

import '../styles/components/Loading.css';

function Loading({ style, className = '', ...rest }) {
	return (
		<div
			className={classNames('loading__spinner', className)}
			style={{ ...style }}
			{...rest}
		/>
	);
}

export default Loading;
