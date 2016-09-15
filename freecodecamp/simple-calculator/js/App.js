angular.module('simpleCalculatorApp', [])
.controller('simpleCalculatorCtrl', ['$scope', function($scope){
var title = 'simpleCalculator';

var operator_prev = null;
var preview_operator_token = null;
var current_operator_token = null;
var hasOperator = false;
var operator_entries = 0;
var add_str = '+';
var substract_str = '-';
var multiply_str = '*';
var divide_str = '/';

var int_str = '';
var int_entries = 0;
var max_int_entries = 9;

var is_decimal = false;
var dec_entries = 0;
var max_dec_entries = 9;
var decimal_str = '';

var preview_amount_str = '';
var current_amount_str = '';
var preview_amount = 0;
var current_amount = 0;
var accumulated_amount = 0;
var max_display_total = 9;
var max_display_memory = 20;

var end_operation = false;
var end_single_operation = false;
var end_entry_amount = false; // meaby useful

var memory_str = '';
var memory_length = 0;
var last_char = null;
var last_visible_char = null;
var total_str = '';
var total = 0;
var accumulated_amount_arr = [];
var num_amounts = 0;
var operations = 0;

function syntaxHighlight(json) {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        // return '<span class="' + cls + '">' + match + '</span>';
        return match;
    });
}

var calculate = function () {
  switch (preview_operator_token) {
    case '+':
      accumulated_amount = preview_amount + current_amount;
      break;
    case '-':
      accumulated_amount = preview_amount - current_amount;
      break;
    case '*':
      accumulated_amount = preview_amount * current_amount;
      break;
    case '/':
      accumulated_amount = preview_amount / current_amount;
      break;
    default:
  }
  num_amounts ++;
  operations ++;
  accumulated_amount_arr.push(
    {
      'operations': operations,
      'preview_amount': preview_amount,
      'operator': preview_operator_token,
      'current_amount': current_amount,
      'accumulated': accumulated_amount
    }
  );

  showLog('CALCULATE', 'accumulated_amount_arr', syntaxHighlight(accumulated_amount_arr));
  operator_entries = 0;
  preview_amount = accumulated_amount;
  preview_amount_str = null;
  end_single_operation = true;
};

var showMessage = function (message) {
  $scope.title = message;
};
var checkSize = function(){
  total_str = $scope.total.toString();
  if (total_str.length >= max_display_total) {
    $scope.sizeTotal = 'small';
  }else{
    $scope.sizeTotal = null;
  }
  if (memory_length >= max_display_memory) {
    $scope.sizeMemory = 'small';
  }else{
    $scope.sizeMemory = null;
  }
};
var showLog = function (title, titleData, data) {
  // console.clear();
  console.log('************************************ ' + title + ' ************************************');
  console.log('int_str: ', int_str, '  |  int_entries: ', int_entries);
  console.log('-----------------------------------------------------------------------------------');
  console.log('is_decimal: ', is_decimal, '  |  decimal_str: ', decimal_str, '  |  dec_entries: ', dec_entries);
  console.log('-----------------------------------------------------------------------------------');
  console.log('memory_str: ', memory_str, '  |  memory_length: ', memory_length);
  console.log('-----------------------------------------------------------------------------------');
  console.log('last_char: ', last_char, '  |  last_visible_char: ', last_visible_char);
  console.log('-----------------------------------------------------------------------------------');
  console.log('preview_amount: ', preview_amount, '  |  current_amount: ', current_amount, '  |  accumulated_amount: ', accumulated_amount);
  console.log('preview_amount_str: ', preview_amount_str);
  console.log('-----------------------------------------------------------------------------------');
  console.log('operations', operations, '  |  accumulated_amount_arr: ', accumulated_amount_arr);
  console.log('-----------------------------------------------------------------------------------');
  console.log('hasOperator: ', hasOperator, '  |  preview_operator_token: ', preview_operator_token, '  |  operator_prev: ', operator_prev);
  // console.log('-----------------------------------------------------------------------------------');
  // console.log('accumulated_amount: ', accumulated_amount);

  console.log('-----------------------------------------------------------------------------------');
  console.log(titleData, ': ', data);
};


$scope.sizeTotal = null;
$scope.sizeMemory = null;
$scope.title = title;
$scope.total = 0;

$scope.addNumber = function(number){
  if (memory_length < max_display_memory) {
    checkSize();
    hasOperator = false;
    operator_prev = null;
    if (is_decimal === false){
      if (int_entries < max_int_entries) {
        int_str += number;
        preview_amount_str += number;
        memory_str += number;
        $scope.memory = memory_str;
        int_entries ++;
        memory_length ++;
      }else{
        showMessage('Digit Limit Exceeded');
      }
    }else{
      if (dec_entries < max_dec_entries) {
        decimal_str += number;
        preview_amount_str += number;
        memory_str += number;
        $scope.memory = memory_str;
        dec_entries ++;
        memory_length ++;
      }else{
        showMessage('Decimal Limit Exceeded');
      }
    }
    // preview_amount = accumulated_amount;
    if (end_entry_amount === true) {
      // current_amount = parseInt(preview_amount_str);
      // calculate();
    }
    $scope.total = preview_amount_str;
    // showLog('ADD NUMBER', 'number', number);
  }else{
    showMessage('Memory Length Exceeded')
  }
};

$scope.addDecimal = function(){
  if (memory_length < max_display_memory) {
    checkSize();
    last_char = memory_str.charAt(memory_length-1);
    last_visible_char = memory_str.charAt(memory_length-2);
    // int_entries = 0;
    if (is_decimal === false) {
      is_decimal = true;
      showMessage(title);
      preview_amount_str += '.';
      memory_str += '.';
      $scope.memory = memory_str;
      memory_length++;
    }
    // showLog('ADD DECIMAL', 'decimal', '.');
  }else {
    showMessage('Memory Length Exceeded');
  }
};

$scope.addOperator = function (operator) {
  // preview_amount_str = '';
  if (operator_prev !== operator && memory_length < max_display_memory) {
    checkSize();
    int_entries = 0;
    int_str = '';
    dec_entries = 0;
    decimal_str = '';
    is_decimal = false;
    end_entry_amount = true;
    console.log('preview_operator_token: ', preview_operator_token, ' | operator: ', operator);
    console.log('operator_prev: ', operator_prev, ' | operator: ', operator);
    console.log('end_single_operation: ', end_single_operation, ' | operator_entries: ', operator_entries);
    console.log('preview_amount: ', preview_amount, ' | preview_amount_str: ', preview_amount_str, ' | current_amount: ', current_amount);
    console.log('----------------------------------------------------------------------');
    if (operator_entries === 0) {
      preview_operator_token = operator;
      // preview_amount = accumulated_amount;
      preview_amount = parseFloat(preview_amount_str);
      // end_single_operation = true;
    }
    if (operator_entries === 1 && preview_amount_str !== null) {
      console.debug('preview_amount_str: ', preview_amount_str);
      current_amount = parseFloat(preview_amount_str);
      calculate();
    }

    operator_entries ++;
    showMessage(title);
    if (hasOperator === false) {
      hasOperator = true;
      memory_str += operator;
      $scope.memory = memory_str;
      operator_prev = operator;
      memory_length ++;
    }else{
      memory_str = memory_str.substr(0, memory_str.length - 1);
      memory_str += operator;
      $scope.memory = memory_str;
      operator_prev = operator;
    }
    preview_operator_token = operator;
  }else{
    showMessage('Memory Length Exceeded');
  }
  // showLog('ADD OPERATOR', 'preview_operator_token', preview_operator_token);
};

$scope.clearEntry = function(){
  checkSize();
  if (memory_length > 0) {
    last_char = memory_str.charAt(memory_length-1);
    last_visible_char = memory_str.charAt(memory_length-2);

    if (is_decimal) {
      decimal_str = decimal_str.substr(0, decimal_str.length - 1);
      dec_entries --;
      if (last_char === '.') {
        // decimal_str = '';
        dec_entries = 0;
        is_decimal = false;
        console.log('last_char');
        console.log(last_char);
      }
    }else{
      if (int_entries > 0) {
        int_str = int_str.substr(0, int_str.length - 1);
        int_entries --;
      }
    }

    // if (last_visible_char === '*' || last_visible_char === '/' || last_visible_char === '+' || last_visible_char === '-') {
    //   console.log();
    //   console.log('last_visible_char: ', last_visible_char);
    //   hasOperator = true;
    //   operator_prev = last_visible_char;
    //   preview_operator_token = last_visible_char;
    //   operator_entries = 0;
    // }else{
    //   console.log();
    //   console.log('last_visible_char', last_visible_char);
    //   hasOperator = false;
    //   operator_prev = null;
    //   preview_operator_token = null;
    // }
    if (last_char === '*' || last_char === '/' || last_char === '+' || last_char === '-') {
      console.log('===========================================');
      console.log('last_char IS operator: ', last_char);
      console.log('===========================================');
      hasOperator = true;
      operator_prev = last_visible_char;
      preview_operator_token = last_visible_char;
      operator_entries = 0;
    }else{
      console.log('===========================================');
      console.log('last_char is NOT operator: ', last_char);
      console.log('===========================================');
      hasOperator = false;
      operator_prev = null;
      preview_operator_token = null;
    }
    if (end_operation === true) {
      $scope.clear();
    }
    if ($scope.total.length > 0) {
      $scope.total = $scope.total.substr(0, $scope.total.length - 1);
    }
    memory_str = memory_str.substr(0, memory_str.length - 1);
    preview_amount_str = preview_amount_str.substr(0, preview_amount_str.length - 1);
    $scope.memory = memory_str;
    memory_length --;
    showLog('CLEAR ENTRY', 'last_char', last_char);
  }
};

$scope.clear = function(){
  checkSize();
  showMessage(title);
  end_operation = false;
  operator_prev = null;
  hasOperator = false;
  preview_operator_token = null;
  int_str = '';
  int_entries = 0;

  is_decimal = false;
  dec_entries = 0;
  decimal_str = '';

  last_char = null;
  last_visible_char = null;

  preview_amount_str = '';
  preview_amount = 0;
  current_amount = 0;
  accumulated_amount = 0;
  total = 0;

  end_entry_amount = false;

  memory_str = '';
  memory_length = 0;

  $scope.total = 0;
  $scope.memory = memory_str;

  $scope.sizeTotal = null;
  $scope.sizeMemory = null;

  showLog('CLEAR');


};

$scope.calculate = function () {
  if (memory_length < max_display_memory) {
    checkSize();
    if (operator_prev !== '/' && operator_prev !== '*' && operator_prev !== '+' && operator_prev !== '-' && preview_operator_token !== null) {
      $scope.addOperator(preview_operator_token);
      var isDecimal = accumulated_amount.toString().match(/\./g);

      if (isDecimal) {
        total = accumulated_amount.toFixed(4).toString();
      }else{
        total = accumulated_amount.toString();
      }

      $scope.memory = memory_str.substr(0, memory_length-1) + '=' + total;
      $scope.total = total;

      memory_str = total;
      memory_length = total.length;
      current_amount = 0;
      preview_operator_token = null;
      end_operation = true;
    }
  }else{
    showMessage('Memory Length Exceeded');
  }
};

$scope.calculateAdd = function(){
  if (operator_prev !== '/' && operator_prev !== '*' && operator_prev !== '+' && operator_prev !== '-') {
    checkSize();
    console.clear();
    console.log('memory_str');
    console.log(memory_str);
    var pattern_single_operation = /\d+\.\d+([\/\+\-\*])\d+\.\d+/g;
    // var pattern_single_operation = /(\d+\+|\-|\*|\/)/g;
    console.log(memory_str.match(pattern_single_operation));

    // return;

    var total_str = 'return ' + memory_str;
    var totalFunction = new Function(total_str);
    total_str = totalFunction();
    var isDecimal = total_str.toString().match(/\./g);
    var isInteger = total_str % 1 != 0;

    if (isDecimal) {
      total = totalFunction().toFixed(2);
    }else{
      total = totalFunction();
    }
    // checkSize();
    // alert(total.length);

    $scope.memory += '=' + total_str;
    $scope.total = total_str;
    memory_str = total_str;
    end_operation = true;

    showLog('CALCULATE', 'total', total_str);
  }
};





}]);
