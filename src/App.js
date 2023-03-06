import { useState } from 'react';
import './App.css';
import LoginPage from './components/LoginPage';
import Navbar from './components/navbar';
import AddPost from './components/postPage';
import Post from './components/post';

function App() {
  const [user, setUser] = useState(localStorage.getItem('user'));
  if (!user)
    return (
      <div className="App">
        <Navbar elements={[{ title: 'Home', href: '/', active: true }]} />
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
        <Post title="Welcione" />
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
