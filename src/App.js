import { useState , useEffect } from 'react';
import './App.css';
import axios from 'axios';


const App = () => {

  const [todo , setTodo] = useState([]);

  const DATA_URL = 'http://localhost:8080/api/todoList';

  function fetchData(){

    axios.get(DATA_URL)

    .then((response) => {

      console.log(response);
      setTodo(response.data);

    })

    .catch((error) => {

      console.log(error);

    })
    

  }

  useEffect( () => {

     fetchData();

  },[])

  function setTodohandle(e){
      e.preventDefault();

     const content = e.target.content.value;
     const done = e.target.done.checked;

     axios.post(DATA_URL , { content, done })
     .then(() => fetchData());

  }

  
  return (
    <div className="App">
      <h1>TODO LIST</h1>
      <div className="todoWrap">
         <form onSubmit={setTodohandle}>
           <input name="content" />
           <input name="done" type='checkbox' className='chx_box'/>
           <input type="submit" value='+' />
         </form>
      </div>
      {todo.map((todo, idx) => (
      <div className="todo_result" key={todo.id + idx}>
         <ul>
           <li>{todo.id}</li>
           <li>{todo.content}</li>
           <li>{todo.done ? 'YES' : 'NO'}</li>
         </ul>
      </div>
      ))}
    </div>
  );
}

export default App;
