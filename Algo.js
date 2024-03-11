let inputNovaTarefa = document.querySelector('#inputNovaTarefa');
let btnNovaTarefa = document.querySelector('#btnAddTarefa');
let listaTarefas = document.querySelector('#listaTarefas');
let contadorTarefas = 0; 

inputNovaTarefa.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {
        adicionarTarefa(inputNovaTarefa.value);
    }
});

btnNovaTarefa.addEventListener('click', () => {
    adicionarTarefa(inputNovaTarefa.value);
});

function adicionarTarefa(nomeTarefa) {
    if (nomeTarefa.trim() !== '') {
        const tarefa = { id: contadorTarefas++, nome: nomeTarefa };
        const li = criarTagLI(tarefa);
        listaTarefas.appendChild(li);
        inputNovaTarefa.value = '';
    }
}

function criarTagLI(tarefa) {
    const li = document.createElement('li');
    li.dataset.id = tarefa.id;
    li.innerHTML = `
        <span class="textoTarefa">${tarefa.nome}</span>
        <div>
            <button class="btnAção" onclick="editar(${tarefa.id})"><i class="fa fa-pencil"></i></button>
            <button class="btnAção" onclick="excluir(${tarefa.id})"><i class="fa fa-trash"></i></button>
        </div>
    `;
    return li;
}

function editar(idTarefa) {
    const li = document.querySelector(`li[data-id="${idTarefa}"]`);
    const textoTarefa = li.querySelector('.textoTarefa');
    const novoNome = prompt('Opa,escreveu algo de errado? Digite o novo nome da tarefa:', textoTarefa.innerText);
    if (novoNome !== null && novoNome.trim() !== '') {
        textoTarefa.innerText = novoNome;
    }
}

function excluir(idTarefa) {
    const confirmacao = confirm('Por favor, não me exclua eu sou apenas uma tarefinha!');
    if (confirmacao) {
        const li = document.querySelector(`li[data-id="${idTarefa}"]`);
        li.remove();
    }
}

