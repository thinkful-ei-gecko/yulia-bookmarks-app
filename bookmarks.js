'use strict';

/*global store, api */

const bookmarks = (function(){

  function generateBookmarkElement(item) {
    if (!item.rating) {
      return `<li><a href="${item.url}">${item.title}</a><span>Not rated</span>
      <p class="hidden">${item.desc}></p>
    <button>Delete</button><button>Edit</button></li>`;
    }
    return `<li><a href="${item.url}">${item.title}</a><span>${item.rating}</span>
    <p class="hidden">${item.desc}></p>
    <button>Delete</button><button>Edit</button></li>`;
  }

  function generateBookmarkList(bookmarks) {
    const items = bookmarks.map((item) => generateBookmarkElement(item));
    return items.join('');
  }

  function render() {
    // render the shopping list in the DOM
    let items = [...store.list];
    console.log('`render` ran');
    const bookmarkListItemsString = generateBookmarkList(items);
      
    // insert that HTML into the DOM
    $('.js-bookmarks-list').html(bookmarkListItemsString);
  }
  
  function renderForm() {
    $('#add-bookmark').hide();
    $('body').prepend(`
    <form id="js-form">
      <label for="title">Enter bookmark name</label>
      <input type="text" id="title" name="title">
      <label for="url">Enter url</label>
      <input type="text" id="url" name="url">
      <label for="description">Description</label>
      <input type="text" id="description" name="desc">
      <fieldset>Rating
        <input type="radio" name="1" value="1">
        <input type="radio" name="2" value="2">
        <input type="radio" name="3" value="3">
        <input type="radio" name="4" value="4">
        <input type="radio" name="5" value="5">
      </fieldset>
      <input type="submit" value="Save bookmark">
    </form>
  `);
  }

  function handleAddNewBookmark() {
    $('#add-bookmark').on('click', function(){
      renderForm();
    });
  }


  function handleFormSubmit() {
    $('body').on('submit', '#js-form', function(event){
      event.preventDefault();
      const formData = new FormData(this);
      const o = {};
      formData.forEach((val, name) => o[name] = val);
      api.createBookmark(JSON.stringify(o));
    });
    
  }

 
  
  return {
    render,
    handleAddNewBookmark,
    handleFormSubmit
  };
}());