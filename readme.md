# URL Snake

A little experiement with seeing how complex of an app I can store entirely within a url.

The basic idea revolves around the fact that a data urls can define their encoding as text/html. 

i.e `data:text/html;charset=utf-8,hello%20world` is a valid url (try pasting it in your url bar). 

So is
`data:text/html;charset=utf-8,%3Cstyle%3E%20*%20%7B%20color%3A%20red%3B%20%7D%3C%2Fstyle%3EHello%20world!`. 

Aditionally, so is `data:text/html;charset=utf-8,%3Cstyle%3E%20*%20%7B%20color%3A%20red%3B%20%7D%3C%2Fstyle%3EHello%20world!%3Cscript%3Ealert(%22hello%20again!%22)%3B%3C%2Fscript%3E`.

So, if we can put html, css and js in a url and have that render a valid html page, how much of a page could we create?

## Result

I've come up with a ~1033~ ~852~ ~799~ 728 byte solution that is a fully playable game of snake.

> ```let e=document.body,t="Space: start/reset. Arrows: Move<div><canvas id=a><style>#a{border:solid}*{background:tan}</style>",r=40,o=400,i,d,s=[[4,3]],c,h=s[0],p="#000",g,u=(e="red",t=o,l=0,n=l)=>{g[f="fillStyle"]=e,g.fillRect(l*r,n*r,t,t)},v=(e,t=o/2,l=t,n="center")=>{g[f]=p,g.textAlign=n,g.fillText(e,t,l)};e.innerHTML=t,g=a.getContext`2d`,a.height=a.width=o,g.font="30px f",e.onkeyup=({which:e})=>{36<e&&e<41?c=e-38:32!=e||i||(i=1,s=[[4,3]],c=2,d=0)},setInterval(o=>{if(i){let[e,t]=s[0],l=e+c%2,n=t+(c-1)%2,a=([e,t])=>e==l&&t==n;if(s.pop(),l<0||9<l||n<0||9<n||s.some(a))return i=0,u(),v`:(`;s=[[l,n],...s],a(h)&&(s[++d]=s[d-1],h=[(D=new Date)%10,D%11%10]),u`tan`;for([x,y]of s)u(p,r,x,y);u(o,r,h[0],h[1]),v(d,9,30,"left")}},o);```

Encoded as a url it is 1152 bytes long:

> ```data:text/html;charset=utf-8,%3Cbody%3E%3Cscript%3Eeval(atob(%22bGV0IGU9ZG9jdW1lbnQuYm9keSx0PSJTcGFjZTogc3RhcnQvcmVzZXQuIEFycm93czogTW92ZTxkaXY+PGNhbnZhcyBpZD1hPjxzdHlsZT4jYXtib3JkZXI6c29saWR9KntiYWNrZ3JvdW5kOnRhbn08L3N0eWxlPiIscj00MCxvPTQwMCxpLGQscz1bWzQsM11dLGMsaD1zWzBdLHA9IiMwMDAiLGcsdT0oZT0icmVkIix0PW8sbD0wLG49bCk9PntnW2Y9ImZpbGxTdHlsZSJdPWUsZy5maWxsUmVjdChsKnIsbipyLHQsdCl9LHY9KGUsdD1vLzIsbD10LG49ImNlbnRlciIpPT57Z1tmXT1wLGcudGV4dEFsaWduPW4sZy5maWxsVGV4dChlLHQsbCl9O2UuaW5uZXJIVE1MPXQsZz1hLmdldENvbnRleHRgMmRgLGEuaGVpZ2h0PWEud2lkdGg9byxnLmZvbnQ9IjMwcHggZiIsZS5vbmtleXVwPSh7d2hpY2g6ZX0pPT57MzY8ZSYmZTw0MT9jPWUtMzg6MzIhPWV8fGl8fChpPTEscz1bWzQsM11dLGM9MixkPTApfSxzZXRJbnRlcnZhbChvPT57aWYoaSl7bGV0W2UsdF09c1swXSxsPWUrYyUyLG49dCsoYy0xKSUyLGE9KFtlLHRdKT0+ZT09bCYmdD09bjtpZihzLnBvcCgpLGw8MHx8OTxsfHxuPDB8fDk8bnx8cy5zb21lKGEpKXJldHVybiBpPTAsdSgpLHZgOihgO3M9W1tsLG5dLC4uLnNdLGEoaCkmJihzWysrZF09c1tkLTFdLGg9WyhEPW5ldyBEYXRlKSUxMCxEJTExJTEwXSksdWB0YW5gO2ZvcihbeCx5XW9mIHMpdShwLHIseCx5KTt1KG8scixoWzBdLGhbMV0pLHYoZCw5LDMwLCJsZWZ0Iil9fSxvKTs=%22))%3C%2Fscript%3E```

<p align="center">
  <img src="./snake1.jpg" width="200" />
  <img src="./snake2.jpg" width="200" /> 
</p>

You can paste that url into your browsers address bar, or checkout the minified html running [here](https://url-snake.netlify.app/golf.html) (or [here](https://url-snake.netlify.app) for a mobile compatible version)

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
d.onkeyup = ({ which: w }) => {
  headings[w] ? (heading=w-38) : w==32 && !alive && reset();
};
```

If you want to just see the annotated golf'd code, take a look at [golf/dev.html](golf/dev.html)

## Development

This repo contains two sets of code, one for a mobile compatible version and one just for maximum code golfing

```
/
  run.js         - node script that generates minified files and outputs data urls
  dev.html       - dev file for mobile snake
  index.html     - minified version of mobile snake
  /golf
    dev.html     - dev file for code golf'd snake
    index.html   - minified version of golf'd snake
```

To develop on either one you can run the `yarn install` to install the dev dependencies and then `yarn build` to build both versions. This will output a dist directory like so

```
/dist
  index.html    - minified version of compatible snake
  golf.html  - minified version of golf'd snake
```

and also update both `index.html` files.

### Building a single file

If developing on a single file, use the `run.js` script directly from whichever dir you are working on.

```
$ node run.js
data:text/html;charset=utf-8,%3Cbody%3E%3Cscript%3Eeval(atob(%22bGV0IGU9ZG9jdW1lbnQsdD1lLmJvZHksbD1NYXRoLHI9IlNwYWNlOiBzdGFydC9yZXNldC4gQXJyb3dzOiB...

$ cd golf
$ node ../run.js
data:text/html;charset=utf-8,%3Cbody%3E%3Cscript%3Eeval(atob(%22bGV0IGU9ZG9jdW1lbnQsdD1lLmJvZHksbD1NYXRoLHI9IlNwYWNlOiBzdGFydC9yZXNldC4gQXJyb3dzOiB...
```

To get more debug information, add the `DEBUG` flag

```
$DEBUG=1 node run.js
{
  js: 'let e=document,t=e.body,l=Math,r="Space: start/reset. Arrows: Move<div><canvas id=a><style>#a{border:solid}*{background:tan}</style>",n=40,o=400,i,d,f=[[3,3]],s= ...',
  jsLength: 852,
  minifiedLength: 852,
  encodedLength: 1136,
  minifySaved: 0,
  urlLength: 1220
}
data:text/html;charset=utf-8,%3Cbody%3E%3Cscript%3Eeval(atob(%22bGV0IGU9ZG9jdW1lbnQsdD1lLmJvZHksbD1NYXRoLHI9IlNwYWNlOiBzdGFydC9yZXNldC4gQXJyb3dzOiBNb3ZlPGRpdj48Y2FudmFz ...
```

To automatically open the data url in chrome, you can use xargs:

```
$ node run.js | xargs open -a "Google Chrome"
```
