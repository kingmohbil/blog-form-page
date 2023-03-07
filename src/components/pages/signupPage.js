import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Error from '../error';
import SignupForm from '../forms/signupForm';
import Navbar from '../navbar';

function SignupPage(props) {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const navigation = useNavigate();

  const elements = [
    {
      type: 'text',
      id: 'firstName',
      value: firstName,
      text: 'First Name',
    },
    {
      type: 'text',
      id: 'lastName',
      value: lastName,
      text: 'Last Name',
    },
    {
      type: 'text',
      id: 'username',
      value: username,
      text: 'username',
    },
    {
      type: 'email;',
      id: 'email',
      value: email,
      text: 'Email',
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
      active: false,
    },
    {
      title: 'Sign up',
      href: '/signup',
      active: true,
    },
  ];
  if (errors.length === 0)
    return (
      <>
        <Navbar elements={navElements} />
        <SignupForm
          elements={elements}
          submitHandler={submitHandler}
          btnText="Sign up"
        />
      </>
    );
  else
    return (
      <>
        <Navbar elements={navElements} />
        <div className="errors-container">
          <Errors errors={errors} />
        </div>
        <SignupForm
          elements={elements}
          submitHandler={submitHandler}
          firstName={firstName}
          lastName={lastName}
          email={email}
          password={password}
          username={username}
          btnText="Sign up"
        />
      </>
    );

  async function submitHandler(e) {
    e.preventDefault();

    const { username, password, firstName, lastName, email } = e.target;

    const result = await fetch(
      'https://blog-api-production-23bb.up.railway.app/signup',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          username: username.value,
          password: password.value,
        }),
      }
    );

    const data = await result.json();

    if (result.status === 400) {
      setUsername(username.value);
      setPassword(password.value);
      setFirstName(firstName.value);
      setLastName(lastName.value);
      setEmail(email.value);
      setErrors(data.errors);
    }

    if (result.status === 201) {
      navigation('/login');
    }
  }
}

export default SignupPage;

function Errors(props) {
  const { errors } = props;
  return errors.map((err, index) => <Error msg={err.msg} key={index} />);
}
