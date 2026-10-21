import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaThumbtack } from 'react-icons/fa';

import * as todoService from '../services/todoService';
import TodoInput from '../components/TodoInput';
import TodoSearch from '../components/TodoSearch';
import TodoList from '../components/TodoList';

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const response = await todoService.getTodos();
      setTodos(response.data);
    } catch (error) {
      console.error('Todolar çekilemedi:', error);
    }
  };

  const handleAddTodo = async (title) => {
    try {
      const response = await todoService.addTodo({ title, completed: false });
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error('Todo eklenemedi:', error);
    }
  };

  const handleToggle = async (todo) => {
    try {
      const updated = { ...todo, completed: !todo.completed };
      await todoService.updateTodo(todo.id, updated);
      setTodos(todos.map((t) => (t.id === todo.id ? updated : t)));
    } catch (error) {
      console.error('Durum güncellenemedi:', error);
    }
  };

  const handleUpdateTitle = async (todo, newTitle) => {
    try {
      const updated = { ...todo, title: newTitle };
      await todoService.updateTodo(todo.id, updated);
      setTodos(todos.map((t) => (t.id === todo.id ? updated : t)));
    } catch (error) {
      console.error('Başlık güncellenemedi:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await todoService.deleteTodo(id);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (error) {
      console.error('Todo silinemedi:', error);
    }
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5" style={{ maxWidth: '650px' }}>
      <div className="card shadow-sm border-0 rounded-3">
        <div className="card-body p-4">
          <h2 className="card-title text-center text-primary mb-4 d-flex align-items-center justify-content-center gap-2">
            <FaThumbtack className="text-danger" /> Todo Uygulaması
          </h2>
          <TodoInput onAddTodo={handleAddTodo} />
          <TodoSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <TodoList
            todos={filteredTodos}
            searchTerm={searchTerm}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onUpdateTitle={handleUpdateTitle}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
