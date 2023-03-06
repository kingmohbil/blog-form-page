import Label from '../form-components/formLabel';
import Input from '../form-components/formInput';
function LoginForm(props) {
  const { elements } = props;
  return (
    <>
      <form className="row g-3" id="login-form" onSubmit={props.submitHandler}>
        {elements.map((element) => {
          return (
            <>
              <div className="col-md-6">
                <Label id={element.id} text={element.text} />
                <Input
                  type={element.type}
                  id={element.id}
                  value={element.value}
                />
              </div>
            </>
          );
        })}
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
