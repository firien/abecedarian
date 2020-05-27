import * as fs from 'fs';
import * as path from 'path';
import pug from 'pug';
import svgPath from 'svg-path-properties';

const speed = 250;
const letters = JSON.parse(fs.readFileSync('letters.json', 'utf8'));
letters.forEach(function(letter) {
  let delay = 0;
  return letter.paths = letter.paths.map(function(path, i) {
    let path = { d: path };
    let p = svgPath.svgPathProperties(path.d);
    path.length = p.getTotalLength();
    let time = path.length / speed;
    let style = `animation-duration:${time.toFixed(2)}s;`;
    if (i > 0) {
      style += `animation-delay:${delay.toFixed(2)}s`;
    }
    delay += time;
    path.style = style;
    return path;
  });
});
let html = pug.renderFile('index.pug', {
  letters: letters,
  pretty: true
});
let filename = 'docs/index.html';
let dirname = path.dirname(filename);
if (!fs.existsSync(dirname)) {
  fs.mkdirSync(dirname);
}
fs.writeFileSync(filename, html);
