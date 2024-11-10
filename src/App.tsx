// Update src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import PostsPage from './components/PostsPage';
import ProfilePage from './components/ProfilePage';
import AvailableGamesPage from './components/AvailableGamesPage';
import GameDetailPage from './components/GameDetailPage';
interface AppProps {
    isWebXrSupported: boolean;
} 

const App: React.FC<AppProps> = ({isWebXrSupported  }) => {
  const loggedInUserId = 2;

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<PostsPage loggedInUserId={loggedInUserId} isWebXrSupported={isWebXrSupported}/>} />
        <Route path="/profile" element={<ProfilePage loggedInUserId={loggedInUserId} isWebXrSupported={isWebXrSupported}/>} />
        <Route path="/games" element={<AvailableGamesPage loggedInUserId={loggedInUserId} />} />
        <Route path="/games/:gameId" element={<GameDetailPage />} /> {/* New route */}
      </Routes>
    </Router>
  );
};

export default App;
