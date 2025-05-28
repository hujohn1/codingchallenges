import React, { useState } from 'react';
import './App.css';
import Todo from './components/Todo';

const App: React.FC = () => {
  const [todos, setTodos]=useState<Todo[]>([]);
  const [newTodo, setNewTodo]=useState<string>('');

  const deleteTodo=(target: number): void=>{
    const updatedTodos = todos.filter((todo)=>(todo.id!==target));
    setTodos(updatedTodos);
  }
  
  const toggleCompleted=(id: number): void=>{
      setTodos(todos.map((todo)=>todo.id===id ? {...todo, completed: !todo.completed}: todo));
  }

  const handleChange=(event:React.ChangeEvent<HTMLInputElement>):void=>{
    setNewTodo(event.target.value);
  }

  const addTodo=(field:string): void=>{
    const todoItem : Todo={
      id: Date.now(), 
      field: newTodo, 
      completed: false
    }
    setTodos([...todos, todoItem]);
    setNewTodo('');
  }
  

  return (
    <div>
      <h1>My ToDo List</h1>
      <input type="text" value={newTodo} onChange={handleChange}></input>
      <ul>
        {todos.map((todo)=>(     
          <Todo key={todo.id} todo={todo} onDelete={deleteTodo} onModify={toggleCompleted}/>
        ))}
      </ul>
      <button onClick={() => addTodo('New Task')}>Add Todo</button>
    </div>
  );
};

export default App;
