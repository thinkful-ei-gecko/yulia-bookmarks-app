'use strict';

/*global store, api */

const bookmarks = (function(){

  function generateError(message) {
    return `
      <section class="error-content">
        <button id="cancel-error">X</button>
        <p>${message}</p>
      </section>
    `;
  }

  function generateBookmarkElement(item) {
    if (!item.rating) {
      return `<li class="js-bookmark-item bookmark-item" data-bookmark-id="${item.id}"><span class="title">${item.title}</span>
      <span class="rating">This bookmark is not rated</span>
      <p class="js-desc hidden">${item.desc}<a href="${item.url}" class="js-visit">Visit Site</a></p>
      <span class="delete-expand"><button class="delete-button">Delete</button><button class="expand">Details</button></span></li>`;
    }
    return `<li class="js-bookmark-item bookmark-item" data-bookmark-id="${item.id}"><span class="title">${item.title}</span>
    <span class="rating">Rating is ${item.rating} out of 5</span>
    <p  class="js-desc hidden">${item.desc}<a href="${item.url}" target="_blank" class="js-visit">Visit Site</a></p>
    <span class="delete-expand"><button class="delete-button">Delete</button><button class="expand">Details</button></span></li>`;
  }

  function generateBookmarkList(bookmarks) {
    const items = bookmarks.map((item) => generateBookmarkElement(item));
    return items.join('');
  }

  function renderError() {
    if (store.error) {
      const el = generateError(store.error);
      $('.error-container').html(el);
    } else {
      $('.error-container').empty();
    }
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
    $('.container').prepend(`
    <form id="js-form">
      <label for="title">Enter bookmark title</label>
      <input type="text" id="title" name="title" required>
      <label for="url">Enter url</label>
      <input type="text" id="url" name="url" required>
      <label for="description">Description</label>
      <textarea id="description" name="desc" form="js-form"></textarea>
      <legend>Rating</legend>
      <fieldset>
        <label for="rating1"><label>
        <input type="radio" class="fa fa-star" id="rating1" name="rating" value="1">
        <label for="rating2"><label>
        <input type="radio" class="fa fa-star" id="rating2" name="rating" value="2">
        <label for="rating3"><label>
        <input type="radio" class="fa fa-star" id="rating3" name="rating" value="3">
        <label for="rating4"><label>
        <input type="radio" class="fa fa-star" id="rating4" name="rating" value="4">
        <label for="rating5"><label>
        <input type="radio" class="fa fa-star" id="rating5" name="rating" value="5">
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
      })
        .catch((err) => {
          store.setError(err.message);
          renderError();
        });
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
      })
        .catch((err) => {
          console.log(err);
          store.setError(err.message);
          renderError();
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

  function handleCloseError() {
    $('.error-container').on('click', '#cancel-error', () => {
      store.setError(null);
      renderError();
    });
  }

  function bindEventListeners() {
    handleAddNewBookmark();
    bindFormSubmit();
    handleDelete();
    handleFilter();
    handleExpandedView();
    handleCloseError();
  }

  
  
  return {
    render,
    bindEventListeners,
  };
}());