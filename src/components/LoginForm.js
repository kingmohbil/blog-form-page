function LoginForm(props) {
  console.log(props);
  return (
    <>
      <form className="row g-3" id="login-form" onSubmit={props.submitHandler}>
        <div className="col-md-6">
          <label htmlFor="username" className="form-label">
            username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            autoComplete="on"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="password" className="form-label">
            password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            autoComplete="on"
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

export default LoginForm;
