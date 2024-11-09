// Update src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import PostsPage from './components/PostsPage';
import ProfilePage from './components/ProfilePage';
import AvailableGamesPage from './components/AvailableGamesPage';
import GameDetailPage from './components/GameDetailPage';

const App: React.FC = () => {
  const loggedInUserId = 2;

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<PostsPage loggedInUserId={loggedInUserId} />} />
        <Route path="/profile" element={<ProfilePage loggedInUserId={loggedInUserId} />} />
        <Route path="/games" element={<AvailableGamesPage loggedInUserId={loggedInUserId} />} />
        <Route path="/games/:gameId" element={<GameDetailPage />} /> {/* New route */}
      </Routes>
    </Router>
  );
};

export default App;