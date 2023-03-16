import CreateTodo from "./components/CreateTodo";
import ListTodo from "./components/ListTodo";
import CompleteTodos from "./components/CompleteTodos";
import Container from '@mui/system/Container';
import { useState } from "react";
import { Typography } from "@mui/material";

function App() {
const [important, setImportant] = useState(false);
const [update, setUpdate] = useState(false);
const [complete, setComplete] = useState(false);
const [tasks, setTasks] = useState([])


  return (
    <Container maxWidth="sm"
      sx={{padding:"3em"}}>
      <div className="App">
        <Typography variant="h1"
          sx={{fontSize:"4rem" }}
        >To do list</Typography>
          <CreateTodo important={important} setImportant={setImportant} update={update} setUpdate={setUpdate} complete={complete} setComplete={setComplete} />
          <ListTodo important={important} setImportant={setImportant} update={update} setUpdate={setUpdate} tasks={tasks} setTasks={setTasks} />
          <CompleteTodos tasks={tasks} setTasks={setTasks} />
      </div>
    </Container>
  );
}

export default App;
