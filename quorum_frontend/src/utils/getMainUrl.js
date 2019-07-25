function getMainUrl(props) {
	return props.match.url.split('/')[1];
}

export default getMainUrl;
