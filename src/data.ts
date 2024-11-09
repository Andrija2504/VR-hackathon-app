// src/data.ts

export const profiles = [
    { id: 1, name: 'Alice', lastName: 'Smith' },
    { id: 2, name: 'Bob', lastName: 'Johnson' },
    { id: 3, name: 'Charlie', lastName: 'Williams' }
  ];
  
  export const posts = [
    { id: 1, profileId: 1, img_url: '/public/apartment.JPG', caption: 'A beautiful apartment view!', visibility: 1 },
    { id: 2, profileId: 2, img_url: '/public/beaverton sunset.JPG', caption: 'Stunning sunset in Beaverton.', visibility: 3 },
    { id: 3, profileId: 1, img_url: '/public/bend river.JPG', caption: 'Relaxing by the Bend River.', visibility: 2 },
    { id: 4, profileId: 3, img_url: '/public/bend.JPG', caption: 'Exploring Bend!', visibility: 3 }
  ];
  
  // New friends table
  export const friends = [
    { userId: 1, friendId: 2 },
    { userId: 1, friendId: 3 }
  ];
  