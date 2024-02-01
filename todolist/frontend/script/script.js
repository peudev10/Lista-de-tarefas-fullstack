const tbody = document.querySelector('tbody');
const addForm = document.querySelector('.add-form');
const inputTask = document.querySelector('.input-task')

const btnFiltro_pendente = document.querySelector('#pendente');
const btnFiltro_emAndamento = document.querySelector('#emAndamento');
const btnFiltro_concluida = document.querySelector('#concluida');

const fetchTasks = async () =>{
    
    const response = await fetch('http://localhost:3333/tasks');

    const tasks = await response.json()

    return tasks;
}

const addTask = async (event) => {
    event.preventDefault();

    const task = {title: inputTask.value};
    
    await fetch('http://localhost:3333/tasks', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(task)
    });

    loadTasks();
    inputTask.value = '';
}

const deleteTask = async (id) =>{
    await fetch(`http://localhost:3333/tasks/${id}` , {
        method: 'delete'
    })

    loadTasks();

}

const updateTask = async (task) =>{
    const {id,title, created_at, status} = task;

    await fetch(`http://localhost:3333/tasks/${id}`, {
        method: 'put',
        headers: {'Content-Type': 'Application/json'},
        body: JSON.stringify({title, status})
    });

    loadTasks();
}

const getTasksFiltro = async (value) => {
    
    const tasks = {status: value};
    console.log(tasks.status)

    const response = await fetch(`http://localhost:3333/tasks/${tasks.status}`);

    const resultado = await response.json();

    return resultado;

}

const creatElement = (tag, innerText = '', innerHTML = '') =>{
    const element = document.createElement(tag);
    if(innerText){
        element.innerText = innerText;
    }
    if(innerHTML){
        element.innerHTML = innerHTML;
    }
    
   
    return element;
}

const formatDate = (dateUTC) =>{
    const options = { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    const date = new Date(dateUTC).toLocaleString('pt-BR', options);
    return date;
}

const creatSelect= (status)=>{
    const option = `
        <option value="Pendente">Pendente</option>
        <option value="Em andamento">Em andamento</option>
        <option value="concluída">Conlcuída</option>
    `;
    const select = creatElement('select', '', option);

    select.value = status;

    console.log(select);
    
    
    return select;
}

const creatRow = (task) => {
    const {id,title, created_at, status} = task;

    const tr = creatElement('tr');
    const tdTitle = creatElement('td', title);
    const td_crated_at = creatElement('td', formatDate(created_at));

    const td_Status = creatElement('td');
    const td_Actions = creatElement('td');

    const select = creatSelect(status);
    select.addEventListener('change', ({target}) => updateTask({id, title, created_at, status: target.value}));
    

    const button_edit = creatElement('button' , '', '<span class="material-symbols-outlined"> edit </span>');
    const button_delete = creatElement('Button', '','<span class="material-symbols-outlined"> delete </span>');

    const editForm = creatElement('form');
    const editImput = creatElement('input');

    editForm.addEventListener('submit', (event)=>{
        event.preventDefault();
        updateTask({id, title: editImput.value, status})

    })

    editImput.value = title;

    button_edit.addEventListener('click', () => {
        tdTitle.innerText ='';
        tdTitle.appendChild(editForm);
    })

    editForm.appendChild(editImput);

    button_delete.addEventListener('click', () => {deleteTask(id)});

    button_edit.classList.add('btn-action');
    button_delete.classList.add('btn-action');

    td_Status.appendChild(select);
    td_Actions.appendChild(button_edit);
    td_Actions.appendChild(button_delete);

    tr.appendChild(tdTitle);
    tr.appendChild(td_crated_at);
    tr.appendChild(td_Status);
    tr.appendChild(td_Actions);
    
    return tr;

}

const loadTasks = async () =>{
    const tasks = await fetchTasks();

    tbody.innerHTML = '';

    tasks.forEach((task) =>{
        const tr = creatRow(task);
        tbody.appendChild(tr);
    })
}

const filtroTasks = async (value) => {
    
    tbody.innerHTML = '';
    
    const response = await getTasksFiltro(value);

    response.forEach((task) =>{
        const tr = creatRow(task);
        tbody.appendChild(tr);
    });

}


btnFiltro_pendente.addEventListener('click', () => {filtroTasks(btnFiltro_pendente.value)});
btnFiltro_emAndamento.addEventListener('click', () => {filtroTasks(btnFiltro_emAndamento.value)});
btnFiltro_concluida.addEventListener('click', () => {filtroTasks(btnFiltro_concluida.value)});
addForm.addEventListener('submit', addTask);

loadTasks();
