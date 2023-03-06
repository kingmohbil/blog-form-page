import Input from '../form-components/formInput';
import Label from '../form-components/formLabel';
function PostForm(props) {
  return (
    <form className="row g-3" id="login-form" onSubmit={props.on_submit}>
      <div className="col-md-12">
        <Label text="title" id="title" />
        <Input id="title" type="text" value={props.title} />
      </div>
      <div className="col-md-12">
        <Label text="text" id="text" />
        <textarea
          name="text"
          id="text"
          className="form-control"
          defaultValue={props.text || ''}
        ></textarea>
      </div>
      <div className="col-12 text-center">
        <button type="submit" className="btn btn-warning" id="login-btn">
          Add Post
        </button>
      </div>
    </form>
  );
}

export default PostForm;
