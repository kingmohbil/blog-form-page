import { useState, useEffect } from 'react';
import Navbar from '../navbar';
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
          return <div key={index}>{post.title}</div>;
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
};

export default Home;
