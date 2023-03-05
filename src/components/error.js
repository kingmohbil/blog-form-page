function Error(props) {
  return (
    <div className="alert alert-danger" role="alert" id="error">
      {props.msg}
    </div>
  );
}

export default Error;
