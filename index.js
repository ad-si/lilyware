const path = require('path')
const lilynode = require('lilynode')


module.exports = (basePath) => {
  return (request, response, next) => {

    if (request.path.search(/\.ly$/gi) === -1) {
      next()
      return
    }

    const format = request.query.format || 'png'
    const resolution = request.query.resolution
    const contentTypes = {
      midi: 'audio/midi',
      pdf: 'application/pdf',
      png: 'image/png',
      ps: 'application/postscript',
      svg: 'image/svg+xml',
    }

    lilynode.renderFile(
      path.join(basePath, request.path),
      {
        format: format,
        resolution: resolution,
      },
      (error, output) => {

        if (error) {
          next(error)
          return
        }

        response
          .set('Content-Type', contentTypes[format])
          .send(output)
      }
    )
  }
}
