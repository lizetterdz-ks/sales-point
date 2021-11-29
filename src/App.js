import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import Cart from './views/Cart';
import Reports from './views/Reports';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Dashboard />}/>
        <Route path='/dashboard' exact element={<Dashboard />} />
        <Route path='/cart' exact element={<Cart />} />
        <Route path='/reports' exact element={<Reports />} />
      </Routes> 
    </BrowserRouter>
  );
}

export default App;
