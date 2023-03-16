import InputTodo from "./components/CreateTodo";
import ListTodo from "./components/ListTodo";
import Container from '@mui/system/Container';
import useFetch from "./useFetch";
import { useState } from "react";

function App() {
const [important, setImportant] = useState(false);
const [update, setUpdate] = useState(false);

  return (
    <Container>
      <div className="App">
        <h2>To do list</h2>
          <InputTodo important={important} setImportant={setImportant} update={update} setUpdate={setUpdate} />
          <ListTodo important={important} setImportant={setImportant} update={update} setUpdate={setUpdate} />
      </div>
    </Container>
  );
}

export default App;
