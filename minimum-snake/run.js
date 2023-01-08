const fs = require("fs");
const UglifyJS = require("uglify-js");

const DEBUG = !!process.env.DEBUG;
const fileStr = fs.readFileSync("./index.html", "utf-8");
const [html, js] = fileStr
  .split("<script>")
  .map((part) => part.replace("</script>", "").trim());

/** @type {UglifyJS.MinifyOptions} */
let minifyOpts = {
  mangle: {
    eval: true,
    toplevel: false,
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
