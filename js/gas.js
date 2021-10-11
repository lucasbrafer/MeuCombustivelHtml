/* retornar para calcular */

function goBackToGas() {
    document.getElementById('page-result').classList.add('hidden');
    document.getElementById('page-gas').classList.remove('hidden');
}


/* funcao central de carregar o resultado do combustivel */
function fetchResult() {
    document.getElementById('page-gas').classList.add('hidden');
    document.getElementById('page-result').classList.remove('hidden');

    if(gasWorthMore()) {
        document.getElementById('gas-result').classList.remove('hidden');
    } else {
        document.getElementById('alcool-result').classList.remove('hidden');
    }
}

/* Calcular qual combustivel através dos valores do input */
/* Para o álcool ser mais vantajoso do que a gasolina, o preço do litro tem que custar até 70% do litro da gasolina */
function gasWorthMore() {
    console.log(realToNumber(document.getElementById('gas').value))
    console.log(realToNumber(document.getElementById('alcool').value))
    if(realToNumber(document.getElementById('gas').value) * 0.7 > realToNumber(document.getElementById('alcool').value))
        return false
    return true
}

/* converte number para reais em string */
function numberToReal(name) {
    let element = document.getElementById(name);
    let val = (element.value).split(' ')[1];
    
  
    val = val + '';
    val = parseInt(val.replace(/[\D]+/g, ''));
    val = val + '';
    val = val.replace(/([0-9]{2})$/g, ",$1");
  
    if (val.length > 6) {
        val = val.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }
  
    element.value = 'R$ ' + val;
    if(val == 'NaN') element.value = 'R$ ' + '';
    
}

/* retorna valor em tipo numerico que está no formato de reais */
function realToNumber(value) {
    let val = (value).split(' ')[1].replace(',', '.');
    return Number(val)
}