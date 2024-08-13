import './App.css';
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

// TODO: Ver aqui como podria agregar una navegacion.
function App() {
    return (
        <div className="bg-zinc-900 h-screen text-white">
            <div className='flex items-center justify-center h-full'>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<TaskList/>}/>
                        <Route path='/create-task' element={<TaskForm/>}/>
                        <Route path='/edit-task/:id' element={<TaskForm/>}/>
                        <Route path='/delete-task/:id' element={<TaskList/>}/>
                    </Routes>
                </BrowserRouter>
            </div>


        </div>
    );
}

export default App;
