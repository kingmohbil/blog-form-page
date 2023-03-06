import { useState, useEffect } from 'react';
import Navbar from '../navbar';
import Post from '../post';
const datesManger = new Date();
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
            <Post
              username={post.author.username}
              title={post.title}
              created_at={datesManger.toUTCString(post.created_at)}
              message={post.text}
              postId={post._id}
              key={index}
              on_submit={AddComment}
            />
          );
        })}
      </div>
    </>
  );

  async function getUserPosts() {
    try {
      const response = await fetch(
        'https://blog-api-production-23bb.up.railway.app/posts/user',
        {
          headers: new Headers({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('user')).token
            }`,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) setPosts(data.posts);
      else data.errors.map((error) => console.error(error.msg));
    } catch (error) {
      console.error(error.message);
    }
  }

  async function AddComment(e) {
    e.preventDefault();
    const postId = e.target.getAttribute('data-postid');
    const token = JSON.parse(localStorage.getItem('user')).token;
    try {
      const response = await fetch(
        `https://blog-api-production-23bb.up.railway.app/posts/${postId}/comments`,
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
