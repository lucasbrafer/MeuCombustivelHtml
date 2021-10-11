
/* Calcular qual combustivel através dos valores do input */
/* Para o álcool ser mais vantajoso do que a gasolina, o preço do litro tem que custar até 70% do litro da gasolina */
function gasWorthMore() {
    if(document.getElementById('gas').value * 0.7 > document.getElementById('alcool').value)
        return false
    return true
}