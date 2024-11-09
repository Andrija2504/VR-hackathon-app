// src/components/ProfileList.tsx
import React from 'react';
import { profiles, posts } from '../data';
import ThreeSixtyViewer from './Sphere360';

const ProfileList: React.FC = () => {
  return (
    <div>
      <h1>Profiles</h1>
      {profiles.map((profile) => (
        <div key={profile.id}>
          <h2>{profile.name} {profile.lastName}</h2>
          <h3>Posts:</h3>
          <div>
            {posts
              .filter((post) => post.profileId === profile.id)
              .map((post) => (
                <div key={post.id} style={{ marginBottom: '20px' }}>
                  <ThreeSixtyViewer imageUrl={post.img_url} />
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileList;
