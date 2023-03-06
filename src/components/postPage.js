import { useState } from 'react';
import PostForm from './postForm';
import Error from './error';

function PostPage(props) {
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState(null);
  const [text, setText] = useState(null);

  if (errors.length === 0) return <PostForm on_submit={HandleAddPost} />;
  else
    return (
      <>
        <div className="errors-container">
          <Errors errors={errors} />
        </div>
        <PostForm on_submit={HandleAddPost} title={title} text={text} />
      </>
    );

  async function HandleAddPost(e) {
    e.preventDefault();
    const tokenObj = JSON.parse(localStorage.getItem('user'));
    const bearerToken = `Bearer ${tokenObj.token}`;
    const { title, text } = e.target;
    try {
      const response = await fetch('http://localhost:5000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearerToken,
        },
        body: JSON.stringify({
          text: text.value,
          title: title.value,
        }),
      });
      const data = await response.json();
      if (response.status !== 200) {
        setTitle(title.value);
        setText(text.value);
        setErrors(data.errors);
      }
    } catch (err) {
      setTitle(title.value);
      setText(text.value);
      setErrors([{ msg: err.message }]);
    }
  }
}

export default PostPage;

function Errors(props) {
  const { errors } = props;
  return errors.map((err, index) => <Error msg={err.msg} key={index} />);
}
