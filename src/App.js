import React from 'react';

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Home from './pages/home';
import Usuarios from './pages/usuarios';
import Posts from './pages/posts';

import Nav from './pages/util/nav';
import './styles/App.scss';

import { UserProvider } from './UserProvider';
import { DataProvider } from './DataProvider';

function App() {
  return (
    <DataProvider>
      <UserProvider>
        <main className="App">
          <Router basename={"/"}>
            <Nav/>
            <section>
              <Routes>
                <Route path="/" element={<Home />} />                
                <Route path="/home" element={<Home />} />                
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/posts" element={<Posts />} />                
              </Routes>
            </section>
          </Router  >
        </main>
      </UserProvider>
    </DataProvider>
  );
}

export default App;
