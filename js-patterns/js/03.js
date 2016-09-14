/*
Funciones Constructoras Personalizadas

 Ademas del patron literal de objeto y las funciones Constructoras predefinidas, es posible crear objetos usando funciones
 constructoras Personalizadas, como sigue:

*/
var Person = function (name) {
  this.name = name;
  this.say = function(){
    console.log('Hi, my name is ' + this.name);
  };
};
var adam = new Person('Adam');
adam.say();

/*
Cuando se invoca la funcion constructora con new, dentro de la funcion pasa lo siguiente:

var Person = function(name){
  // Un obj vacio es creado (usando literal de objeto) y se referencia mediante la var this,
  // heredando el prototipo de la funcion
  var this = {};

  // Las propiedades y objetos son agregados al obj referenciado por this
  this.name = name;
  this.say = function(){
    console.log('Hi, my name is ' + this.name);
  };

  // El nuevo objeto creado referenciado por this es devuelto al final
  // de manera implicita
  return this;

};


Cada vez que se llama new Person(), una nueva función se crea en memoria.
Esto es definitivamente ineficiente, porque el metodo say() no cambia
de una instancia a la siguiente

Para mejorar esta opción, debemos agregar los métodos que hagan lo mismo
para todos los objetos al prototipo de Person

Así que como regla general:
Todos los miembros reutilizables,tales como los métodos deberían ir al prototipo

*/
Person.prototype.sayName = function () {
  console.log('Hola me llamo ' + this.name);
};

var jorge = new Person('Jorge');
jorge.say();
jorge.sayName();

/*
  Valores devueltos por el Constructor
  Cuando son invocadas con new, una función constructora siempre devuelve un objeto
  De manera predeterminada ese objeto es this
  Si no se agregan propiedades a this, this devuelve un objeto vacio
  Pero tambien es posible devolver cualquier objeto que se desee

*/
function Objeto(name){
  var that = {
    sayName: function(){
      return 'Hi my name is that';
    }
  };

  that.name = name;

  Objeto.prototype.play = function () {
    return 'We going to play';
  };

  return that;
  // return this;
};

var o = new Objeto('obj');
console.clear();
console.log(o);
console.log(o.name);
console.log(o.sayName());
console.log('----------------------');

Objeto.prototype.sleep = function(){
  return 'Lets go to sleep ' + this.name;
};

var a = new Objeto('Object A');

console.log(a);
console.log(a.sayName());
console.log('------------------------------------');
console.log(Objeto);
console.log('------------------------------------');
console.log('Objeto.prototype.play()');
console.log(Objeto.prototype.play());
console.log('Objeto.play()');
// console.log(Objeto.play());
// console.log(a.play()); // Uncaught typeError : a.play is not a function
// console.log(a.prototype.play()); // Uncaught typeError : Cannot read property 'play' of undefined


var c = new Objeto('object-c');
console.clear();
console.log(c);
console.log('---------------------------');
// console.log(c.sleep()); // c.sleep is not a function

var Thing = function(){

};

Thing.prototype.sleep = function(){
  return 'The ' + this.constructor.name + ' go to sleep';
};
var thingOne = new Thing();

console.clear();
console.log(thingOne);
console.log('--------------------------');
console.log(thingOne.constructor.name);
console.log(thingOne.prototype);
console.log(thingOne.sleep());

function Thinking(name){
  this.name = name;
  this.args = arguments;
}

Thinking.prototype.makeRain = function(){
  return 'Making rain with ' + this.constructor.name + ' baby ' + this.name;
};

var think = new Thinking('Vic');
console.clear();
console.log(think);
console.log('-------------------');
console.log(think.makeRain());
console.log('-------------------');
console.log(think.constructor);
var jode = think.args.callee('Vic');
console.log('window.think.name');
console.log(window.think.name);
