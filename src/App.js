import InputTodo from "./components/CreateTodo";
import ListTodo from "./components/ListTodo";
import Container from '@mui/system/Container';
import useFetch from "./useFetch";
import { useState } from "react";

function App() {
const [important, setImportant] = useState(false);
const { updateItem } = useFetch("http://localhost:8000/")

function handleImportant(state) {
  setImportant(state);
}

  return (
    <Container>
      <div className="App">
        <h2>To do list</h2>
          <InputTodo important={important} onImportant={handleImportant} />
          <ListTodo important={important} onImportant={handleImportant} />
      </div>
    </Container>
  );
}

export default App;
