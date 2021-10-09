onload = () => {
  let tabs = document.querySelectorAll('.navBar .tab');

  const mostra = (elem) => {
    if (elem) {
      for (let i = 0; i < tabs.length; i++) tabs[i].classList.remove('active');
      elem.classList.add('active');
    }

    for (let i = 0; i < tabs.length; i++) {
      let comp = tabs[i].getAttribute('for');
      if (tabs[i].classList.contains('active'))
        document.querySelector('#' + comp).classList.remove('hidden');
      else document.querySelector('#' + comp).classList.add('hidden');
    }
  };

  for (let i = 0; i < tabs.length; i++)
    tabs[i].onclick = (e) => {
      mostra(e.target);
    };

  mostra();
};

function formatCurrency(val, name) {
  let numVal = Number(val)
  if(val && !Number.isNaN(val)) {
    let result = numVal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    document.getElementById(name).value = result
  }
}

function numberToReal(name) {
  var elemento = document.getElementById(name);
  var valor = (elemento.value).split(' ')[1];
  

  valor = valor + '';
  valor = parseInt(valor.replace(/[\D]+/g, ''));
  valor = valor + '';
  valor = valor.replace(/([0-9]{2})$/g, ",$1");

  if (valor.length > 6) {
      valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
  }

  elemento.value = 'R$ ' + valor;
  if(valor == 'NaN') elemento.value = 'R$ ' + '';
  
}