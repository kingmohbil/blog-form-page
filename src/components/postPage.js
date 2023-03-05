import { useState } from 'react';
import Input from './formInput';
import Label from './formLabel';
function PostPage(props) {
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState(null);
  const [text, setText] = useState(null);

  return (
    <form className="row g-3" id="login-form" onSubmit={HandleAddPost}>
      <div className="col-md-12">
        <Label text="title" id="title" />
        <Input id="title" type="text" value={title} />
      </div>
      <div className="col-md-12">
        <Label text="text" id="text" />
        <textarea name="text" id="text" className="form-control">
          {text || ''}
        </textarea>
      </div>
      <div className="col-12 text-center">
        <button type="submit" className="btn btn-warning" id="login-btn">
          Add Post
        </button>
      </div>
    </form>
  );

  async function HandleAddPost(e) {
    e.preventDefault();
    const { title, text } = e.target;
    const response = await fetch('http://localhost:5000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user')).token
        }`,
      },
      body: {
        text: text.value,
        title: title.value,
      },
    });
    console.log(response);
  }
}

export default PostPage;
