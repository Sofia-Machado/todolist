import InputTodo from "./components/CreateTodo";
import ListTodo from "./components/ListTodo";
import Container from '@mui/system/Container';
import useFetch from "./useFetch";
import { useState } from "react";

function App() {
const [important, setImportant] = useState(false);
const { updateItem } = useFetch("http://localhost:8000/")

async function handleImportant(state, body, id) {
  setImportant(state);
  
  console.log(body);
  //update task
  if (id) {
    //hardcoded?
    updateItem(`tasks/${id}`, {...body, important: false})
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(error => console.log('could not fetch data', error))

  }
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
