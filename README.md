# babel-plugin-transform-curry

Currying placeholders for JS

```js
var add = (x,y)=>x+y;
add(2,3); // 5
add(__,3); // (x) -> add(x,3)
add(2,__); // (y) -> add(2,y)
add(__,__); // (x,y) -> add(x,y)
```

## Installation

```sh
$ npm install babel-plugin-transform-curry
```

## Usage
```js
var add = (x,y)=>x+y;
var mult = (x,y)=>x*y;

var x = [1,2,3,4,5];

// you can to it like this
var z = x.map((v)=>add(v,2)).map((v)=>mult(3,v))
console.log(z)

// or you can reuse functions with currying placeholders
var y = x.map(add(__,2)).map(mult(3,__))
console.log(y)
```