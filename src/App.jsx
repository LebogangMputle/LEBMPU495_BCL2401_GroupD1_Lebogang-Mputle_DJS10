import { useState, useEffect } from 'react';
import './App.css';

export default function App() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/pos')
        .then(response => {
          if (!response.ok) {
            throw new Error('HTTP error! status: ' + response.status);
          }
          return response.json();
        })
        .then(data => setPosts(data))
        .catch(error => setError(error.message));
    }, []);
  
    if (error) {
      return <div className="error">{error}</div>;
    }
  
    return (
      <div>
        {posts.map(post => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    );
  }

