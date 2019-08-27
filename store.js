'use strict';

/*global bookmarks */

const store = (function(){
  const setError = function(error) {
    this.error = error;
  };

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
    list: [],
    showError: '',
    filtered: 'ALL',

    addBookmark,
    findAndDelete,
    setError,
  };
  
}());