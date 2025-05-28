interface Todo{
  id: number;
  field: string;
  completed: boolean;
}

interface TodoProps{
  todo: Todo;
  onDelete: (id: number)=>void;
  onModify : (id: number)=>void;
}
  
const Todo: React.FC<TodoProps> = ({todo, onDelete, onModify}) => {
  return (
    <>
      <li>
        {todo.field}
        <button onClick={()=>onModify(todo.id)}>{todo.completed ? 'Mark Incomplete': 'Mark Complete'}</button>
        <button onClick={()=>onDelete(todo.id)}>Delete</button>

      </li>
    </>
  );
};
  
export default Todo;
  