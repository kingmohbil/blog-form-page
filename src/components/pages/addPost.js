import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar';
import PostForm from '../forms/postForm';
import Error from '../error';

const PostPage = (props) => {
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState(null);
  const [text, setText] = useState(null);
  const navigate = useNavigate();

  const Elements = [
    {
      title: 'Home',
      active: false,
      href: '/',
    },
    {
      title: 'Add Post',
      active: true,
      href: '/addPost',
    },
    {
      title: 'Logout',
      active: false,
      on_click: props.Logout,
    },
  ];

  if (errors.length === 0)
    return (
      <>
        <Navbar elements={Elements} />
        <PostForm on_submit={HandleAddPost} />
      </>
    );
  return (
    <>
      <Navbar elements={Elements} />
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

      if (response.status === 200) {
        navigate('/');
      } else {
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
};

export default PostPage;

function Errors(props) {
  const { errors } = props;
  return errors.map((err, index) => <Error msg={err.msg} key={index} />);
}
