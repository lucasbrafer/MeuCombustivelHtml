onload = () => {
  // let tabs = document.querySelectorAll('.navBar .tab');

  // const defaultOption = (elem) => {
  //   if (elem) {
  //     for (let i = 0; i < tabs.length; i++) tabs[i].classList.remove('active');
  //     elem.classList.add('active');
  //   }

  //   for (let i = 0; i < tabs.length; i++) {
  //     let comp = tabs[i].getAttribute('for');
  //     if (tabs[i].classList.contains('active'))
  //       document.querySelector('#' + comp).classList.remove('hidden');
  //     else document.querySelector('#' + comp).classList.add('hidden');
  //   }
  // };

  // for (let i = 0; i < tabs.length; i++)
  //   tabs[i].onclick = (e) => {
  //     mostra(e.target);
  //   };

  //   defaultOption();
};

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