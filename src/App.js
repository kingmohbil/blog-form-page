import { useState } from 'react';
import './App.css';
import LoginPage from './components/LoginPage';
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
        <button
          onClick={() => {
            localStorage.removeItem('user');
            setUser(false);
          }}
        >
          Logout
        </button>
      </div>
    );

  function updateUser() {
    setUser(true);
  }
}

export default App;
