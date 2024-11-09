import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { profiles, posts } from '../data';
import Sphere360 from './Sphere360';

interface ProfilePageProps {
  loggedInUserId: number;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ loggedInUserId }) => {
  const [selectedVisibility, setSelectedVisibility] = useState<number | null>(null);

  // Filter posts based on the selected visibility
  const filteredPosts = posts.filter((post) => {
    if (selectedVisibility === null) return false; // No folder selected
    if (post.profileId !== loggedInUserId && selectedVisibility !== 1) return false; // Only show user's posts unless it is "Private"
    
    // Show all posts if "Private" is selected
    if (selectedVisibility === 1) {
      return post.profileId === loggedInUserId;
    }
    
    // Filter posts based on visibility for "Friends" and "Public" folders
    return post.visibility === selectedVisibility;
  });

  // Get profile name for display (assuming you want to show the profile's own name)
  const profile = profiles.find((p) => p.id === loggedInUserId);

  return (
    <div style={{ padding: '20px' }}>
      <h1>{profile ? `${profile.name} ${profile.lastName}` : 'User'}'s Profile</h1>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        {/* Folder Buttons */}
        <button onClick={() => setSelectedVisibility(1)} style={{ padding: '10px 20px' }}>Private</button>
        <button onClick={() => setSelectedVisibility(2)} style={{ padding: '10px 20px' }}>Friends</button>
        <button onClick={() => setSelectedVisibility(3)} style={{ padding: '10px 20px' }}>Public</button>
      </div>

      {/* Display posts based on the selected folder */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', maxWidth: '400px', margin: 'auto' }}>
              <Canvas style={{ height: '300px' }}>
                <OrbitControls enableZoom={false} />
                <Sphere360 imageUrl={post.img_url} />
              </Canvas>
              <p style={{ marginTop: '10px', textAlign: 'center', fontStyle: 'italic' }}>{post.caption}</p>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center' }}>No posts to display for this folder.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
