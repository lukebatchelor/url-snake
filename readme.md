# URL Snake

A little experiement with seeing how complex of an app I can store entirely within a url.

The basic idea revolves around the fact that a data urls can define their encoding as text/html. 

i.e `data:text/html;charset=utf-8,hello%20world` is a valid url (try pasting it in your url bar). 

So is
`data:text/html;charset=utf-8,%3Cstyle%3E%20*%20%7B%20color%3A%20red%3B%20%7D%3C%2Fstyle%3EHello%20world!`. 

Aditionally, so is `data:text/html;charset=utf-8,%3Cstyle%3E%20*%20%7B%20color%3A%20red%3B%20%7D%3C%2Fstyle%3EHello%20world!%3Cscript%3Ealert(%22hello%20again!%22)%3B%3C%2Fscript%3E`.

So, if we can put html, css and js in a url and have that render a valid html page, how much of a page could we create?

## Result

I've come up with a ~1033~ ~852~ ~799~ 713 byte solution that is a fully playable game of snake.

> ```let e=document.body,t="Space: start/reset. Arrows: Move<div><canvas id=a><style>#a{border:solid}*{background:tan}</style>",r=40,n=400,o,d=[[4,3]],s=d[0],c="#000",p=(e="red",t=n,a=0,l=a)=>{C[f="fillStyle"]=e,C.fillRect(a*r,l*r,t,t)},h=(e,t=n/2,a=t,l="center")=>{C[f]=c,C.textAlign=l,C.fillText(e,t,a)};e.innerHTML=t,C=a.getContext`2d`,a.height=a.width=n,C.font="30px f",e.onkeyup=({which:e})=>{36<e&&e<41?H=e-38:32!=e||o||(o=1,d=[[4,3]],H=2,S=0)},setInterval(i=>{if(o){let[e,t]=d[0],a=e+H%2,l=t+(H-1)%2,n=([e,t])=>e==a&&t==l;if(d.pop(),a<0||9<a||l<0||9<l||d.some(n))return o=0,p(),h`:(`;d=[[a,l],...d],n(s)&&(d[++S]=d[S-1],s=[(D=new Date)%10,D*S%10]),p`tan`,d.map(e=>p(c,r,...e)),p(i,r,...s),h(S,9,30,"left")}},n);```

Encoded as a url it is 1152 bytes long:

> ```data:text/html;charset=utf-8,%3Cbody%3E%3Cscript%3Eeval(atob(%22bGV0IGU9ZG9jdW1lbnQuYm9keSx0PSJTcGFjZTogc3RhcnQvcmVzZXQuIEFycm93czogTW92ZTxkaXY+PGNhbnZhcyBpZD1hPjxzdHlsZT4jYXtib3JkZXI6c29saWR9KntiYWNrZ3JvdW5kOnRhbn08L3N0eWxlPiIscj00MCxuPTQwMCxvLGQ9W1s0LDNdXSxzPWRbMF0sYz0iIzAwMCIscD0oZT0icmVkIix0PW4sYT0wLGw9YSk9PntDW2Y9ImZpbGxTdHlsZSJdPWUsQy5maWxsUmVjdChhKnIsbCpyLHQsdCl9LGg9KGUsdD1uLzIsYT10LGw9ImNlbnRlciIpPT57Q1tmXT1jLEMudGV4dEFsaWduPWwsQy5maWxsVGV4dChlLHQsYSl9O2UuaW5uZXJIVE1MPXQsQz1hLmdldENvbnRleHRgMmRgLGEuaGVpZ2h0PWEud2lkdGg9bixDLmZvbnQ9IjMwcHggZiIsZS5vbmtleXVwPSh7d2hpY2g6ZX0pPT57MzY8ZSYmZTw0MT9IPWUtMzg6MzIhPWV8fG98fChvPTEsZD1bWzQsM11dLEg9MixTPTApfSxzZXRJbnRlcnZhbChpPT57aWYobyl7bGV0W2UsdF09ZFswXSxhPWUrSCUyLGw9dCsoSC0xKSUyLG49KFtlLHRdKT0+ZT09YSYmdD09bDtpZihkLnBvcCgpLGE8MHx8OTxhfHxsPDB8fDk8bHx8ZC5zb21lKG4pKXJldHVybiBvPTAscCgpLGhgOihgO2Q9W1thLGxdLC4uLmRdLG4ocykmJihkWysrU109ZFtTLTFdLHM9WyhEPW5ldyBEYXRlKSUxMCxEKlMlMTBdKSxwYHRhbmAsZC5tYXAoZT0+cChjLHIsLi4uZSkpLHAoaSxyLC4uLnMpLGgoUyw5LDMwLCJsZWZ0Iil9fSxuKTs=%22))%3C%2Fscript%3E```

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
