/*******************************************
  JSON
*******************************************/
// Es la Notacion de Objetos de JS
// Es un formato para transmitir informacion o datos
// La unica diferencia entre JSON y Literal de Objeto es que los nombres
// de propiedades deben estar encerradas en comillas para ser un JSON valido
// JSON: {'ApellidoPaterno': 'Vazquez'} camelCase
// Literal de Objeto: {ApellidoPaterno: 'Vazquez'}
// No se pueden usar funciones o regexp en cadenas JSON

var json = {"ApellidoPaterno": "Vázquez"};

console.log('json: ', json);
console.log('json.ApellidoPaterno: ', json.ApellidoPaterno);
console.log('------------------------------------');


/*
  Trabajando con JSON
*/
// No se recomienda evaluar cadenas JSON con eval()
// Es preferible usar parse()
// El metodo parse() puede convertir cadena array a objeto Array

// Cadena JSON
var json_str = '{"ApellidoPaterno": "Vázquez"}';

console.log('json_str: ', json_str);
console.log('json_str.ApellidoPaterno: ', json_str.ApellidoPaterno);
console.log('------------------------------------');

// Antipattern
var data_eval = eval('(' + json_str + ')');

// Preferido
var data_parse = JSON.parse(json_str);

console.log('data_eval: ', data_eval); // Funciona bien pero implica riesgo de seguridad
console.log('data_eval.ApellidoPaterno: ', data_eval.ApellidoPaterno);
console.log('data_parse: ', data_parse); // Idem
console.log('data_parse.ApellidoPaterno: ', data_parse.ApellidoPaterno);
console.log('------------------------------------');

// El metodo opuesto a parse() es stringify()
// stringify() toma un objeto o array (o un primitivo) y lo serializa en cadena json

var dog = {
  name: 'Bigotes',
  birthday: new Date(),
  legs: [1,2,3,4]
};

console.log('dog: ', dog);

var dog_str = JSON.stringify(dog);
console.log('dog_str: ', dog_str);
console.log('------------------------------------');

// var dog_parse = JSON.parse(dog); // Si se parsea json y no string tira error
// console.log('dog_parse: ', dog_parse);

var arr = [['nombre', 'vic'], ['apellido', 'vaz']];
var arr_stringify = JSON.stringify(arr);
var arr_parse = JSON.parse(arr_stringify); // convierte cadena arr en Array object

console.log('arr: ', arr);
console.log('arr_stringify: ', arr_stringify);
console.log('arr_parse: ', arr_parse);
