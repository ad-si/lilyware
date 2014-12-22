var path = require('path'),
	lilynode = require('lilynode')


module.exports = function (basePath) {

	return function (request, response, next) {

		if (request.path.search(/\.ly$/gi) === -1) {
			next()
			return
		}

		var format = request.query.format,
			resolution = request.query.resolution,
			contentTypes = {
				png: 'image/png',
				svg: 'image/svg+xml',
				pdf: 'application/pdf'
			}


		lilynode.renderFile(
			path.join(basePath, request.path),
			{
				format: format,
				resolution: resolution
			},
			function (error, output) {

				if (error)
					next(error)

				else
					response
						.set('Content-Type', contentTypes[format])
						.send(output)
			}
		)
	}
}
