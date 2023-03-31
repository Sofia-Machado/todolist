import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import TodoListPage from './pages/TodoListPage';
import About from './pages/About';
import Login from './pages/Login';
import NavbarComponent from './components/NavbarComponent';

const queryClient = new QueryClient()

function App() {
  const [login, setLogin] = useState(false);
  //change to test

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <NavbarComponent login={login} setLogin={setLogin} />
        <Routes>
          <Route path='/' element={login ? <TodoListPage /> : <Login setLogin={setLogin} />} />
          <Route path='about' element={login ? <About /> : <Navigate to='/' replace />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  )
}

export default App;