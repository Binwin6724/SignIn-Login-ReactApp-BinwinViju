import './App.css';
import { Route, Routes } from 'react-router-dom'
import Login from './Components/js/Login';
import Register from './Components/js/Register';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
