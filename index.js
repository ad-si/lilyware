var path = require('path'),

	lilynode = require('../lilynode')


module.exports = function (basePath) {

	return function (request, response, next) {

		if (request.url.search(/\.ly$/gi) === -1) {
			next()
			return
		}

		lilynode.renderFile(
			path.join(basePath, request.url),
			{
				format: 'png'
			},
			function (error, output) {

				if (error)
					next(error)

				else
					response
						.set('Content-Type', 'image/png')
						.send(output)
			}
		)
	}
}
