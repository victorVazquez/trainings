// "use strict"; // Uncaught SyntaxError: Delete of an unqualified identifier in strict mode.

/*********************************************************************************************************
// Cada variable global que creamos se convierte en una propiedad del objeto global
*********************************************************************************************************/
global = "variable global";
console.log('global');
console.log(global);
console.log('----------------------');

console.log('window.global');
console.log(window.global);
console.log('----------------------');

console.log('window["global"]');
console.log(window["global"]);
console.log('----------------------');

console.log('this.global');
console.log(this.global);
console.log('----------------------');

/*********************************************************************************************************
// Otro antipatron que crea globales implicadas es encadenar asignaciones
// como parate de una declaracion var
*********************************************************************************************************/
var a = b = 0;

console.log('a');
console.log(a);
console.log('----------------------');

console.log('b');
console.log(b);
console.log('----------------------');

console.log('window.a');
console.log(window.a);
console.log('----------------------');

console.log('window.b');
console.log(window.b);
console.log('----------------------');

function foo() {
  var x = y = 10; // y se eleva como variable global
  console.clear();

  console.log('x');
  console.log(x);
  console.log('----------------------');

  console.log('y');
  console.log(y);
  console.log('----------------------');
}

foo();


// console.log('x');
// console.log(x);
// console.log('----------------------');

console.log('y');
console.log(y);
console.log('----------------------');

/*********************************************************************************************************
// Globales creadas con var (aquellas creadas in el programa fuera de cualquier funcion)
// NO pueden ser borradas

// Globales implicadas creadas sin var (independientemente si fueron creadas dentro de funciones)
// SI pueden ser borradas
*********************************************************************************************************/
console.clear();

var global_var = 1;
global_novar = 2;
(function () {
  // "use strict"; // Uncaught ReferenceError: global_fromfunc is not defined

  global_fromfunc = 3;
}());

// Intentando borrar
delete global_var;
console.log('delete global_var');
console.log(delete global_var);
console.log('----------------------');

delete global_novar;
console.log('delete global_novar');
console.log(delete global_novar);
console.log('----------------------');

delete global_fromfunc;
console.log('delete global_fromfunc');
console.log(delete global_fromfunc);
console.log('----------------------');


// Probando el borrado
console.log('typeof global_var');
console.log(typeof global_var);
console.log('----------------------');

console.log('typeof global_novar');
console.log(typeof global_novar);
console.log('----------------------');

console.log('typeof global_fromfunc');
console.log(typeof global_fromfunc);
console.log('----------------------');


/*********************************************************************************************************
Accediendo al objeto Global
// En los navegadores el objeto global es accesible desde cualquier parte del código mediante la
// propiedad Window
**********************************************************************************************************/
console.clear();
console.log('this');
console.log(this);
console.log('----------------------');
// Si necesitamos acceder a la variable global sin hardcodear el identificador window
// se puede hacer lo sig desde cualquier nivel de ambito de funciones anidadas
var global = (function(){
  return this;
}());

function fun() {
  console.log('global desde dentro de funcion');
  console.log(global);
  console.log('----------------------');
}

console.log('global');
console.log(global);
console.log('----------------------');

fun();

// A partir de ES5 es necesario adoptar otro patron cuando se utilice "use strict"
// Por ejemplo envolver el codigo en una funcion inmediata y luego, desde el ambito global
// pasar una referencia a this como un parametro de dicha funcion


/*********************************************************************************************************
Single Var Pattern - Patron de variable sencilla
// Usar una sola sentencia var al principio de las funciones
**********************************************************************************************************/
function singleVar() {
  var a = 1,
      b = 2,
      sum = a + b,
      myObj = {},
      i,
      j;

  // Cuerpo de la funcion
}

/*********************************************************************************************************
Elevamiento: Un problema con variables dispersas
// JS permite declarar multiples sentencias var en cualquier lugar de una funcion
// y luego actuan como su fueran declaradas al principio de la función
// Este comportamiento es conocido como Hoisting o elevamiento
**********************************************************************************************************/
console.clear();
// Antipatron
myname = 'global';
function functionName() {
  console.log('myname');
  console.log(myname);
  console.log('----------------------');

  var myname = 'local';
  console.log('var myname');
  console.log(myname);
  console.log('----------------------');
}
functionName();

/*********************************************************************************************************
Bucles For
// Este patron consiste en cachear la longitud del array (o coleccion) sobre la que se esta iterando
// antes de hacer la comprobación
*********************************************************************************************************/
var array = [];
console.clear();
for (var i = 0, max = array.length; i < max; i++) {
  // array[i];
}

/*********************************************************************************************************
Bucles For-In
// Se recomienda usa este patron para iterar sobre objetos que no sean arrays
// debido a que podrian ocacionar errores si el objeto array ya ha sido aumentado con
// funcionalidad personalizada
*********************************************************************************************************/
var man = {
  hands: 2,
  legs: 2,
  head: 1
};
var obj = man;

if (typeof Object.prototype.clone === 'undefined') {
  Object.prototype.clone = function(){};
}

console.clear();

// Antipatron muestra clone: function
for (var o in obj) {
  console.log("o, ':', obj[o]");
  console.log(o, ':', obj[o] );
}

console.log('************************************');

for (var i in man) {
  if (man.hasOwnProperty(i)) {
    console.log("i, ':', man[i]");
    console.log(i, ':', man[i] );
  }
}

console.log('************************************');

for (var u in obj) {
  if (obj.hasOwnProperty(i)) {
    console.log("u, ':', obj[u]");
    console.log(u, ':', obj[u] );
  }else{
    console.log(u, ':', obj[u]);
  }
}
console.log('*******************************');
console.log('obj === man');
console.log(obj === man);

/*********************************************************************************************************
hasOwnProperty
// Un patron para usar hasOwnProperty() es llamar ese metodo fuera de
// Object.prototype
*********************************************************************************************************/
console.clear();
for (var a in man) {
  if (Object.prototype.hasOwnProperty.call(man, a)) {
    console.log(a, ':', man[i]);
  }
}
console.log('************************************');

// El beneficio de usar hasOwnProperty, es que se puede evitar colision de nombres
// en caso de que el objeto man haya redefinido hasOwnProperty
var b,
    hasOwn = Object.prototype.hasOwnProperty;
for (b in man) {
  if (hasOwn.call(man, b)) {
    console.log(b, ':', man[b]);
  }
}

// Una variacion en el formato ayuda a que se lea como un pensamiento completo
// desafortunadamente JSLint no pasa
/*
var b,
    hasOwn = Object.prototype.hasOwnProperty;
for (b in man) if (hasOwn.call(man, b)) {
@  console.log(b, ':', man[b]);
}
*/
