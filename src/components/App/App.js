import React from 'react';
import logo from './logo-wolt.svg';
import logoTm from './logo-thomas.svg';
import './App.scss';

// Children
import OpeningHours from '../OpeningHours/OpeningHours';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <OpeningHours></OpeningHours>
        <a href="https://wolt.fi/" className="App-logo">
          demo for<br />
          <img src={logo} className="App-logo-img" alt="logo" />
        </a>
        <a href="https://github.com/thomasmoon" className="App-tm">
          by Thomas Moon<br />
          <img src={logoTm} className="App-tm-img" alt="Thomas Moon" />
        </a>
      </header>
    </div>
  );
}

export default App;
