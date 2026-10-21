import axios from "axios";

//API_URL isimli değişken oluşturduk ve backend adresini burada tuttuk
const API_URL = 
      process.env.REACT_APP_API_BASE_URL || 'http://localhost:8300/api/todos';
      

      export const getTodos = () => axios.get(API_URL);
      export const addTodo = (todo) => axios.post(API_URL,todo);
      export const updateTodo = (id,todo) => axios.put(`${API_URL}/${id}`, todo);
      export const deleteTodo = (id) => axios.delete(`${API_URL}/${id}`);
