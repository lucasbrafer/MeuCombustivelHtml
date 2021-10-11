
/* ao selecionar uma tab desmarca todos e seleciona o que foi clicado */
function setActive(name) {
    showSelectPage(name)
    list = document.querySelectorAll(".nav_link");
    for (var i = 0; i < list.length; ++i) {
    list[i].classList.remove('nav-active');
    }

    document.getElementById('tab-' + name).classList.add('nav-active');
}

function showSelectPage(name) {
    list = document.querySelectorAll(".component");
    for (var i = 0; i < list.length; ++i) {
    list[i].classList.add('hidden');
    }

    document.getElementById('page-' + name).classList.remove('hidden');
}