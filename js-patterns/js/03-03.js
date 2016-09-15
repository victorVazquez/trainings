/*
  Los constructores siguen siendo sólo funciones,
  pero invocadas mediante new
*/

// Cuando se invoca el constructor sin new,
// se crea una nueva propiedad del objeto global

// Constructor
function Waffle() {
  this.tastes = 'Yummy';
}

// Un objeto nuevo
var w = new Waffle();
console.log('typeof w');
console.log(typeof w);
console.log('w.tastes');
console.log(w.tastes);
console.log('--------------------');
// Antipatron (Olvidando new)
var f = Waffle();
console.log('typeof f');
console.log(typeof f);
console.log('window.tastes');
console.log(window.tastes);
console.log('f.tastes');
// console.log(f.tastes);

/*
  Convencion de nombrado
  Primer letra mayuscula para nombres de constructores (PersonInterest)
  Primer letra minuscula para nombres de funciones y métodos (personInterest)
*/


/*
  Usando that
  Para asegurar que un constructor siempre se comporte como constructor,
  En lugar de agregar todos los miembros a this, puedes agregarlos a that (por ejemplo)
  y luego devolver that
*/
function ObjectConstructor(name) {
  var obj = {};
  obj.name = name;
  obj.tastes = 'Yummy';

  obj.sayName = function(){
    return 'Hello, my name is ' + obj.name;
  };

  return obj;
}

var o = new ObjectConstructor('Josecito de Acamica');
console.clear();
console.log('o');
console.log(o);
console.log('---------------------------');
console.log('o.name');
console.log(o.name);
console.log('---------------------------');
console.log('o.sayName()');
console.log(o.sayName());

// Para objetos mas simples no es necesario that
// Es posible devolverlos desde una literal
console.clear();

function Car(brand){
  this.marca = 'Mi chulo ' + brand;

  return {
    all: this, // this devuelve el objeto Car como literal
    brand: brand,
    mi_marca: this.marca
  };
  // cuando se usa return diferente a literal de objeto this
  // Ya no devuelve de manera automatica this

}

var volvo = new Car('Volvo');
console.log('volvo');
console.log(volvo);
console.log('----------------------------');
console.log('volvo.brand');
console.log(volvo.brand);
console.log('----------------------------');
console.log('volvo.marca');
console.log(volvo.marca);
console.log('----------------------------');
console.log('volvo.mi_marca');
console.log(volvo.mi_marca);
console.log('----------------------------');
console.log('volvo.all');
console.log(volvo.all);
console.log('----------------------------');
console.log('volvo.all.marca');
console.log(volvo.all.marca);

// Usando cualquiera de las implementaciones anteriores
// siempre devolvera un objeto, independientemente de como sea llamado

var first_car = new Car('Mazda'),
    second_car = Car('Ford');

var third_car = Car('Nissan'),
    fourth_car = new Car('Chrevrolet');

console.clear();
console.log('first_car');
console.log(first_car);
console.log(first_car.brand);
console.log('-------------------------');
console.log('second_car');
console.log(second_car);
console.log(second_car.brand);
console.log('-------------------------');
console.log('third_car');
console.log(third_car);
console.log(third_car.brand);
console.log('-------------------------');
console.log('fourth_car');
console.log(fourth_car);
console.log(fourth_car.brand);

// El problema con este patron es que el vinculo a prototype se pierde
// Asi que cualquier miembro qye se agregue al prototipo de Car()
// no estara disponible a los objetos

Car.prototype.drive = function(){
  return 'broooooom!!!!';
};

// console.clear();
console.log('************************************');
console.log('first_car.drive()');
// console.log(first_car.drive()); // first_car.drive is not a function


// Para enfrentar el problema del patron anterior y tener las propiedades
// del prototipo disponibles a los obj instanciados considera lo siguiente:

function Vehicle(brand){
  // if (!(this instanceof Vehicle)) {
  //   return new Vehicle(brand); // Debe llamarse con todos sus argumentos
  // }
  // En lugar de hardcodear el nombre de la clase se puede usar callee
  if (!(this instanceof arguments.callee)) {
    // return new arguments.callee(brand);
    return new arguments.callee(brand);
    // los argumentos se deben llamar hardcodeados a menos que se encuentre
    // otra forma de obtenerlos
  }
  this.brand = brand;
}

var vehicle_one = Vehicle('Mazda'),
    vehicle_two = new Vehicle('Ford');

console.clear();
console.log('vehicle_one');
console.log(vehicle_one);
console.log('vehicle_one.brand');
console.log(vehicle_one.brand);
console.log('-------------------------');
console.log('vehicle_two');
console.log(vehicle_two);
console.log('vehicle_two.brand');
console.log(vehicle_two.brand);
console.log('-------------------------');

// Agregamos un método que puedan usar todas las instanciados
Vehicle.prototype.sayBrand = function(){
  return 'Hi there, my brand is ' + this.brand;
};

console.log('vehicle_one.sayBrand()');
console.log(vehicle_one.sayBrand());
console.log('-------------------------');
console.log('vehicle_two.sayBrand()');
console.log(vehicle_two.sayBrand());

console.log('-------------------------');
console.log(Vehicle.prototype);
console.log(Vehicle.__proto__.constructor.caller);


/*

*/
