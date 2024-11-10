import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { profiles, posts } from '../data';
import Sphere360 from './Sphere360';
import { XR, createXRStore } from '@react-three/xr';

const xrStore = createXRStore();

interface ProfilePageProps {
  loggedInUserId: number;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ loggedInUserId }) => {
  const [selectedVisibility, setSelectedVisibility] = useState<number | null>(1);
  const profile = profiles.find((p) => p.id === loggedInUserId);
  
  const filteredPosts = posts.filter((post) => {
    if (selectedVisibility === null) return false;
    if (post.profileId !== loggedInUserId && selectedVisibility !== 1) return false;
    if (selectedVisibility === 1) return post.profileId === loggedInUserId;
    return post.visibility === selectedVisibility;
  });

  return (
    <div className="posts-page">
      <h1>{profile ? `${profile.name} ${profile.lastName}` : 'User'}'s Profile</h1>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <button onClick={() => setSelectedVisibility(1)}>Private</button>
        <button onClick={() => setSelectedVisibility(2)}>Friends</button>
        <button onClick={() => setSelectedVisibility(3)}>Public</button>
      </div>

      <div className="posts-container">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post.id} className="post-card">
              <div className="post-author">{post.location}</div>
              <div className="canvas-container">
                <button
                  className="material-button ar-button"
                  onClick={() => xrStore.enterAR()}
                >
                  Enter AR
                </button>
                <Canvas>
                  <XR store={xrStore}>
                    <OrbitControls enableZoom={false} />
                    <Sphere360 imageUrl={post.img_url} />
                  </XR>
                </Canvas>
              </div>
              <div className="post-caption"><b>{profile?.name} {profile?.lastName}</b>: {post.caption}</div>
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