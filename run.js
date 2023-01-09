const fs = require("fs");
const path = require('path');
const UglifyJS = require("uglify-js");

const DEBUG = !!process.env.DEBUG;
const DIST = process.env.DIST;

const devFileStr = fs.readFileSync("./dev.html", "utf-8");
const [html, js] = devFileStr
  .split("<script>")
  .map((part) => part.replace("</script>", "").trim());

/** @type {UglifyJS.MinifyOptions} */
let minifyOpts = {
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
  },
  output: {
    quote_style: 3
  }
};
const readableMinified = UglifyJS.minify(js, minifyOpts).code;
minifyOpts.mangle.toplevel = true;
const minified = UglifyJS.minify(js, minifyOpts).code;

const prefix = "data:text/html;charset=utf-8,";
const htmlStart = encodeURIComponent(html + '<script>eval(atob("');
const code = Buffer.from(minified).toString("base64");
const htmlEnd = encodeURIComponent('"))</script>');
const url = prefix + htmlStart + code + htmlEnd;

if (DEBUG) {
  console.log({
    js,
    readableMinified,
    minified,
    jsLength: js.length,
    minifiedLength: minified.length,
    encodedLength: code.length,
    minifySaved: js.length - minified.length,
    urlLength: url.length,
  });
}

console.log(url);

// Write output files

const fileStr = html + '<script>' + minified + '</script>';
// if we aren't build the distribution builds, just output the index.html file in current working directory
if (!DIST) {
  fs.writeFileSync('./index.html', fileStr)
  process.exit(0);
}

// otherwise, we'll build the distribution version of the file and write it to the dist/ dir
const outFile = path.join(__dirname, 'dist', DIST+'.html');
const footerJsPreTag = `<p>Minified javascript code (${minified.length} bytes)</p><pre id=minified></pre>`;
const footerUrlPreTag = `<p>Encoded data url (${url.length} bytes)</p><pre id=url></pre>`;
const footerAnchorsTags = `<p><a href="https://url-snake.netlify.app/">Mobile friendly version</a> &#183; <a href="https://url-snake.netlify.app/golf.html">Code golf'd version</a> &#183; <a href="https://github.com/lukebatchelor/url-snake/tree/main">Github</a></p>`;
const footerScriptsAndStyles = `<script>minified.innerText = '${minified}';url.innerText='${url}'</script><style>pre{max-width: 60vmin;white-space:pre-line;word-break:break-all;background:#999;padding:1em;}style,script{display: none;}</style>`
const footerStr = footerJsPreTag + footerUrlPreTag + footerAnchorsTags + footerScriptsAndStyles;

fs.writeFileSync(outFile, fileStr + footerStr);

