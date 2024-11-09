// src/data.ts

export const profiles = [
  { id: 1, name: 'Alice', lastName: 'Smith' },
  { id: 2, name: 'Bob', lastName: 'Johnson' },
  { id: 3, name: 'Charlie', lastName: 'Williams' },
  { id: 4, name: 'Diana', lastName: 'Brown' },
  { id: 5, name: 'Eve', lastName: 'Davis' }
];
  
export const posts = [
  { id: 1, profileId: 1, img_url: '/apartment.JPG', caption: 'A beautiful apartment view!', visibility: 1 },
  { id: 2, profileId: 2, img_url: '/beaverton sunset.JPG', caption: 'Stunning sunset in Beaverton.', visibility: 3 },
  { id: 3, profileId: 1, img_url: '/bend river.JPG', caption: 'Relaxing by the Bend River.', visibility: 2 },
  { id: 4, profileId: 3, img_url: '/bend.JPG', caption: 'Exploring Bend!', visibility: 3 },
  { id: 5, profileId: 4, img_url: '/bvis castoff.JPG', caption: 'Bvis castoff.', visibility: 1 },
  { id: 6, profileId: 5, img_url: '/cannon 1.JPG', caption: 'Cannon picture 1.', visibility: 3 },
  { id: 7, profileId: 1, img_url: '/cannon 2.JPG', caption: 'Cannon picture 2.', visibility: 3 },
  { id: 8, profileId: 2, img_url: '/DJI_0107.JPG', caption: 'Picture 0107.', visibility: 2 },
  { id: 9, profileId: 3, img_url: '/DJI_0113.JPG', caption: 'Picture 0113.', visibility: 1 },
  { id: 10, profileId: 4, img_url: '/DJI_0168.JPG', caption: 'Picture 0168.', visibility: 3 },
  { id: 11, profileId: 5, img_url: '/DJI_0174.JPG', caption: 'Picture 0174!', visibility: 2 },
  { id: 12, profileId: 1, img_url: '/DJI_0228.JPG', caption: 'Picture 0228.', visibility: 1 },
  { id: 13, profileId: 2, img_url: '/DJI_0252.JPG', caption: 'Picture 0252.', visibility: 3 },
  { id: 14, profileId: 3, img_url: '/mthood.JPG', caption: 'Mthood.', visibility: 2 },
  { id: 15, profileId: 4, img_url: '/nevada.JPG', caption: 'Nevada.', visibility: 1 },
  { id: 16, profileId: 5, img_url: '/old mill.JPG', caption: 'Old mill.', visibility: 3 },
  { id: 17, profileId: 1, img_url: '/port convention.JPG', caption: 'Port convention.', visibility: 2 },
  { id: 18, profileId: 2, img_url: '/portland 1.JPG', caption: 'Portland picture 1', visibility: 1 },
  { id: 19, profileId: 3, img_url: '/portland 2.JPG', caption: 'Portland picture 2.', visibility: 3 },
  { id: 20, profileId: 4, img_url: '/rainbow_1.JPG', caption: 'Rainbow.', visibility: 2 },
  { id: 21, profileId: 5, img_url: '/salem waterfront.JPG', caption: 'Salem waterfront.', visibility: 1 },
  { id: 22, profileId: 1, img_url: '/smith rock.JPG', caption: 'Smit rock.', visibility: 3 },
  { id: 23, profileId: 2, img_url: '/smoke sunset.JPG', caption: 'Smokey sunset.', visibility: 2 },
  { id: 24, profileId: 3, img_url: '/Sunrise 1.JPG', caption: 'Sunrise picture 1.', visibility: 3 },
  { id: 25, profileId: 4, img_url: '/Sunrise 2.JPG', caption: 'Sunrise picture 2.', visibility: 1 },
  { id: 26, profileId: 5, img_url: '/tahoe 400.JPG', caption: 'Tahoe picture 1.', visibility: 2 },
  { id: 27, profileId: 1, img_url: '/tahoe 1000.JPG', caption: 'Tahoe picture 2.', visibility: 3 },
  { id: 28, profileId: 2, img_url: '/west salem hills.JPG', caption: 'West Salem hills.', visibility: 1 },
  { id: 29, profileId: 3, img_url: '/zenith vineyard.JPG', caption: 'Vineyard in zenith.', visibility: 2 },
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