import { useState } from 'react';
import Error from './error';
import LoginForm from './LoginForm';
import Navbar from './navbar';

function LoginPage(props) {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const elements = [
    {
      type: 'text',
      id: 'username',
      value: username,
      text: 'username',
    },
    {
      type: 'password',
      id: 'password',
      value: password,
      text: 'password',
    },
  ];

  if (errors.length === 0)
    return (
      <>
        <Navbar elements={[{ title: 'Home', href: '/', active: true }]} />
        <LoginForm elements={elements} submitHandler={submitHandler} />
      </>
    );
  else
    return (
      <>
        <Navbar elements={[{ title: 'Home', href: '/', active: true }]} />
        <div className="errors-container">
          <Errors errors={errors} />
        </div>
        <LoginForm
          submitHandler={submitHandler}
          password={password}
          username={username}
        />
      </>
    );

  async function submitHandler(e) {
    e.preventDefault();
    console.log('submitting');
    const { username, password } = e.target;

    const result = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });

    const data = await result.json();
    console.log(data);

    if (result.status === 400) {
      setUsername(username.value);
      setPassword(password.value);
      setErrors(data.errors);
    }

    if (result.status === 200) {
      localStorage.setItem(
        'user',
        JSON.stringify({
          token: data.token,
        })
      );
      props.updateUser();
    }
  }
}

export default LoginPage;

function Errors(props) {
  const { errors } = props;
  return errors.map((err, index) => <Error msg={err.msg} key={index} />);
}
