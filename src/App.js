import InputTodo from "./components/CreateTodo";
import ListTodo from "./components/ListTodo";
import Container from '@mui/system/Container';
import useFetch from "./useFetch";
import { useState } from "react";
import { Typography } from "@mui/material";

function App() {
const [important, setImportant] = useState(false);
const [update, setUpdate] = useState(false);

  return (
    <Container maxWidth="sm"
      sx={{padding:"3em"}}>
      <div className="App">
        <Typography variant="h1"
          sx={{fontSize:"4rem" }}
        >To do list</Typography>
          <InputTodo important={important} setImportant={setImportant} update={update} setUpdate={setUpdate} />
          <ListTodo important={important} setImportant={setImportant} update={update} setUpdate={setUpdate} />
      </div>
    </Container>
  );
}

export default App;
