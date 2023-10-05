import React from 'react';

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Home from './pages/home';
import Books from './pages/books';
import Login from './pages/login';
import Logout from './pages/util/logout';


import Nav from './pages/util/nav';
import './styles/App.scss';

import { UserProvider } from './UserProvider';
import { DataProvider } from './DataProvider';
import ProtectedRoute from "./pages/util/ProtectedRoute";

function App() {
  return (
    <DataProvider>
      <UserProvider>
        <main className="App">
          <Router basename={"/"}>
            <Nav/>
            <section>
              <Routes>
                  <Route path="/" element={
                    <ProtectedRoute accessBy="non-authenticated">                      
                      <Login />
                    </ProtectedRoute>
                  } />                
                  <Route path="/home" element={
                    <ProtectedRoute accessBy="authenticated">
                      <Home />
                    </ProtectedRoute>             
                  } />   
                  <Route path="/libros" element={
                    <ProtectedRoute accessBy="authenticated">
                      <Books />
                    </ProtectedRoute>             
                  } />                
                  <Route path="/logout" element={
                    <ProtectedRoute accessBy="authenticated">
                      <Logout />
                    </ProtectedRoute>             
                  } />                
              </Routes>
            </section>
          </Router  >
        </main>
      </UserProvider>
    </DataProvider>
  );
}

export default App;
