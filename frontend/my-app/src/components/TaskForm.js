import { useState, useEffect } from "react"

import { useDispatch , useSelector} from "react-redux"

import {addTask, fetchTasks, updateTask} from '../features/tasks/taskSlice'


import {useNavigate, useParams} from 'react-router-dom' // useNavigate sirve para cambiar de pagina

function TaskForm(){
    // Todo:
    // Obtener el id desde el link
    const [task, setTask] = useState({
        title: '',
        description: ''
    })
    // useState para agarrar las variables que toma el objeto tasks, de mi array tasks de redux. A partir del id debe darme el objeto tasks entero.

    const dispatch = useDispatch() // Permite disparar evento desde el taskSlice
    const navigate = useNavigate()
    const params = useParams()
    const tasks = useSelector(state => state.tasks)


    const handleChange = (e) =>{
        setTask({
            ...task,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault()

        if(params.id){
            dispatch(updateTask({id: params.id, task})); // Aca tanto params.id, como task, tienen datos. Se pasan bien.

        } else{
            dispatch(addTask({title: task.title, description: task.description}));
        }
        navigate('/');
    };

    useEffect(() =>{
        if(params.id){
            const id = Number(params.id);
            const foundTask = tasks.tasks.find(task => task.id === id); // Con la correccion de number para castear a int params, funciona perfecto.
            setTask(foundTask);
        }
    }, [params.id, tasks.tasks])


    return(
        <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4 mb-2">
            <label htmlFor="title" className="block text-xs font-bold">Task:</label>
            <input name="title" type="text" placeholder="title" onChange={handleChange} value={task.title}
                   className="w-full p-2 rounded-md bg-zinc-600 mb-2"
            />

            <label htmlFor="description" className="block text-xs font-bold mnb-2">Description:</label>
            <textarea name="description" placeholder="description" onChange={handleChange} value = {task.description}
                      className="w-full p-2 rounded-md bg-zinc-600 mb-2"
            >
            </textarea>

            <button className="bg-indigo-600 px-2 py-1">Save</button>
        </form>


    )
}

export default TaskForm