const fs = require('fs')
var UglifyJS = require("uglify-js");


const str = fs.readFileSync('./index.html', 'utf-8')
const prefix = 'data:text/html;charset=utf-8,'
const [html, js] = str.split('<script>')
  .map(part => part.replace('</script>', '').trim());

/** @type {UglifyJS.MinifyOptions} */
const minifyOpts  = {
  mangle: {
    eval: true,
    toplevel: false
  },
  compress: {
		sequences: true,
		dead_code: true,
		conditionals: true,
		booleans: true,
		unused: true,
		if_return: true,
		join_vars: true,
		drop_console: true,
    unsafe: true,
	}
}
const minified = UglifyJS.minify(js, minifyOpts).code
const htmlOpen = encodeURIComponent(html+'<script>eval(atob("');
const code = Buffer.from(minified).toString('base64');
const htmlClose = encodeURIComponent('"))</script>');
const url = prefix +  htmlOpen + code + htmlClose

if (process.env.DEBUG) {
  console.log({
    js,
    minified,
    codeLength: js.length,
    minifiedLength: minified.length,
    minSaved: js.length - minified.length,
    urlLength: url.length
  })
}

console.log(url)
