import React from 'react';
import { FaSearch } from 'react-icons/fa';

const TodoSearch = ({searchTerm, setSearchTerm}) => (
    <div className='input-group mb-4'>
        <span className='input-group-text bg-light border-end-0'>
            <FaSearch className='text-muted'  />
        </span>

        <input
        type='text'
        className='form-control bg-light border-start-0 shadow-none'
        placeholder='Görevlerde ara...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />

    </div>
  
);

export default TodoSearch;
