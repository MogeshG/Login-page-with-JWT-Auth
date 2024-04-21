// MenuPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MenuPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://your-backend-api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <div>
      <h1>Menu</h1>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <h2>{post.username}</h2>
            <p>Age: {post.age}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuPage;
