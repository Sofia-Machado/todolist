import InputTodo from "./components/CreateTodo";
import ListTodo from "./components/ListTodo";
import Container from '@mui/system/Container';
import useFetch from "./useFetch";
import { useState } from "react";

function App() {
const [important, setImportant] = useState(false);
const { updateItem } = useFetch("http://localhost:8000/")


  return (
    <Container>
      <div className="App">
        <h2>To do list</h2>
          <InputTodo important={important} setImportant={setImportant} />
          <ListTodo important={important} setImportant={setImportant} />
      </div>
    </Container>
  );
}

export default App;
