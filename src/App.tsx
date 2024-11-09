import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import PostsPage from './components/PostsPage'; // Home page
import ProfilePage from './components/ProfilePage'; // Profile page

const App: React.FC = () => {
  const loggedInUserId = 2; // Example logged-in user ID

  return (
    <Router>
      <nav style={{ padding: '10px' }}>
        <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
        <Link to="/profile">Profile</Link>
      </nav>
      <Routes>
        <Route path="/" element={<PostsPage  loggedInUserId={loggedInUserId} />} />
        <Route path="/profile" element={<ProfilePage loggedInUserId={loggedInUserId} />} />
      </Routes>
    </Router>
  );
};

export default App;
