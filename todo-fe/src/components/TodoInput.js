import React ,{useState} from "react";
import { FaPlus } from "react-icons/fa";



const TodoInput = ({onAddTodo}) => {
    const [newTitle, setNewTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newTitle.trim()) return;
        onAddTodo(newTitle);
        setNewTitle('');
    };

  return (
   <form onSubmit={handleSubmit} className="d-flex gap-2 mb-3">
    <input
        type="text"
        className="form-control form-control-lg shadow-none"
        placeholder="Yeni bir görev ekle..."
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
     />
     <button type="submit" className="btn btn-primary btn-lg d-flex align-items-center gap-1">
        <FaPlus />Ekle

     </button>


   </form>
  )
}

export default TodoInput;
