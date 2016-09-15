/*******************************************
  Expresion Regular Literal
*******************************************/
// Las regexp en JS tambien son objetos y hay 2 formas de crearlas:
// Mediante el constructor new RegExp()
// Expresion Regular Literal

// regExp Literal
var re = /\\/gm;

// constructor new RegExp()
var expReg = new RegExp("\\\\", "gm");

console.log('re: ', re);
console.log('expReg: ', expReg);
