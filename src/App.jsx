import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import './App.css';
import errorImage from '/images/error-message.png'// Import error image

export default function App() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/pos') // Fix typo (should be 'posts')
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
    return (
      <div className="error">
        <img src={errorImage} alt="Error Fetching Posts" /> {/* Display error image */}
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className='App'>
      <Header />
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
      <Footer />
    </div>
  );
}
