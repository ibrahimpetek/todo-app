import React, { useState } from 'react';
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

const TodoItem = ({ todo, onToggle, onDelete, onUpdateTitle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState(todo.title);

  const handleSave = () => {
    if (!editingTitle.trim()) return;
    onUpdateTitle(todo, editingTitle);
    setIsEditing(false);
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center py-3 border-bottom">
      {isEditing ? (
        <div className="d-flex flex-grow-1 gap-2">
          <input
            type="text"
            className="form-control"
            value={editingTitle}
            onChange={(e) => setEditingTitle(e.target.value)}
          />
          <button onClick={handleSave} className="btn btn-success" title="Kaydet">
            <FaCheck />
          </button>
          <button onClick={() => setIsEditing(false)} className="btn btn-secondary" title="İptal">
            <FaTimes />
          </button>
        </div>
      ) : (
        <>
          <span
            onClick={() => onToggle(todo)}
            style={{
              cursor: 'pointer',
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? '#adb5bd' : '#212529',
              fontWeight: '500',
            }}
            className="flex-grow-1 user-select-none"
          >
            {todo.completed ? '✅ ' : '⏳ '}
            {todo.title}
          </span>
          <div className="d-flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-outline-warning btn-sm d-flex align-items-center justify-content-center"
              style={{ width: '36px', height: '36px' }}
              title="Düzenle"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="btn btn-outline-danger btn-sm d-flex align-items-center justify-content-center"
              style={{ width: '36px', height: '36px' }}
              title="Sil"
            >
              <FaTrash />
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;
