import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, searchTerm, onToggle, onDelete, onUpdateTitle }) => {
  if (todos.length === 0) {
    return (
      <p className="text-center text-muted py-4">
        {searchTerm ? 'Aramanıza uygun görev bulunamadı.' : 'Henüz hiç görev yok.'}
      </p>
    );
  }

  return (
    <ul className="list-group list-group-flush">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdateTitle={onUpdateTitle}
        />
      ))}
    </ul>
  );
};

export default TodoList;