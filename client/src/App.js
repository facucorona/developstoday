import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Components/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Cambia 'component' por 'element' */}
          {/* <Route path="/:id" element={<Detail />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
