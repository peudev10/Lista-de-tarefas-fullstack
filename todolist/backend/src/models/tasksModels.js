const connection = require('./connection'); // como as funções vão acessar o banco de dados, ela preecisa da conexão

// listar todas as tasks que estão no banco de dados
const getAll = async () => {
    try {
        const [rows] = await connection.query('SELECT * FROM tasks');
        return rows;
    } catch (error) {
        // Trate o erro conforme necessário
        console.error('Erro ao executar a consulta:', error);
        throw error;
    }
};

const createTaks = async (task) =>{
    const {title} = task;

    const dateUTC = new Date(Date.now()).toUTCString(); // pega a data atual

    const [createdTask] = await connection.execute('INSERT INTO tasks(title, status, created_at) VALUES (?,?,?)', [title,'Pendente',dateUTC]);

    return {insertID: createdTask.insertId};
}

const deleteTask = async (id) =>{
    const removedTask = await connection.execute('DELETE FROM tasks WHERE id = ?', [id]);
    return removedTask;
}

const updadeTask = async (id, task) =>{
    const {title, status} = task;

    const [updadeTask] = await connection.execute('UPDATE tasks SET title = ?, status = ? WHERE id = ?', [title, status, id]);
    return updadeTask;
}

const getTasksStatus = async (task) =>{
    const {status} = task;
    
    const [statusTask] = await connection.execute('SELECT * FROM tasks WHERE status = ?', [status]);
    return statusTask;
}



// quando se tem várias funções, se exporta um objeto de funções
module.exports = {
    getAll,
    createTaks,
    getTasksStatus,
    deleteTask,
    updadeTask
}