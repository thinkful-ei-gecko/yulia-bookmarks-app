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