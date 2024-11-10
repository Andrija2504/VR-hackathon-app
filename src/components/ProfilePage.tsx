import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { profiles, posts } from '../data';
import Sphere360 from './Sphere360';

interface ProfilePageProps {
  loggedInUserId: number;
  isWebXrSupported: boolean;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ loggedInUserId, isWebXrSupported  }) => {

    const [vrSession, setVrSession] = useState<XRSession | null>(null);

    const startVrSession = async (postImageUrl: string) => {
       
       
        
    };

    
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
      <h1>{profile ? ${profile.name} ${profile.lastName} : 'User'}'s Profile</h1>

        {/*{filteredPosts.length > 0 && isWebXrSupported && (*/}
        {/*    <button onClick={startVrSession}>Enter VR</button>*/}
        {/*)}*/}
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <button onClick={() => setSelectedVisibility(1)}>Private</button>
        <button onClick={() => setSelectedVisibility(2)}>Friends</button>
        <button onClick={() => setSelectedVisibility(3)}>Public</button>
      </div>
        <div style={{ textAlign: 'center', padding: '20px', fontSize: '20px', fontWeight: 'bold' }}>
            {isWebXrSupported ? "VR/AR Supported" : "VR/AR Not Supported"}
        </div>
        <div>
            <p>window.orientation: ${window.orientation}</p>
        </div>
        <div>
            <p>window.screen.width: ${window.screen.width}</p>
        </div>
        <div>
            <p>window.screen.height: ${window.screen.height}</p>
        </div>
        <div>
            <p>window.devicePixelRatio: ${window.devicePixelRatio}</p>
        </div>
        <div>
            <p>
                {window.devicePixelRatio === 1 ? "===" : "!=="}
            </p>
        </div>
        <div>
            <p>
                {window.devicePixelRatio == 1 ? "==" : "!="}
            </p>
        </div>
      <div className="posts-container">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post.id} className="post-card">
              <div className="post-author">Posted by: {profile?.name} {profile?.lastName}</div>
              <div className="canvas-container">
                <Canvas>
                  <OrbitControls enableZoom={false} />
                  <Sphere360 imageUrl={post.img_url} vrSession={vrSession}  />
                </Canvas>
              </div>
              <div className="post-caption">{post.caption}</div>
                {/*<button onClick={() => startVrSession(post.img_url)}>Enter VR</button>*/}
                {isWebXrSupported && (
                    <button onClick={() => startVrSession(post.img_url)}>
                        Open
                    </button>
                )}
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
