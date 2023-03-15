import InputTodo from "./components/CreateTodo";
import Container from '@mui/system/Container';
import ListTodo from "./components/ListTodo";

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
