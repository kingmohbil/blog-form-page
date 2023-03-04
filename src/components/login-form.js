import { useState } from 'react';
import Error from './error';
function LoginForm() {
  const [errors, setErrors] = useState([]);
  if (errors.length === 0)
    return (
      <>
        <Form />
      </>
    );
  else
    return (
      <>
        <div className="errors-container">
          <Errors errors={errors} />
        </div>
        <Form />
      </>
    );

  async function onSubmit(e) {
    e.preventDefault();
    const { username, password } = e.target;
    const result = await fetch('http://localhost:5000/login', {
      method: 'POST',
    });
    const data = await result.json();
    console.log(data);
    if (result.status === 400) setErrors(data.errors);
  }
  function Form() {
    return (
      <>
        <form className="row g-3" id="login-form" onSubmit={onSubmit}>
          <div className="col-md-6">
            <label htmlFor="username" className="form-label">
              username
            </label>
            <input type="text" className="form-control" id="username" />
          </div>
          <div className="col-md-6">
            <label htmlFor="password" className="form-label">
              password
            </label>
            <input
              type="text"
              className="form-control"
              id="password"
              name="password"
            />
          </div>
          <div className="col-12 text-center">
            <button type="submit" className="btn btn-warning" id="login-btn">
              Sign in
            </button>
          </div>
        </form>
      </>
    );
  }
}

export default LoginForm;

function Errors(props) {
  const { errors } = props;
  return errors.map((err, index) => <Error msg={err.msg} key={index} />);
}
