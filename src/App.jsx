import { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [posts, setPosts] = useState([]); // State to store fetched posts
  const [error, setError] = useState(null); // State to store error message (if any)
  const errorImage = '/images/error-message.png'; // Path to error image

  // Fetches blog posts data using the Fetch API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.response}`);
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError({ message: error.message, image: errorImage });
      }
    };

    fetchData(); // Call the fetchData function on component mount
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
