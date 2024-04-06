const tarefaBt = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');
const cancelarBt = document.querySelector('.app__form-footer__button--cancel');
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description');

const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []; // converte uma string JSON em um objeto javascript
// passa o parseItem da lista da tarefa ou devolve uma string vaziz

let tarefaSelecionada = null;

function atualizarTarefas(){
    localStorage.setItem('tarefas', JSON.stringify(tarefas)); // guardando a lista de tarefas cadastradas dentro da local storage
}

function clearTextAreaHiddenForm(){
    textArea.value = '';
    formAdicionarTarefa.classList.add('hidden');
}

cancelarBt.addEventListener('click', ()=>{
    clearTextAreaHiddenForm();
});

function criarElementoTarefa(tarefa){
    const li = document.createElement('li'); // criando elemento li
    li.classList.add('app__section-task-list-item'); // adicionando uma classe a li

    const svg = document.createElement('svg');
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `; // definindo o codigo html presente no svg, por conta de ser mais complexo

    const paragrafo = document.createElement('p'); 
    paragrafo.classList.add('app__section-task-list-item-description');
    paragrafo.textContent = tarefa.descricao; // como vai guardar texto o textContent ja cumpri o necessario

    const botao = document.createElement('button');
    botao.classList.add('app_button-edit');
    
    botao.onclick = () => { // recebe a funcao que indicamos quando esse botao for clicado
        //debugger
        const novaDescricao = prompt('Digite o novo titulo da tarefa:');
        //console.log('Nova descricao: ', novaDescricao);
        if(novaDescricao){ // verificando se o novadescricao tem algum valor, se tiver ele atualiza a descricao da tarefa
            paragrafo.textContent = novaDescricao; 
            tarefa.descricao = novaDescricao;
            atualizarTarefas();
        }
    }

    const imagemBotao = document.createElement('img');
    imagemBotao.setAttribute('src', '/Fokus-projeto-base/imagens/edit.png'); // setando a imagem ao src
    botao.append(imagemBotao); // adicionado a imagem ao botao

    // adionando os itens a li
    li.append(svg); 
    li.append(paragrafo);
    li.append(botao);

    li.onclick = () => {
        document.querySelectorAll('.app__section-task-list-item-active') // pegando todos os itens que possuem essa classe
            .forEach(elemento => { // iterando todos os elementos
                elemento.classList.remove('app__section-task-list-item-active'); // removendo a classe do elemento clicado
            })
        if (tarefaSelecionada == tarefa) {
            paragrafoDescricaoTarefa.textContent = ''
            tarefaSelecionada = null;
            return; // early return, basicamente faz com que o restante do codigo nao seja executado
        }
        tarefaSelecionada = tarefa;
        paragrafoDescricaoTarefa.textContent = tarefa.descricao;
        li.classList.add('app__section-task-list-item-active'); 
    }

    return li; // criou o elemento e retorna pra gente
}

tarefaBt.addEventListener('click', () => {
    //alert('clicou');
    formAdicionarTarefa.classList.toggle('hidden'); // toggle: se tem tira, se nao tam coloca
});

formAdicionarTarefa.addEventListener('submit', (event) =>{
    event.preventDefault(); // tira o comportamento padrao do form, ou seja, recarrega a pagina
    const tarefa = { //identifica a tarefa que esta sendo cadastrada, criando um objeto de tarefa
        descricao: textArea.value // atribuindo o valor contido no textarea para descricao
    }

    tarefas.push(tarefa); // adiciona a tarefa a lista de taredas quando o botao savar e clicado
    const elementoTarefa = criarElementoTarefa(tarefa); 
    ulTarefas.append(elementoTarefa);
    // JSON: api de converter dados, stringify: tranforma o objeto javascript em string JSON
    atualizarTarefas();
    clearTextAreaHiddenForm();
});

tarefas.forEach(tarefa => { // percorrendo todas as tarefas da list
    const elementoTarefa = criarElementoTarefa(tarefa); 
    ulTarefas.append(elementoTarefa);
});

{/* <li class="app__section-task-list-item">
    <svg>
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    </svg>
    <p class="app__section-task-list-item-description">
        Estudando localStorage
    </p>
    <button class="app_button-edit">
        <img src="/Fokus-projeto-base/imagens/edit.png">
    </button>
</li> */}
