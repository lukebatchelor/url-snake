# URL Snake

A little experiement with seeing how complex of an app I can store entirely within a url.

The basic idea revolves around the fact that a data urls can define their encoding as text/html. 

i.e `data:text/html;charset=utf-8,hello%20world` is a valid url (try pasting it in your url bar). 

So is
`data:text/html;charset=utf-8,%3Cstyle%3E%20*%20%7B%20color%3A%20red%3B%20%7D%3C%2Fstyle%3EHello%20world!`. 

Aditionally, so is `data:text/html;charset=utf-8,%3Cstyle%3E%20*%20%7B%20color%3A%20red%3B%20%7D%3C%2Fstyle%3EHello%20world!%3Cscript%3Ealert(%22hello%20again!%22)%3B%3C%2Fscript%3E`.

So, if we can put html, css and js in a url and have that render a valid html page, how much of a page could we create?

## Result

I've come up with a ~1033~ ~852~ 799 byte solution that is a fully playable game of snake.

> ```let e=document,t=e.body,l=Math,o="Space: start/reset. Arrows: Move<div><canvas id=a><style>#a{border:solid}*{background:tan}</style>",n=40,i=400,r,d,s=[[3,3]],c={37:1,38:1,39:1,40:1},h,p=s,u=s[0],g="#000",m,v=(e=g,t=i,o=0,r=o)=>{m[f="fillStyle"]=e,m.fillRect(o*n,r*n,t,t)},b=(e,t=i/2,o=t,r="center")=>{m[f]=g,m.textAlign=r,m.fillText(e,t,o)},w=e=>{if(r){let[e,t]=s[0],o=e+h%2,r=t+(h-1)%2,a=([e,t])=>e==o&&t==r;if(s.pop(),o<0||9<o||r<0||9<r||s.some(a))return M();s=[[o,r],...s],a(u)&&(s.push([...s[d++]]),u=u.map(e=>l.floor(9*l.random()))),v`tan`;for([x,y]of s)v(g,n,x,y);v("red",n,u[0],u[1]),b(d,9,30,"left")}},M=e=>{r=0,v`red`,b`:(`},k=e=>{r=1,s=[...p],h=2,d=0};t.innerHTML=o,m=a.getContext`2d`,a.height=a.width=i,m.font="30px f",e.onkeyup=({which:e})=>{c[e]?h=e-38:32!=e||r||k()},setInterval(w,i);```

Encoded as a url it is 1152 bytes long:

> ```data:text/html;charset=utf-8,%3Cbody%3E%3Cscript%3Eeval(atob(%22bGV0IGU9ZG9jdW1lbnQsdD1lLmJvZHksbD1NYXRoLG89IlNwYWNlOiBzdGFydC9yZXNldC4gQXJyb3dzOiBNb3ZlPGRpdj48Y2FudmFzIGlkPWE+PHN0eWxlPiNhe2JvcmRlcjpzb2xpZH0qe2JhY2tncm91bmQ6dGFufTwvc3R5bGU+IixuPTQwLGk9NDAwLHIsZCxzPVtbMywzXV0sYz17Mzc6MSwzODoxLDM5OjEsNDA6MX0saCxwPXMsdT1zWzBdLGc9IiMwMDAiLG0sdj0oZT1nLHQ9aSxvPTAscj1vKT0+e21bZj0iZmlsbFN0eWxlIl09ZSxtLmZpbGxSZWN0KG8qbixyKm4sdCx0KX0sYj0oZSx0PWkvMixvPXQscj0iY2VudGVyIik9PnttW2ZdPWcsbS50ZXh0QWxpZ249cixtLmZpbGxUZXh0KGUsdCxvKX0sdz1lPT57aWYocil7bGV0W2UsdF09c1swXSxvPWUraCUyLHI9dCsoaC0xKSUyLGE9KFtlLHRdKT0+ZT09byYmdD09cjtpZihzLnBvcCgpLG88MHx8OTxvfHxyPDB8fDk8cnx8cy5zb21lKGEpKXJldHVybiBNKCk7cz1bW28scl0sLi4uc10sYSh1KSYmKHMucHVzaChbLi4uc1tkKytdXSksdT11Lm1hcChlPT5sLmZsb29yKDkqbC5yYW5kb20oKSkpKSx2YHRhbmA7Zm9yKFt4LHldb2Ygcyl2KGcsbix4LHkpO3YoJ3JlZCcsbix1WzBdLHVbMV0pLGIoZCw5LDMwLCJsZWZ0Iil9fSxNPWU9PntyPTAsdmByZWRgLGJgOihgfSxrPWU9PntyPTEscz1bLi4ucF0saD0yLGQ9MH07dC5pbm5lckhUTUw9byxtPWEuZ2V0Q29udGV4dGAyZGAsYS5oZWlnaHQ9YS53aWR0aD1pLG0uZm9udD0iMzBweCBmIixlLm9ua2V5dXA9KHt3aGljaDplfSk9PntjW2VdP2g9ZS0zODozMiE9ZXx8cnx8aygpfSxzZXRJbnRlcnZhbCh3LGkpOw==%22))%3C%2Fscript%3E```

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
