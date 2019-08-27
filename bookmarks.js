'use strict';

/*global store, api */

const bookmarks = (function(){

  function generateBookmarkElement(item) {
    if (!item.rating) {
      return `<li class="js-bookmark-item" data-bookmark-id="${item.id}">${item.title}<span>Not rated</span>
      <p class="js-desc hidden">${item.desc}<a href="${item.url}" class="js-visit">Visit Site</a></p>
    <button class="delete-button">Delete</button><button>Edit</button><button class="expand">Show more</button></li>`;
    }
    return `<li class="js-bookmark-item" data-bookmark-id="${item.id}">${item.title}<span>${item.rating}</span>
    <p  class="js-desc hidden">${item.desc}><a href="${item.url}" class="js-visit">Visit Site</a></p>
    <button class="delete-button">Delete</button><button>Edit</button><button class="expand">Show more</button></li>`;
  }

  function generateBookmarkList(bookmarks) {
    const items = bookmarks.map((item) => generateBookmarkElement(item));
    return items.join('');
  }

  function render() {
    // render the shopping list in the DOM
    let items = [...store.list];
    console.log('`render` ran');
    if (store.filtered!=='ALL'){
      items = items.filter(item => item.rating >= store.filtered);
    }
    
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
        <input type="radio" name="rating" value="1">
        <input type="radio" name="rating" value="2">
        <input type="radio" name="rating" value="3">
        <input type="radio" name="rating" value="4">
        <input type="radio" name="rating" value="5">
      </fieldset>
      <input type="submit" value="Save bookmark">
    </form>
  `);
  }

  function removeForm() {
    $('#add-bookmark').show();
    $('#js-form').remove();
  }

  function handleAddNewBookmark() {
    $('#add-bookmark').on('click', function(){
      renderForm();
    });
  }


  function bindFormSubmit() {
    $('body').on('submit', '#js-form', function(event){
      event.preventDefault();
      const formData = new FormData(this);
      const o = {};
      formData.forEach((val, name) => o[name] = val);
      api.createBookmark(JSON.stringify(o)).then((result) => {
        console.log(result);
        store.addBookmark(result);
        render();
        removeForm();
      });
      console.log(o);
    });
  }

  function getBookmarkIdFromElement(item) {
    return $(item)
      .closest('.js-bookmark-item')
      .data('bookmark-id');
  }

  function handleDelete() {
    $('.js-bookmarks-list').on('click', '.delete-button', function(e) {
      console.log('delete ran');
      const id = getBookmarkIdFromElement(e.currentTarget);
      api.deleteBookmark(id).then(() => {
        store.findAndDelete(id);
        render();
      });
    });
  }

  function handleFilter() {
    $('#filter-item').on('change', function(e) {
      let filterBy = $(e.currentTarget).val();
      console.log(filterBy);
      store.filtered=filterBy;
      render();
    });
  }

  function handleExpandedView() {
    $('.js-bookmarks-list').on('click', '.expand', function(e){
      $(e.currentTarget).closest('li').find('p').toggleClass('hidden');
    });
  }

  function bindEventListeners() {
    handleAddNewBookmark();
    bindFormSubmit();
    handleDelete();
    handleFilter();
    handleExpandedView();
  }

  
  
  return {
    render,
    bindEventListeners,
  };
}());