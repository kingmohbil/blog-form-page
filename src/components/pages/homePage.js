import { useState, useEffect } from 'react';
import Navbar from '../navbar';
import Comment from '../forms/commentForm';
const Home = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getUserPosts();
  }, []);
  const Elements = [
    {
      title: 'Home',
      active: true,
      href: '/',
    },
    {
      title: 'Add Post',
      active: false,
      href: '/addPost',
    },
    {
      title: 'Logout',
      active: false,
      on_click: props.Logout,
    },
  ];

  return (
    <>
      <Navbar elements={Elements} />
      <div className="posts-container">
        {posts.map((post, index) => {
          return (
            <div key={index}>
              <div>{post.title}</div>
              <Comment postId={post._id} on_submit={AddComment} />
            </div>
          );
        })}
      </div>
    </>
  );

  async function getUserPosts() {
    try {
      const response = await fetch('http://localhost:5000/posts/user', {
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('user')).token
          }`,
        }),
      });
      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function AddComment(e) {
    e.preventDefault();
    const postId = e.target.getAttribute('data-postId');
    const token = JSON.parse(localStorage.getItem('user')).token;
    try {
      const response = await fetch(
        `http://localhost:5000/posts/${postId}/comments`,
        {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }),
          body: JSON.stringify({
            text: e.target.comment.value || '',
          }),
        }
      );

      if (response.ok) {
        return console.log('success');
      }
      const data = await response.json();
      data.errors.map((error) => console.error(error.msg));
    } catch (err) {
      console.error(err.message);
    }
  }
};

export default Home;
