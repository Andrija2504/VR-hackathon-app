// src/data.ts

export const profiles = [
    { id: 1, name: 'Alice', lastName: 'Smith' },
    { id: 2, name: 'Bob', lastName: 'Johnson' },
    { id: 3, name: 'Charlie', lastName: 'Williams' }
  ];
  
  export const posts = [
    { id: 1, profileId: 1, img_url: './../public/apartment.JPG', caption: 'A beautiful apartment view!' },
    { id: 2, profileId: 2, img_url: './../public/beaverton sunset.JPG', caption: 'Stunning sunset in Beaverton.' },
    { id: 3, profileId: 1, img_url: './../public/bend river.JPG', caption: 'Relaxing by the Bend River.' },
    { id: 4, profileId: 3, img_url: './../public/bend.JPG', caption: 'Exploring Bend!' }
  ];
  