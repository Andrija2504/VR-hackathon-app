import React from 'react';
import { Link } from 'react-router-dom';
import { games, friends } from '../data';

interface AvailableGamesPageProps {
  loggedInUserId: number;
}

const AvailableGamesPage: React.FC<AvailableGamesPageProps> = ({ loggedInUserId }) => {
  // Check if a user is a friend
  const isFriend = (userId: number): boolean => {
    return friends.some(
      (f) => (f.userId === loggedInUserId && f.friendId === userId) || (f.friendId === loggedInUserId && f.userId === userId)
    );
  };

  // Filter games created by friends
  const availableGames = games.filter((game) => isFriend(game.createdByUserId));

  return (
    <div style={{ padding: '20px' }}>
      <h1>Available Games from Friends</h1>
      {availableGames.length > 0 ? (
        <ul>
          {availableGames.map((game) => (
            <li key={game.gameId}>
              <Link to={`/games/${game.gameId}`}>
                <strong>{game.name}</strong> (Created by User ID: {game.createdByUserId})
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No available games from friends.</p>
      )}
    </div>
  );
};

export default AvailableGamesPage;
