import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createTask, deleteTask, editTask, getAllTasks} from "../../api";

// En el store poner initialState, reducers. Ahora no hace falta, pero tenerlo en cuenta.
const initialState = {
    tasks: [],
    status: 'idle', // Para manejar el estado de las peticiones
    error: null
} // TODO: Ver como puedo mostrar los datos. Pero en relacion a la db.


// Thunks para manejar las operaciones asincronas
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async() =>{
    return await getAllTasks();
})

export const addTask = createAsyncThunk('tasks/addTask', async({title, description}) =>{
    return await createTask({title, description});
})

// Todo: Aca el tasks que le pasamos esta mal definido.

export const updateTask = createAsyncThunk('tasks/updateTask',  ({id,task}) =>{
    return editTask(id, task);
})

export const removeTask = createAsyncThunk('tasks/removeTask',  (id) =>{
    deleteTask(id).then(r => {
            return id;
        }
    );
})

export const taskSlice = createSlice({
    name: 'tasks',
    initialState, // Puede ponerse tambien: initialState: initialState
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.fulfilled, (state, action) =>{
                state.tasks = action.payload;
                state.status = 'succeeded';
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload);
            })
            .addCase(updateTask.fulfilled, (state, action) =>{
                const index = state.tasks.findIndex(task => task.id === action.payload.id);
                if(index !== -1){
                    state.tasks[index] = action.payload;
                }
            })
            .addCase(removeTask.fulfilled, (state, action) =>{
                state.tasks = state.tasks.filter(task => task.id !== action.payload);
            })
            .addCase(fetchTasks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'failed';
                state.error =  action.payload;
            })
    }
})

export default taskSlice.reducer