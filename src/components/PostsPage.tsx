import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { profiles, posts } from '../data';
import Sphere360 from './Sphere360';

const PostsPage: React.FC = () => {
  // Function to get profile name by ID
  const getProfileName = (profileId: number): string => {
    const profile = profiles.find((p) => p.id === profileId);
    return profile ? `${profile.name} ${profile.lastName}` : 'Unknown Profile';
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>360° Posts</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        {posts.map((post) => (
          <div key={post.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', maxWidth: '400px', margin: 'auto' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Posted by: {getProfileName(post.profileId)}</h3>
            <Canvas style={{ height: '300px' }}>
              <OrbitControls enableZoom={false} />
              <Sphere360 imageUrl={post.img_url} />
            </Canvas>
            <p style={{ marginTop: '10px', textAlign: 'center', fontStyle: 'italic' }}>{post.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsPage;
