import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from '@mui/system/Container';
import TodoListPage from './pages/TodoListPage';
import About from './pages/About';
import Login from './pages/Login';

function App() {
  const [login, setLogin] = useState(false);

  return (
    <BrowserRouter>
      <Container maxWidth="sm">
        <Routes>
          <Route path='/' element={login ? <TodoListPage /> : <Login login={login} setLogin={setLogin} />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App;