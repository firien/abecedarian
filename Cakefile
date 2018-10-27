fs = require 'fs'
path = require 'path'
coffee = require 'coffeescript'

task('build', 'Build application', (options) ->
  pug = require 'pug'
  svgPath = require 'svg-path-properties'
  speed = 250
  letters = JSON.parse(fs.readFileSync('letters.json', 'utf8'))
  letters.forEach((letter) ->
    delay = 0
    letter.paths = letter.paths.map((path, i) ->
      path = { d: path }
      p = svgPath.svgPathProperties path.d
      path.length = p.getTotalLength()
      time = path.length / speed
      style = "animation-duration:#{time.toFixed(2)}s;"
      if i > 0
        style += "animation-delay:#{delay.toFixed(2)}s"
      delay += time
      path.style = style
      path
    )
  )
  html = pug.renderFile('index.pug', letters: letters, pretty: true)
  filename = 'docs/index.html'
  dirname = path.dirname(filename)
  if not fs.existsSync(dirname)
    fs.mkdirSync(dirname)
  fs.writeFileSync(filename, html)
  ['index', 'service'].forEach((filename) ->
    cs = fs.readFileSync("#{filename}.coffee", 'utf8')
    js = coffee.compile cs
    fs.writeFileSync("docs/#{filename}.js", js)
  )
)

watch = require 'watch'

task('watch', 'build', (options) ->
  watch.watchTree(__dirname, interval: 0.3, ->
    try
      invoke 'build'
    catch e
      console.log e
  )
)