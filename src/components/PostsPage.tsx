import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { profiles, posts, friends } from '../data';
import Sphere360 from './Sphere360';

interface PostsPageProps {
    loggedInUserId: number;
  }

const PostsPage: React.FC<PostsPageProps> = ({ loggedInUserId }) => {
  // Get profile name by ID
  const getProfileName = (profileId: number): string => {
    const profile = profiles.find((p) => p.id === profileId);
    return profile ? `${profile.name} ${profile.lastName}` : 'Unknown Profile';
  };

  // Check if a user is a friend
  const isFriend = (userId: number): boolean => {
    return friends.some(
      (f) => (f.userId === loggedInUserId && f.friendId === userId) || (f.friendId === loggedInUserId && f.userId === userId)
    );
  };

  // Filter posts based on visibility and friendship, excluding own posts
  const filteredPosts = posts.filter((post) => {
    if (post.profileId === loggedInUserId) {
      // Exclude the logged-in user's own posts
      return false;
    }
    if (post.visibility === 3) {
      // Public posts from friends
      return isFriend(post.profileId);
    }
    if (post.visibility === 2) {
      // Friends-only posts from friends
      return isFriend(post.profileId);
    }
    // Private posts are not shown to anyone except the owner, so they are excluded here
    return false;
  });

  return (
    <div style={{ padding: '20px' }}>
      <h1>Feel the Austrian "Lebensgefühl"</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post.id} className="post-card">
              <div className="post-author">Posted by: {getProfileName(post.profileId)}</div>
              <div className="canvas-container">
                <Canvas>
                  <OrbitControls enableZoom={false} />
                  <Sphere360 imageUrl={post.img_url} />
                </Canvas>
              </div>
              <div className="post-caption">{post.caption}</div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center' }}>No posts to display.</p>
        )}
      </div>
    </div>
  );
};

export default PostsPage;
