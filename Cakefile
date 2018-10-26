fs = require 'fs'
path = require 'path'
coffee = require 'coffeescript'

task('build', 'Build application', (options) ->
  pug = require 'pug'
  letters = JSON.parse(fs.readFileSync('letters.json', 'utf8'));
  html = pug.renderFile('index.pug', letters: letters)
  filename = "docs/index.html"
  dirname = path.dirname(filename)
  if not fs.existsSync(dirname)
    fs.mkdirSync(dirname)
  fs.writeFileSync(filename, html)
  cs = fs.readFileSync("index.coffee", "utf8")
  js = coffee.compile cs
  fs.writeFileSync("docs/index.js", js)
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