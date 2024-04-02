const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iconIniciarOuPausarBt = document.querySelector('.app__card-primary-butto-icon');

const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/Fokus-projeto-base/sons/luna-rise-part-one.mp3');
const audioInicia = new Audio('/Fokus-projeto-base/sons/play.wav');
const audioPausa = new Audio('/Fokus-projeto-base/sons/pause.mp3');
const audioTermina = new Audio('/Fokus-projeto-base/sons/beep.mp3'); 
musica.loop = true;

const comecarBt = document.querySelector('.app__card-primary-button');
const temporizador = document.querySelector('#timer');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

function alterarContexto(contexto){
    mostrarTempo();
    botoes.forEach(function (contexto){
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/Fokus-projeto-base/imagens/${contexto}.png`);
    switch(contexto){
        case 'foco':
            titulo.innerHTML = `
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;
            break;
        case 'descanso-curto':
            titulo.innerHTML = `
                Que tal dar uma respirada? 
                <strong class="app__title-strong">Faça uma pausa curta!</strong> 
            `;
            break;
        case 'descanso-longo':
            titulo.innerHTML = `
                Hora de voltar à superfície.
                <strong class="app__title-strong">Faça uma pausa longa.</strong> 
            `;
            break;
    }
}

focoBt.addEventListener('click', ()=>{
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
});

curtoBt.addEventListener('click', ()=>{
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
});


longoBt.addEventListener('click', ()=>{
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
});


musicaFocoInput.addEventListener('change', ()=>{
    if(musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
});

const contagemRegressiva = () =>{
    if(tempoDecorridoEmSegundos <= 0){
        audioTermina.play();
        //alert('Tempo finalizdo');
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar(){
    if(intervaloId){
        zerar();
        audioPausa.play();
        musica.pause();
        return;
    }
    audioInicia.play();
    musica.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = 'Pausar';
    iconIniciarOuPausarBt.setAttribute('src', '/Fokus-projeto-base/imagens/pause.png');
}

function zerar(){
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = 'Comecar';
    iconIniciarOuPausarBt.setAttribute('src', '/Fokus-projeto-base/imagens/play_arrow.png');
    intervaloId = null;
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: "2-digit"});
    temporizador.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();

