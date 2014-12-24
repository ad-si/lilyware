# LilyWare

LilyWare is an express middleware for serving lilypond files.


## Usage

```
app.use(lilyware(basePath))
```

Looks in `basePath` for requested `.ly` files and serves them according to the url query string (e.g `test.ly?format=png&resolution=30`)


### Query options

Possible options to configure rendering via url query parameters.


#### format

Possible values: png, svg, pdf, ps, midi  
Default: png


#### resolution

Resolution in ppcm (only available for png format)  
Default: 50
