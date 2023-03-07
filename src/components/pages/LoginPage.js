import { useState } from 'react';
import Error from '../error';
import LoginForm from '../forms/LoginForm';
import Navbar from '../navbar';

function LoginPage(props) {
  const [errors, setErrors] = useState(null);
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
  const navElements = [
    {
      title: 'Login',
      href: '/login',
      active: true,
    },
    {
      title: 'Sign up',
      href: '/signup',
      active: false,
    },
  ];
  if (!errors)
    return (
      <>
        <Navbar elements={navElements} />
        <LoginForm elements={elements} submitHandler={submitHandler} />
      </>
    );
  else
    return (
      <>
        <Navbar elements={navElements} />
        <div className="errors-container">
          <Errors errors={errors} />
        </div>
        <LoginForm
          elements={elements}
          submitHandler={submitHandler}
          password={password}
          username={username}
        />
      </>
    );

  async function submitHandler(e) {
    e.preventDefault();

    const { username, password } = e.target;
    try {
      const response = await fetch(
        'https://blog-api-production-23bb.up.railway.app/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username.value,
            password: password.value,
          }),
        }
      );

      const data = await response.json();
      if (response.status === 400 || response.status === 403) {
        setUsername(username.value);
        setPassword(password.value);
        setErrors(data.errors);
      }
      if (response.status === 200) {
        localStorage.setItem(
          'user',
          JSON.stringify({
            token: data.token,
          })
        );
        props.Login();
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default LoginPage;

function Errors(props) {
  const { errors } = props;
  return errors.map((err, index) => <Error msg={err.msg} key={index} />);
}
