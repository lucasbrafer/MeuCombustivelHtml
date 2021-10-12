let lastFuelIsGas = true;

onload = () => {
    setPageValues()
};

/* funcao centralizadaora de popular as paginas com dados salvos */
function setPageValues() {
    document.getElementById("calc-btn").disabled = true;
    retriveHistory()
}


/* populando a pagina de historico */
function retriveHistory() {
    const list = JSON.parse(localStorage.getItem('fuel'));
  
    let totalSpent = 0;
    let htmlHistory = ``;
  
    list?.forEach(element => {
      totalSpent += element.value
      if(element.isGas) {
      htmlHistory += retriveHtmlGas(element)
      } else {
      htmlHistory += retriveHtmlAlcool(element)
      }
    });
  
    document.getElementById("total-spent").innerHTML = converToBrl(totalSpent) || JSON.parse(localStorage.getItem('totalSpent'));
    document.getElementById("list-history").innerHTML = htmlHistory;
  }

/* confirma o valor abastecido e armazena as variaveis */
function saveValue(){
    const element = document.getElementById('spent')
    let spentVal = element?.value
    const real = !spentVal || spentVal === 'R$ ' ? 0 : realToNumber(spentVal)

    const fuelItem = {
        isGas: lastFuelIsGas,
        value: real,
        date: pickDateNowBR(),
    }

    const listFuel = JSON.parse(localStorage.getItem('fuel'));

    console.log(listFuel)

    if(listFuel) {
        listFuel.unshift(fuelItem)
        localStorage.setItem('fuel', JSON.stringify(listFuel));
    }
    else {
        localStorage.setItem('fuel', JSON.stringify([fuelItem]));
    }

    const totalValue = JSON.parse(localStorage.getItem('totalSpent'));
    localStorage.setItem('totalSpent', JSON.stringify(totalValue + real));

    element.value = 'R$ 0,00'
    setPageValues()
    goBackToGas()
}


/* quando input mudar realiza validacoes para o btn ficar desabilitado em caso de valores invalidos */
function listenerChangingInput() {
    let gasVal = document.getElementById('gas').value
    let alcoolVal = document.getElementById('alcool').value

    if(!gasVal || gasVal === 'R$ 0,00' || gasVal === 'R$ 0' || gasVal === 'R$ ' || !alcoolVal || alcoolVal === 'R$ 0,00' || alcoolVal === 'R$ 0'  || alcoolVal === 'R$ ' ) {
        document.getElementById("calc-btn").disabled = true;
    }
    else {
        document.getElementById("calc-btn").disabled = false;
    }
   
}

/* retornar para pagina de calcular */
function goBackToGas() {
    document.getElementById('page-result').classList.add('hidden');
    document.getElementById('page-gas').classList.remove('hidden');
}

/* funcao central de carregar o resultado do combustivel */
function fetchResult() {
    document.getElementById('page-gas').classList.add('hidden');
    document.getElementById('page-result').classList.remove('hidden');

    lastFuelIsGas = gasWorthMore()

    if(lastFuelIsGas) {
        document.getElementById('alcool-result').classList.add('hidden');
        document.getElementById('gas-result').classList.remove('hidden');
    } else {
        document.getElementById('gas-result').classList.add('hidden');
        document.getElementById('alcool-result').classList.remove('hidden');
    }
}

/* Calcular qual combustivel através dos valores do input */
/* Para o álcool ser mais vantajoso do que a gasolina, o preço do litro tem que custar até 70% do litro da gasolina */
function gasWorthMore() {
    if(realToNumber(document.getElementById('gas').value) * 0.7 > realToNumber(document.getElementById('alcool').value))
        return false
    return true
}

/* converte number para reais em string */
function numberToReal(name) {
    listenerChangingInput()
    let element = document.getElementById(name);

    let val = element.value

    if(Number.isNaN(element.value))
        val = (element.value).split(' ')[1];
  
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

/* converte para moeda local */
const converToBrl = (val) => {
    return val.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}

/* pega data atual */
const pickDateNowBR = () => {
    let data = new Date();
    let dia = String(data. getDate()). padStart(2, '0');
    let mes = String(data. getMonth() + 1). padStart(2, '0');
    let ano = data. getFullYear();
    dataAtual = dia + '/' + mes + '/' + ano;
    return dataAtual
}

/* html do span de gas */
function retriveHtmlGas(element) {
    return (`     
        <div>
            <span class="gas-text"> Gasolina</span>
            <span> ${converToBrl(element.value)} </span>
            <span> ${element.date} </span> 
            <hr />
        </div> 
    `)
    
}

/* html do span de alcool */
function retriveHtmlAlcool(element) {
    return (`     
        <div>
            <span class="alcool-text"> Álcool </span>
            <span> ${converToBrl(element.value)}</span>
            <span> ${element.date} </span> 
            <hr />
        </div> 
    `)
    
}