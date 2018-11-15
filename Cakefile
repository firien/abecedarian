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

task('serve', 'serve', (options) ->
  exec = require('child_process').exec
  watcher = exec 'yarn run cake watch'
  http = require 'http'
  url = require 'url'
  http.createServer((request, response) ->
    uri = url.parse(request.url).pathname
    filename = path.join(process.cwd(), 'docs', uri)

    if fs.existsSync(filename)
      if fs.statSync(filename).isDirectory()
        filename += '/index.html'

      fs.readFile(filename, "binary", (err, file) ->
        if err
          response.writeHead(500, "Content-Type": "text/plain")
          response.write(err + "\n")
          response.end()
          return

        response.writeHead(200)
        response.write(file, "binary")
        response.end()
      )
    else
      response.writeHead(404, "Content-Type": "text/plain")
      response.write("404 Not Found\n")
      response.end()
      return
  ).listen(4000)
  onExit = ->
    watcher.kill()
    process.exit()
  process.on('SIGINT', onExit)
  process.on('exit', onExit)
)
