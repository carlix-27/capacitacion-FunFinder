// Http requests

import axios from 'axios';
// Sirve para determinar que los response sigan una estructura especifica.

const API_URL = 'http://localhost:3000/api/tasks';

export const getAllTasks = async () => {
    const response = await axios.get(`${API_URL}`);
    // console.log('api-getAllTasks: ', response);
    return response.data;
}

export const createTask = async (task) => {
    const response = await axios.post(`${API_URL}/create-task`, task);
    // console.log('api-createTasks: ', response);
    return response.data;
}

export const editTask = async (id, task) => {
    const response = await axios.patch(`${API_URL}/edit-task/${id}`, task);
    console.log('api-editTasks: ', response);
    return response.data;
}

export const deleteTask = async (id) => {
    // console.log('Id: ', id);
    await axios.delete(`${API_URL}/delete-task/${id}`); // Hacer que se borre en tiempo real. TODO: hacer el cambio yo para borrar desde el front.
}
