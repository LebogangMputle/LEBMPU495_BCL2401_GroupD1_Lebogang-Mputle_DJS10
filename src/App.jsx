import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import './App.css';
import errorImage from '/images/error-message.png'; // Import error image

export default function App() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts') // Fix typo (should be 'posts')
      .then(response => {
        if (!response.ok) {
          throw new Error('HTTP error! status: ' + response.status);
        }
        return response.json();
      })
      .then(data => setPosts(data))
      .catch(error => setError(error.message));
  }, []);

  return (
    <div className='App'>
      {error ? (
        // Render only the error image when there's an error
        <div className='error-container'>
          <img src={errorImage} alt="Error Fetching Posts" className="error-image" />
        </div>
      ) : (
        // Render header, posts, and footer when there's no error
        <>
          <Header />
          {posts.map(post => (
            <div key={(post.id)}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          ))}
          <Footer />
        </>
      )}
    </div>
  );
}