'use strict';

const api = (function(){
  const base_url = 'https://thinkful-list-api.herokuapp.com/yulia/bookmarks';
  // //fetch for each method, accepts url and object with params
  // function listApiFetch(...args) {
  //   let error;
  //   return fetch(...args)
  //     .then(res => {
  //       if (!res.ok) {
  //         // Valid HTTP response but non-2xx status - let's create an error!
  //         error = { code: res.status };
  //       }
  
  //       // In either case, parse the JSON stream:
  //       return res.json();
  //     })
  
  //     .then(data => {
  //       // If error was flagged, reject the Promise with the error object
  //       if (error) {
  //         error.message = data.message;
  //         return Promise.reject(error);
  //       }
  
  //       // Otherwise give back the data as resolved Promise
  //       return data;
  //     });
  // }
  
  const getBookmarks = function() {
    return fetch(base_url)
      .then(res => res.json());
     
  };

  const createBookmark = function(obj) {
    const newBookmark = JSON.stringify(obj);
    return fetch(base_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: newBookmark
    });
  };
  return {
    getBookmarks,
    createBookmark,
  };
}());