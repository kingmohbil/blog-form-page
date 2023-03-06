function FormInput(props) {
  return (
    <input
      type={props.type}
      className="form-control"
      name={props.id}
      id={props.id}
      autoComplete="on"
      defaultValue={props.value || ''}
    />
  );
}

export default FormInput;
