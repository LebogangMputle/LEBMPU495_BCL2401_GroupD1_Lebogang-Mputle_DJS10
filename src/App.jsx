import { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const errorImage = '/images/error-message.png'; // Path to error image

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.response}`);
        }
        return response.json();
      })
      .then(data => setPosts(data))
      .catch(error => setError({ message: error.message, image: errorImage }));
  }, []);

  if (error) {
    return (
      <div className="error">
        <img src={error.image} alt="Error message" />
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Blog Posts</h1>
      {posts.length > 0 ? (
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading posts...</p>
      )}
    </div>
  );
}
