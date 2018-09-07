fs = require 'fs'
path = require 'path'

c = require 'coffeescript'

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
  js = c.compile cs
  fs.writeFileSync("docs/index.js", js)
)