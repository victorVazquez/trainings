/*******************************************
  Array Literal
*******************************************/
// Los arrays tambien son objetos
// Se pueden crear mediante la funcion constructora incorporada Array()
// pero tambien tienen una notacion literal la cual es mas simple y preferida
// La sintaxis literal para Array es preferida porque
// es simple, directa y elegante

// Array mediante constructor Array()
// ALERTA: Antipatron
var a = new Array('huitzi', 'wuitzi', 'araña');

// El mismo array mediante notacion literal
var b = ['huitzi', 'wuitzi', 'araña'];

console.log('a: ', a);
console.log('b: ', b);
console.log('------------------------');

console.log('typeof a: ', typeof a); // 'object' porque es objeto
console.log('typeof b: ', typeof b); // Sigue siendo 'object' aunque sea creado mediante literal
console.log('------------------------');

console.log('a.constructor: ', a.constructor); // function Array(){ [native code] }
console.log('b.constructor: ', b.constructor); // function Array(){ [native code] }
console.log('a.constructor === Array: ', a.constructor === Array); // true
console.log('b.constructor === Array: ', b.constructor === Array); // true
console.log('------------------------');

console.log('a == b: ', a == b);
console.log('a === b: ', a === b);

/*
  Trampas del constructor Array()
*/
// Cuando se pasa un numero entero al constructor Array()
// no lo convierte en el primer valor del array
// sino que setea la longitud del array
console.clear();

// Array con notacion literal
var c = [3];

// Array mediante constructores
var d = new Array(3);

console.log('c.length: ', c.length);
console.log('c[0]: ', c[0]);
console.log('typeof c[0]: ', typeof c[0]);
console.log('------------------------');

console.log('d.length: ', d.length);
console.log('d[0]: ', d[0]);
console.log('typeof d[0]: ', typeof d[0]);
console.log('------------------------');

// Y se pone peor cuando se agregan numeros de coma flotante
// var e = new Array(3.1416); // Lanza error por longitud de array invalida
var e = new Array(1416).join('01'); // Uso de constructor inteligente para repetir strings :O

console.log('typeof e: ', typeof e);
console.log('e: ', e); // Uncaught RangeError: Invalid array length

/*
  Comprobar si hay Array-ness
*/
// El operador typeof devuelve 'object'
// instanceof funcional mal con algunas versiones de IE
// El método Array.isArray() de ES5 devuelve true si el argumento pasado es array
console.clear();

var f = [];
var g = {};

console.log('Array.isArray(f): ', Array.isArray(f));
console.log('Array.isArray(g): ', Array.isArray(g));
