import InputTodo from "./components/CreateTodo";
import ListTodo from "./components/ListTodo";
import Container from '@mui/system/Container';

function App() {


  return (
    <Container>
      <div className="App">
        <h2>To do list</h2>
          <InputTodo />
          <ListTodo />
      </div>
    </Container>
  );
}

export default App;
