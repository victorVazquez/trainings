var global = 1;

function f() {
  var local = 2;
  global ++;
  return global;
}

console.log('f()');
console.log(f());
console.log(f());
console.log(f());
console.log(f());

console.log('global');
console.log(global);

// console.log('local');
// console.log(local);

function g() {
  localSinVar = 50;
}

console.clear();
// console.log('Local sin var');
// console.log(localSinVar);

g();

// console.log('Local sin var');
// console.log(localSinVar);

console.clear();

var a = 123;
function h() {
  console.log(a);
  var a = 1;
  console.log(a);
}
h();
