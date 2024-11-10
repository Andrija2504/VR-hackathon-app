// src/data.ts

export const profiles = [
  { id: 1, name: 'Alice', lastName: 'Smith' },
  { id: 2, name: 'Bob', lastName: 'Johnson' },
  { id: 3, name: 'Charlie', lastName: 'Williams' },
  { id: 4, name: 'Diana', lastName: 'Brown' },
  { id: 5, name: 'Eve', lastName: 'Davis' }
];
  
export const posts = [
  { id: 1, profileId: 1, img_url: '/apartment.JPG', caption: 'A beautiful apartment view!', visibility: 1, latitude: 48.2082, longitude: 16.3738 }, // Example: Vienna, Austria
  { id: 2, profileId: 2, img_url: '/beaverton sunset.JPG', caption: 'Stunning sunset in Beaverton.', visibility: 3, latitude: 45.4857, longitude: -122.8041 }, // Beaverton, OR
  { id: 3, profileId: 1, img_url: '/bend river.JPG', caption: 'Relaxing by the Bend River.', visibility: 2, latitude: 44.0582, longitude: -121.3153 }, // Bend, OR
  { id: 4, profileId: 3, img_url: '/bend.JPG', caption: 'Exploring Bend!', visibility: 3, latitude: 44.0582, longitude: -121.3153 }, // Bend, OR
  { id: 5, profileId: 4, img_url: '/bvis castoff.JPG', caption: 'Bvis castoff.', visibility: 1, latitude: 18.4207, longitude: -64.6394 }, // British Virgin Islands
  { id: 6, profileId: 5, img_url: '/cannon 1.JPG', caption: 'Cannon picture 1.', visibility: 3, latitude: 45.8922, longitude: -123.9615 }, // Cannon Beach, OR
  { id: 7, profileId: 1, img_url: '/cannon 2.JPG', caption: 'Cannon picture 2.', visibility: 3, latitude: 45.8922, longitude: -123.9615 }, // Cannon Beach, OR
  { id: 8, profileId: 2, img_url: '/DJI_0107.JPG', caption: 'Picture 0107.', visibility: 2, latitude: 37.7749, longitude: -122.4194 }, // San Francisco, CA
  { id: 9, profileId: 3, img_url: '/DJI_0113.JPG', caption: 'Picture 0113.', visibility: 1, latitude: 34.0522, longitude: -118.2437 }, // Los Angeles, CA
  { id: 10, profileId: 4, img_url: '/DJI_0168.JPG', caption: 'Picture 0168.', visibility: 3, latitude: 40.7128, longitude: -74.0060 }, // New York, NY
  { id: 11, profileId: 5, img_url: '/DJI_0174.JPG', caption: 'Picture 0174!', visibility: 2, latitude: 51.5074, longitude: -0.1278 }, // London, UK
  { id: 12, profileId: 1, img_url: '/DJI_0228.JPG', caption: 'Picture 0228.', visibility: 1, latitude: 35.6895, longitude: 139.6917 }, // Tokyo, Japan
  { id: 13, profileId: 2, img_url: '/DJI_0252.JPG', caption: 'Picture 0252.', visibility: 3, latitude: -33.8688, longitude: 151.2093 }, // Sydney, Australia
  { id: 14, profileId: 3, img_url: '/mthood.JPG', caption: 'Mthood.', visibility: 2, latitude: 45.3736, longitude: -121.6959 }, // Mount Hood, OR
  { id: 15, profileId: 4, img_url: '/nevada.JPG', caption: 'Nevada.', visibility: 1, latitude: 39.5296, longitude: -119.8138 }, // Reno, NV
  { id: 16, profileId: 5, img_url: '/old mill.JPG', caption: 'Old mill.', visibility: 3, latitude: 44.0612, longitude: -121.3153 }, // Bend, OR
  { id: 17, profileId: 1, img_url: '/port convention.JPG', caption: 'Port convention.', visibility: 2, latitude: 41.9028, longitude: 12.4964 }, // Rome, Italy
  { id: 18, profileId: 2, img_url: '/portland 1.JPG', caption: 'Portland picture 1', visibility: 1, latitude: 45.5152, longitude: -122.6784 }, // Portland, OR
  { id: 19, profileId: 3, img_url: '/portland 2.JPG', caption: 'Portland picture 2.', visibility: 3, latitude: 45.5152, longitude: -122.6784 }, // Portland, OR
  { id: 20, profileId: 4, img_url: '/rainbow_1.JPG', caption: 'Rainbow.', visibility: 2, latitude: 52.5200, longitude: 13.4050 }, // Berlin, Germany
  { id: 21, profileId: 5, img_url: '/salem waterfront.JPG', caption: 'Salem waterfront.', visibility: 1, latitude: 44.9429, longitude: -123.0351 }, // Salem, OR
  { id: 22, profileId: 1, img_url: '/smith rock.JPG', caption: 'Smith rock.', visibility: 3, latitude: 44.3623, longitude: -121.1361 }, // Smith Rock, OR
  { id: 23, profileId: 2, img_url: '/smoke sunset.JPG', caption: 'Smokey sunset.', visibility: 2, latitude: 47.6062, longitude: -122.3321 }, // Seattle, WA
  { id: 24, profileId: 3, img_url: '/Sunrise 1.JPG', caption: 'Sunrise picture 1.', visibility: 3, latitude: 40.7306, longitude: -73.9352 }, // New York, NY
  { id: 25, profileId: 4, img_url: '/Sunrise 2.JPG', caption: 'Sunrise picture 2.', visibility: 1, latitude: 55.7558, longitude: 37.6173 }, // Moscow, Russia
  { id: 26, profileId: 5, img_url: '/tahoe 400.JPG', caption: 'Tahoe picture 1.', visibility: 2, latitude: 39.0968, longitude: -120.0324 }, // Lake Tahoe
  { id: 27, profileId: 1, img_url: '/tahoe 1000.JPG', caption: 'Tahoe picture 2.', visibility: 3, latitude: 39.0968, longitude: -120.0324 }, // Lake Tahoe
  { id: 28, profileId: 2, img_url: '/west salem hills.JPG', caption: 'West Salem hills.', visibility: 1, latitude: 44.9429, longitude: -123.0351 }, // Salem, OR
  { id: 29, profileId: 3, img_url: '/zenith vineyard.JPG', caption: 'Vineyard in zenith.', visibility: 2, latitude: 45.0082, longitude: -123.0811 } // Example vineyard location
];

  
export const friends = [
  { userId: 1, friendId: 2 },
  { userId: 2, friendId: 1 }, // Bidirectional relationship

  { userId: 1, friendId: 3 },
  { userId: 3, friendId: 1 }, // Bidirectional relationship

  { userId: 2, friendId: 3 },
  { userId: 3, friendId: 2 }, // Bidirectional relationship

  { userId: 2, friendId: 4 },
  { userId: 4, friendId: 2 }, // Bidirectional relationship

  { userId: 3, friendId: 4 },
  { userId: 4, friendId: 3 }, // Bidirectional relationship
];

// New games table
export const games = [
  { gameId: 1, name: 'Adventure Quest', createdByUserId: 1 , audioUrl: '/youtube_df-eLzao63I_audio.mp3'},
  //{ gameId: 2, name: 'Mystery Hunt', createdByUserId: 2 },
  //{ gameId: 3, name: 'Historical Explorer', createdByUserId: 3 }
];

// New gamePosts table (mapping posts to games)
export const gamePosts = [
  { gameId: 1, postId: 1 },
  { gameId: 1, postId: 3 },
  { gameId: 1, postId: 7 },
  { gameId: 1, postId: 27 },
  { gameId: 1, postId: 22 } // Example: a post can be part of multiple games
];

// Define types for the new data structures
export interface PlayedGame {
  gameId: number;
  playerId: number;
}

// Example data (add the existing types for profiles, posts, etc.)
export const playedGames: PlayedGame[] = [
  { gameId: 1, playerId: 2 },
  // { gameId: 2, playerId: 3 },
  // { gameId: 3, playerId: 1 },
  // { gameId: 3, playerId: 4 }
];