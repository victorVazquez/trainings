/*

*/
function suma(a, b){
  var c = a + b;
  return c;
}

var resultado = suma(1,2);
var undefined = suma(1);
var more = suma(1,2,3,4,5);

console.log('suma(1,2)');
console.log(resultado);

console.log('suma(1)');
console.log(undefined);

console.log('suma(1,2,3,4,5)');
console.log(more);


function argumentos (){
  return arguments;
}

console.log('argumentos(1,3,5,"hi","Hola",true)');
console.log(argumentos(1,3,5,"hi","Hola",true));

function sumaDeEsteroides(){
  var
  i,
  res = 0;

  var numero_de_parametros = arguments.length;

  for (var i = 0; i < numero_de_parametros; i++) {
    res += arguments[i];
    console.log(arguments[i] + " : " + res);
  }
  console.log(res);
  return res;
}

console.clear();
console.log('sumaDeEsteroides(1,2,3)');
sumaDeEsteroides(1,2,3);

console.log('sumaDeEsteroides(2,4,5,6,3,8,9,21);');
sumaDeEsteroides(2,4,5,6,3,8,9,21);

console.log('sumaDeEsteroides(5)');
sumaDeEsteroides(5);

console.log('sumaDeEsteroides()');
sumaDeEsteroides();
