function reversePaginate(query, options, select = "") {
	let page = parseInt(options.page) || 1;
	let limit = parseInt(options.limit) || 10;
	return new Promise((resolve, reject) => {
		let pages = 0;
		this.countDocuments(query)
			.then(totalNumber => {
				pages = totalNumber / limit;

				if (pages % 1 > 0) {
					pages = parseInt(pages + 1);
				}

				let skip = totalNumber - page * limit;

				if (skip < 0) {
					if (Math.abs(skip) >= limit) {
						reject(new Error("page not found"));
					} else {
						limit = limit + skip;
						skip = 0;
					}
				}
				return this.find(query)
					.select(select)
					.skip(skip)
					.limit(limit);
			})
			.then(documents => {
				let result = {};
				result.pages = pages;
				result.limit = limit;
				result.page = page;
				let length = documents.length;
				let temp;
				for (let i = 0; i < length / 2; i++) {
					temp = documents[i];
					documents[i] = documents[length - i - 1];
					documents[length - i - 1] = temp;
				}
				result.documents = documents;
				resolve(result);
			})
			.catch(err => {
				reject(err);
			});
	});
}

module.exports = function(schema) {
	schema.statics.reversePaginate = reversePaginate;
};
