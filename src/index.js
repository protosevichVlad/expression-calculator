function eval() {
    // Do not use eval!!!
    return;
}

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


function expressionCalculator(expr) {
    expr = delete_space(expr);
    expr = expr.split('+').join(' +').split('-').join(' -').split(' ');
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
    return Number(expr[0]);
}

module.exports = {
    expressionCalculator
}

