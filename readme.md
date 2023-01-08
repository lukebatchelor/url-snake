# URL Snake

A little experiement with seeing how complex of an app I can store entirely within a url.

The basic idea revolves around the fact that a data urls can define their encoding as text/html. 

i.e `data:text/html;charset=utf-8,hello%20world` is a valid url (try pasting it in your url bar). 

So is
`data:text/html;charset=utf-8,%3Cstyle%3E%20*%20%7B%20color%3A%20red%3B%20%7D%3C%2Fstyle%3EHello%20world!`. 

Aditionally, so is `data:text/html;charset=utf-8,%3Cstyle%3E%20*%20%7B%20color%3A%20red%3B%20%7D%3C%2Fstyle%3EHello%20world!%3Cscript%3Ealert(%22hello%20again!%22)%3B%3C%2Fscript%3E`.

So, if we can put html, css and js in a url and have that render a valid html page, how much of a page could we create?

## Result

I've come up with a ~1033~ 852 byte solution that is a fully playable game of snake.

> ```let e=document,t=e.body,l=Math,r="Space: start/reset. Arrows: Move<div><canvas id=a><style>#a{border:solid}*{background:tan}</style>",n=40,o=400,i,d,f=[[3,3]],s={37:1,38:1,39:1,40:1},c,h=f,p=f[0],u="#000",v="red",g=(e,t,l=u,r=n,a=n)=>{k.fillStyle=l,k.fillRect(e,t,r,a)},b=(e,t,l=t,r="center")=>{k.fillStyle=u,k.textAlign=r,k.fillText(e,t,l)},m=()=>l.floor(9*l.random()),w=()=>{if(i){let[e,t]=f[0],l=e+c%2,r=t+(c-1)%2,a=([e,t])=>e==l&&t==r;if(f.pop(),l<0||9<l||r<0||9<r||f.some(a))return M();f=[[l,r],...f],a(p)&&(f.push([...f[d]]),d++,p=[m(),m()]),g(0,0,"tan",o,o);for([x,y]of f)g(x*n,y*n);g(p[0]*n,p[1]*n,v),b(d,9,30,"left")}},M=()=>{i=0,g(0,0,v,o,o),b(":(",o/2)},S=()=>{i=1,f=[...h],c=2,d=0},k=(t.innerHTML=r,a.getContext("2d"));a.height=a.width=o,k.font="30px f",e.addEventListener("keyup",({which:e})=>{s[e]?c=e-38:32!=e||i||S()}),setInterval(w,o);```

Encoded as a url it is 1220 bytes long:

> ```data:text/html;charset=utf-8,%3Cbody%3E%3Cscript%3Eeval(atob(%22bGV0IGU9ZG9jdW1lbnQsdD1lLmJvZHksbD1NYXRoLHI9IlNwYWNlOiBzdGFydC9yZXNldC4gQXJyb3dzOiBNb3ZlPGRpdj48Y2FudmFzIGlkPWE+PHN0eWxlPiNhe2JvcmRlcjpzb2xpZH0qe2JhY2tncm91bmQ6dGFufTwvc3R5bGU+IixuPTQwLG89NDAwLGksZCxmPVtbMywzXV0scz17Mzc6MSwzODoxLDM5OjEsNDA6MX0sYyxoPWYscD1mWzBdLHU9IiMwMDAiLHY9InJlZCIsZz0oZSx0LGw9dSxyPW4sYT1uKT0+e2suZmlsbFN0eWxlPWwsay5maWxsUmVjdChlLHQscixhKX0sYj0oZSx0LGw9dCxyPSJjZW50ZXIiKT0+e2suZmlsbFN0eWxlPXUsay50ZXh0QWxpZ249cixrLmZpbGxUZXh0KGUsdCxsKX0sbT0oKT0+bC5mbG9vcig5KmwucmFuZG9tKCkpLHc9KCk9PntpZihpKXtsZXRbZSx0XT1mWzBdLGw9ZStjJTIscj10KyhjLTEpJTIsYT0oW2UsdF0pPT5lPT1sJiZ0PT1yO2lmKGYucG9wKCksbDwwfHw5PGx8fHI8MHx8OTxyfHxmLnNvbWUoYSkpcmV0dXJuIE0oKTtmPVtbbCxyXSwuLi5mXSxhKHApJiYoZi5wdXNoKFsuLi5mW2RdXSksZCsrLHA9W20oKSxtKCldKSxnKDAsMCwidGFuIixvLG8pO2ZvcihbeCx5XW9mIGYpZyh4Km4seSpuKTtnKHBbMF0qbixwWzFdKm4sdiksYihkLDksMzAsImxlZnQiKX19LE09KCk9PntpPTAsZygwLDAsdixvLG8pLGIoIjooIixvLzIpfSxTPSgpPT57aT0xLGY9Wy4uLmhdLGM9MixkPTB9LGs9KHQuaW5uZXJIVE1MPXIsYS5nZXRDb250ZXh0KCIyZCIpKTthLmhlaWdodD1hLndpZHRoPW8say5mb250PSIzMHB4IGYiLGUuYWRkRXZlbnRMaXN0ZW5lcigia2V5dXAiLCh7d2hpY2g6ZX0pPT57c1tlXT9jPWUtMzg6MzIhPWV8fGl8fFMoKX0pLHNldEludGVydmFsKHcsbyk7%22))%3C%2Fscript%3E```

<p align="center">
  <img src="./snake1.jpg" width="200" />
  <img src="./snake2.jpg" width="200" /> 
</p>

## Code golfing

I'm super happy with some of the code golfing techniques I've used in this code and have tried to leave comments explaining most of them. I'm especially proud of:

```js
//...
headings = {37:1,38:1,39:1,40:1},
// ...
update = () => {
  if (!alive) return;
  let [headX, headY] = snake[0],
    nextX = headX + (heading)%2,
    nextY = headY + (heading-1)%2,
    collides = ([x,y])=> (x ==nextX&&y==nextY);
//...
d.addEventListener("keyup", ({ which: w }) => {
  headings[w] ? (heading=w-38) : w==32 && !alive && reset();
});
```

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