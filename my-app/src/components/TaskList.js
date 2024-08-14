import { useSelector, useDispatch} from "react-redux"
import {fetchTasks, removeTask} from '../features/tasks/taskSlice'
import { Link } from "react-router-dom";
import {useEffect, useState} from "react";

function TaskList(){

    const tasksFromStore = useSelector(state => state.tasks.tasks); // Se llama tasksFromStore debido a que viene del backend.
    const [tasks, setTasks] = useState(tasksFromStore); // Tasks actualizadas con el useState.

    const dispatch = useDispatch();

    const handleDelete = async (id) => {
        await dispatch(removeTask(id));
        setTasks(tasks.filter(task => task.id !== id)); // Podemos eliminar lo que queremos. El fetch tiene que ser en tiempo real que hacemos con el useEffect (2).
    };

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    useEffect(() => { // (2)
        setTasks(tasksFromStore); // Se actualiza cada vez que se actualiza tasksFromStore
    }, [tasksFromStore]);


    // La parte de la navegacion deberia estar mejor desarollada en el App.js

    return (
        <div className="w-4/6">
            <header className="flex justify-between items-center py-4">
                <h1>Tasks {tasks.length}</h1>
                <Link to= '/create-task' className="bg-indigo-600 px-2 py-1 rounded-sm text-sm">
                    Create Task
                </Link>

            </header>

            <div className="grid grid-cols-3 gap-4">
                {tasks.map((task) => (
                    <div key={task.id} className="bg-neutral-800 p-4 rounded-md">
                        <header className="flex justify-between">
                            <h3>{task.title}</h3>
                            <div className="flex gap-x-2">
                                <p>{task.description}</p>
                                <Link to={`/edit-task/${task.id}`} className="bg-zinc-600 px-2 py-1 text-xs rounded-md">Edit</Link>
                                <button onClick={() => handleDelete(task.id)} className="bg-red-500 px-2 py-1 text-xs rounded-md">Delete</button>
                            </div>
                        </header>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default TaskList