function f() {
  return 1;
}
console.log(f());
console.log(typeof f);


console.clear();
var suma = function (a,b) {
  return a + b;
}

var add = suma;
console.log('add');
console.log(add);
delete suma;
console.log('delete suma');
console.log('add');
console.log(add);
console.log('typeof suma');
console.log(typeof suma);
console.log('typeof add');
console.log(typeof add);

console.clear();

"test";
[1,2,3];
undefined;
null;
1;

// callback functions
function invoke_and_add( a,b ) {
  return a() + b();
}

function one() {
  return 1;
}
function two() {
  return 2;
}

console.log('invoke_and_add(one,two)');
console.log(invoke_and_add(one,two));

console.log('Pasar funcion anonima como parametro');
console.log( 'invoke_and_add(function(){return 5;}, function(){return 25;})' );
console.log( invoke_and_add(function(){return 5;}, function(){return 25;}) );

console.clear();

function multiplyByTwo(a,b,c) {
  var i, arr = [];
  for (var i = 0; i < 3; i++) {
    arr[i] = arguments[i] * 2;
  }
  return arr;
}

function addOne(a) {
  return a + 1;
}

console.log('multiplyByTwo(1,2,3)');
console.log(multiplyByTwo(1,2,3));

console.log('addOne(100)');
console.log(addOne(100));

var myArr = [];
myArr = multiplyByTwo(10,20,30);
console.log('myArr');
console.log(myArr);

for (var i = 0; i < 3; i++) {
  myArr[i] = addOne(myArr[i]);
}
console.log('myArr');
console.log(myArr);

function multiplyByTwoCallback(a,b,c, callback) {
  var i, arr = [];
  for (var i = 0; i < 3; i++) {
    arr[i] = callback(arguments[i] * 2);
  }
  return arr;
}

console.log('Optimizando las llamadas multiplyByTwo y addOne mediante funcion de callback');
console.log('multiplyByTwoCallback(1,2,3,addOne)');
console.log(multiplyByTwoCallback(1,2,3,addOne));
console.log(multiplyByTwoCallback(10,20,30,addOne));
console.log('Podemos usar una funcion anonima para ahorrarnos una variable global');
console.log('multiplyByTwoCallback(10,20,30, function(a){return a + 1;})');
console.log(multiplyByTwoCallback(10,20,30, function(a){return a + 1;}));
