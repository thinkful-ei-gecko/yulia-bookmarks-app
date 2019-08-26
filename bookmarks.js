'use strict';

/*global store, */

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
    $('body').prepend(`
    <form>
      <label for="title">Enter bookmark name</label>
      <input type="text" id="title">
      <label for="url">Enter url</label>
      <input type="text" id="url">
      <label for="description">Description</label>
      <input type="text" id="description">
      <fieldset>Rating
        <input type="radio" name="rating1" value="1">
        <input type="radio" value="2">
        <input type="radio" value="3">
        <input type="radio" value="4">
        <input type="radio" value="5">
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

  function onSubmitForm() {
    
  }
  
  return {
    render,
    handleAddNewBookmark,
  };
}());