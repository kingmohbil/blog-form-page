import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import ProtectLogin from './components/protection/protectLogin';
import Protected from './components/protection/protected';
import AddPost from './components/pages/addPost';
import Home from './components/pages/homePage';

function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('user') != null
  );

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Protected isLoggedIn={loggedIn}>
                <Home Logout={logout} />
              </Protected>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectLogin isLoggedIn={loggedIn}>
                <LoginPage Login={login} />
              </ProtectLogin>
            }
          />
          <Route
            path="/addPost"
            element={
              <Protected isLoggedIn={loggedIn}>
                <AddPost Logout={logout} />
              </Protected>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );

  function login() {
    setLoggedIn(true);
  }

  function logout() {
    localStorage.removeItem('user');
    setLoggedIn(false);
  }
}

export default App;
