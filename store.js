'use strict';

/*global store, bookmarks */

const store = (function(){
  const addBookmark = function(item) {
    this.list.push(item);
    bookmarks.render();
  };
  // const findById = function(id) {
  //   return this.list.find(item => item.id === id);
  // };
  // const findAndUpdate = function(id, newData) {
  //   const bookmark = this.findById(id);
  //   Object.assign(bookmark, newData);
  // };
  const findAndDelete = function(id) {
    this.list = this.list.filter(item => item.id !== id);
  };
  
  return {
    list: [
      { 
        id: 1, 
        title: 'Article on Cats',
        url: 'http://www.cats.com',
        description: 'Cats are great. I love cats.',
        rating: 5, 
        expanded: false 
      },
      { 
        id: 2, 
        title: 'Article on Dogs',
        url: 'http://www.dogs.com',
        description: 'Dogs are great. I love dogs.',
        rating: 3, 
        expanded: false 
      }
    ],
    showError: '',
    filtered: 'ALL',

    addBookmark,
    findAndDelete,
  };
  
}());