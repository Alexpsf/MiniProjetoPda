class TaskList {
    constructor() {
        this.tasks = [];
        this.counter = 0;
    }

    addTask(name, urgency) {
        if (name.trim() !== '') {
            const task = { id: this.counter++, name: name, urgency: urgency };
            this.tasks.push(task);
            return task;
        }
        return null;
    }

    editTask(id, newName, newUrgency) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.name = newName;
            task.urgency = newUrgency;
        }
    }

    removeTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    getTasks() {
        return this.tasks;
    }
}

const taskList = new TaskList();
const inputNovaTarefa = document.querySelector('#inputNovaTarefa');
const inputGrauUrgencia = document.querySelector('#inputGrauUrgencia');
const btnNovaTarefa = document.querySelector('#btnAddTarefa');
const btnApagarTarefas = document.querySelector('#btnApagarTarefas');
const listaTarefas = document.querySelector('#listaTarefas');

btnNovaTarefa.addEventListener('click', () => {
    const taskName = inputNovaTarefa.value;
    const taskUrgency = inputGrauUrgencia.value;
    addTask(taskName, taskUrgency);
});

btnApagarTarefas.addEventListener('click', () => {
    if (confirm('Tem certeza de que deseja apagar todas as tarefas?')) {
        taskList.tasks = []; 
        renderTasks(); 
        toggleDeleteAllButtonVisibility(); 
    }
});

function toggleDeleteAllButtonVisibility() {
    if (taskList.getTasks().length > 1) {
        btnApagarTarefas.style.display = 'block'; 
    } else {
        btnApagarTarefas.style.display = 'none'; 
    }
}

function addTask(taskName, taskUrgency) {
    const newTask = taskList.addTask(taskName, taskUrgency);
    if (newTask) {
        renderTasks();
        inputNovaTarefa.value = ''; 
        inputGrauUrgencia.value = ''; 
    }
}

function renderTasks() {
    listaTarefas.innerHTML = '';
    taskList.getTasks().forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="textoTarefa">${task.name}</span>
            <span class="tipoTarefa">(${task.urgency})</span> <!-- Exibindo o grau de urgência -->
            <div>
                <button class="btnAção" onclick="editTask(${task.id})"><i class="fa fa-pencil"></i></button>
                <button class="btnAção" onclick="deleteTask(${task.id})"><i class="fa fa-trash"></i></button>
            </div>
        `;
        listaTarefas.appendChild(li);
    });
    toggleDeleteAllButtonVisibility(); 
}

function editTask(taskId) {
    const task = taskList.getTasks().find(task => task.id === taskId);
    if (task) {
        const newTaskName = prompt('Digite o novo nome da tarefa:', task.name);
        if (newTaskName !== null && newTaskName.trim() !== '') {
            taskList.editTask(taskId, newTaskName, task.urgency);
            renderTasks();
        }
    }
}

function deleteTask(taskId) {
    if (confirm('Tem certeza de que deseja excluir esta tarefa?')) {
        taskList.removeTask(taskId);
        renderTasks();
    }
}

renderTasks();
