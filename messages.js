var fs = require('fs');

module.exports = {
	read: function (filename, callback) {
		fs.readFile(filename, function (err, data) {
			if (err) {
				console.log(err);
				return;
			}
			callback(data);
		})
	},

	write: function (filename, data) {
		fs.writeFile(filename, data, function (err) {
			if (err) {
				console.log(err);
				return;
			}
//			console.log("saved message: ", filename)
		});
	}
};