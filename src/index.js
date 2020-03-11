function eval() {
    // Do not use eval!!!
    return;
}

String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(rem);
};

const OPERATIONS = {
    '+' : sum,
    '-' : sub,
    '*' : mul,
    '/' : div,
}

function sum(left, right){
    return left + right;
}

function sub(left, right){
    return left - right;
}

function mul(left, right){
    return left * right;
}

function div(left, right){
    if(right == 0) throw TypeError('TypeError: Division by zero.');
    return left / right;
}

function simpleEval(str){
    if(str[0] == '+')  str = str.slice(1, str.length);
    let left = parseFloat(str);
    if(String(left).length == str.length) return String(left)
    let right = parseFloat(str.slice(String(left).length + 1, str.length));
    let operation_str = str[String(left).length]
    return String(OPERATIONS[operation_str](left, right));
}

function delete_space(str){
    return str.replace(/ /g, '');
}

function check_brackets(str){
    let open_br = 0;
    for(let i = 0; i < str.length; i++){
        if(str[i] == '('){
            open_br++;
        }
        if(str[i] == ')'){
            open_br--;
        }
    }
    if(open_br != 0) throw Error('ExpressionError: Brackets must be paired');
}


function expressionCalculator(expr) {
    expr = delete_space(expr);
    check_brackets(expr);
    expr = expr.replace(/\-\-/g, '+');
    while (expr.indexOf('(') != -1){
        let open_index_br = expr.lastIndexOf('(');
        let close_index_br = expr.indexOf(')', open_index_br);
        let result_in_br = String(expressionCalculator(expr.slice(open_index_br + 1, close_index_br)));
        expr = expr.splice(open_index_br, close_index_br + 1, result_in_br);
    }
    expr = expr.split('+').join(' +').split('-').join(' -').split(' ');
    for(let i = 0; i < expr.length - 1; i++){
        if(expr[i][expr[i].length - 1] === '*' || expr[i][expr[i].length - 1] === '/' || expr[i][expr[i].length - 1] === '+'){
            expr[i] += expr[i + 1];
            expr.splice(i+1, 1);
        }
    }
    for(let i = 0; i < expr.length; i++){
        let temp = expr[i].split('*').join(' *').split('/').join(' /').split(' ');
        while(temp.length > 1){
            temp[0] = '+'+simpleEval(temp[0]+temp[1]);
            temp.splice(1, 1);
        }
        expr[i] = temp[0];
    }
    while(expr.length > 1){
        expr[0] = simpleEval(expr[0]+expr[1]);
        expr.splice(1, 1);
    }
    if(expr[0][0] == "+"){
        expr[0] = expr[0].split('').slice(1).join('');
    }

    return Number(expr[0]);
}

module.exports = {
    expressionCalculator
}

// console.log('out:', expressionCalculator('3 * 26 / (  (  75 / 18 * 91 * 38  ) / 53 - (  52 / 34 - (  10 * 67 - 50 - 78  ) * 51 + 58  )  ) + 73 '));
// console.log('out:', expressionCalculator('72*3/36*-18.571428571428573'));
