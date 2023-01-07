# URL Snake

A little experiement with seeing how complex of an app I can store entirely within a url.

The basic idea revolves around the fact that a data urls can define their encoding as text/html. 

i.e `data:text/html;charset=utf-8,hello%20world` is a valid url (try pasting it in your url bar). 

So is
`data:text/html;charset=utf-8,%3Cstyle%3E%20*%20%7B%20color%3A%20red%3B%20%7D%3C%2Fstyle%3EHello%20world!`. 

Aditionally, so is `data:text/html;charset=utf-8,%3Cstyle%3E%20*%20%7B%20color%3A%20red%3B%20%7D%3C%2Fstyle%3EHello%20world!%3Cscript%3Ealert(%22hello%20again!%22)%3B%3C%2Fscript%3E`.

So, if we can put html, css and js in a url and have that render a valid html page, how much of a page could we create?

## Running the code

The game is built inside of `index.html`. `run.js` is a node script that takes that html file and encodes it as a url.

```
$ node run.js

data:text/html;charset=utf-8,%3Cbody%3E%3Cscript%3Eeval(atob(%22Y29uc3QgZD1kb2N1bWVudCxiPWQuYm9keSxhPWQuY3JlYXRlRWxlbWVudCgiY2FudmFzIiksYz1hLmdldENvbnRleHQoIjJkIik7Yi5hcHBlbmQoYSksYy5oZWlnaHQ9NDAwLGMud2lkdGg9NDAwLGMucmVjdCgwLDAsMTAwLDEwMCksYy5zdHJva2UoKTs=%22))%3C%2Fscript%3E
```

You can get some debugging information by passing the DEBUG flag

```
$ DEBUG=a node run.js
{
  js: 'const d=document,\n' +
    '    b=d.body,\n' +
    "    a=d.createElement('canvas'),\n" +
    '    c = a.getContext("2d");\n' +
    '  b.append(a)\n' +
    '  c.height = 400;\n' +
    '  c.width = 400;\n' +
    '  c.rect(0,0,100,100);\n' +
    '  c.stroke();',
  minified: 'const d=document,b=d.body,a=d.createElement("canvas"),c=a.getContext("2d");b.append(a),c.height=400,c.width=400,c.rect(0,0,100,100),c.stroke();',
  codeLength: 178,
  minifiedLength: 143,
  minSaved: 35,
  urlLength: 276
}
data:text/html;charset=utf-8,%3Cbody%3E%3Cscript%3Eeval(atob(%22Y29uc3QgZD1kb2N1bWVudCxiPWQuYm9keSxhPWQuY3JlYXRlRWxlbWVudCgiY2FudmFzIiksYz1hLmdldENvbnRleHQoIjJkIik7Yi5hcHBlbmQoYSksYy5oZWlnaHQ9NDAwLGMud2lkdGg9NDAwLGMucmVjdCgwLDAsMTAwLDEwMCksYy5zdHJva2UoKTs=%22))%3C%2Fscript%3E
```

You could also automatically open the url in a browser by using `xargs`

```
$ node run.js | xargs open -a "Google Chrome"
```