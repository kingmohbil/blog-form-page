function FormLabel(props) {
  return (
    <label htmlFor={props.id} className="form-label">
      {props.text}
    </label>
  );
}

export default FormLabel;
