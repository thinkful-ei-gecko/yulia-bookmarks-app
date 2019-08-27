'use strict';

/* global store, api, bookmarks */

//get an array of objects with data from api and add them to the store
$(document).ready(function() {
  bookmarks.bindEventListeners();
  api.getBookmarks()
    .then((items) => {
      console.log(`this is ${items}`);
      items.forEach((item) => store.addBookmark(item));
      
    });
  // .catch(err => console.log(err.message));
});

