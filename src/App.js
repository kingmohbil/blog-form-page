import { useState } from 'react';
import './App.css';
import LoginPage from './components/LoginPage';
import Navbar from './components/navbar';
import AddPost from './components/postPage';
function App() {
  const [user, setUser] = useState(localStorage.getItem('user'));
  if (!user)
    return (
      <div className="App">
        <LoginPage updateUser={updateUser} />
      </div>
    );
  else
    return (
      <div className="App">
        <Navbar
          elements={[
            {
              title: 'Logout',
              active: false,
              on_click: onLogout,
            },
          ]}
        />
        <AddPost />
      </div>
    );

  function onLogout() {
    localStorage.removeItem('user');
    setUser(false);
  }

  function updateUser() {
    setUser(true);
  }
}

export default App;
