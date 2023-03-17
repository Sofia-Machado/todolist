import CreateTodo from "./components/CreateTodo";
import ListTodo from "./components/ListTodo";
import Container from '@mui/system/Container';
import { useState } from "react";
import { Typography } from "@mui/material";

function App() {
const [important, setImportant] = useState(null);
const [update, setUpdate] = useState(false);
const [tasks, setTasks] = useState([]);
const [newTask, setNewTask] = useState(true);

  return (
    <Container maxWidth="sm">
      <div className="App">
        <Typography variant="h1"
          sx={{fontSize:"4rem", paddingTop:"0.5em" }}
        >To do list</Typography>
          <CreateTodo update={update} setUpdate={setUpdate} newTask={newTask} setNewTask={setNewTask} />
          <ListTodo important={important} setImportant={setImportant} update={update} setUpdate={setUpdate} tasks={tasks} setTasks={setTasks} newTask={newTask} setNewTask={setNewTask} />
      </div>
    </Container>
  );
}

export default App;
