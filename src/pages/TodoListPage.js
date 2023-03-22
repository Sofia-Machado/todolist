import CreateTodo from "../components/CreateTodo";
import ListTodo from "../components/ListTodo";
import { useState } from "react";
import { Typography } from "@mui/material";

const TodoListPage = () => {

  const [complete, setComplete] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [update, setUpdate] = useState(false);

  return (
      <div className="todolist-page">
        <Typography variant="h1"
          sx={{fontSize:"4rem", paddingTop:"0.5em" }}
        >To do list</Typography>
          <CreateTodo update={update} setUpdate={setUpdate} />
          <ListTodo 
            complete={complete} setComplete={setComplete}
            update={update} setUpdate={setUpdate} 
            tasks={tasks} setTasks={setTasks}
          />
      </div>
  );
}

export default TodoListPage;
