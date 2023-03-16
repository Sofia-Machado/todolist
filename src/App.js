import InputTodo from "./components/CreateTodo";
import ListTodo from "./components/ListTodo";
import Container from '@mui/system/Container';
import { useState } from "react";

function App() {
const [important, setImportant] = useState(false);

function handleImportant(state, id) {
  setImportant(state);
  console.log(important);
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
