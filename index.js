var path = require('path'),
	lilynode = require('lilynode')


module.exports = function (basePath) {

	return function (request, response, next) {

		if (request.path.search(/\.ly$/gi) === -1) {
			next()
			return
		}

		var format = request.query.format || 'png',
			resolution = request.query.resolution,
			contentTypes = {
				midi: 'audio/midi',
				pdf: 'application/pdf',
				png: 'image/png',
				ps: 'application/postscript',
				svg: 'image/svg+xml'
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
