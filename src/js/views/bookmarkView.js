import * as model from '../model.js';
import recipeDetailView from './recipeDetailView.js';
import { removeSpecificValue } from '../utilities/helpers.js';
import { removeMealContainer } from '../utilities/helpers.js';

class AddBookmarkView {
  #parentElement = document.querySelector('.bookmark_section');
  //#link = document.querySelector('.bookmark');
  #btnBookmark = document.querySelector('.__btn_bookmark');
  #data;

  render(setBookmarkSection) {
    const local = model.getLocalBookmarks();
    //tocheckifelementidinbookmarklis
    let bookmarked = false;

    //deletingbookmark
    if (local !== null) {
      local.forEach(item => {
        if (item === model.state.currentID) {
          bookmarked = true;
          removeSpecificValue(model.state.bookmarks.bookmarkList, model.state.currentID);
          model.saveLocalBookmarks();
          this.extractBookmarkSection(model.state.currentID);
          //model.state.currentMealContainer = '';
          this.#btnBookmark.querySelector('.empty_icon').style.display = 'block';
          this.#btnBookmark.querySelector('.filled_icon').style.display = 'none';
        }
      });
    }

    //addingbookmark
    if (!bookmarked) {
      model.state.bookmarks.bookmarkList.push(model.state.currentID);
      model.saveLocalBookmarks();
      model.saveLocalMeals();
      model.loadBookmarkSection(model.state.currentID);
      this.insertBookmarkSection(model.state.recipe);
      this.#parentElement.querySelectorAll('.bookmark_href').forEach(e => e.remove());
      this.#parentElement.querySelectorAll('.bookmarked_meal').forEach(e => e.remove());
      model.saveContainerList();
      setBookmarkSection();
    }

    //bookmarksection

    bookmarked = false;
    recipeDetailView.btnBookmarkRender();
  }

  insertBookmarkSection(data) {
    this.#data = data;

    const mealContainer = document.querySelector('.meal_container');
    const newMealContainer = mealContainer.cloneNode(true);

    newMealContainer.classList.toggle('bookmarked_meal');

    newMealContainer.id = `${this.#data.id}`;
    newMealContainer.querySelector('.__meal_img').src = this.#data.imageURL;
    newMealContainer.querySelector('.__meal_name').textContent = this.#data.title;
    newMealContainer.querySelector('.__recipe_owner').textContent = this.#data.publisher;
    newMealContainer.style.display = 'flex';
    this.hideExclamation();

    this.#parentElement.appendChild(newMealContainer);
    model.state.mealContainers.mealContainerList.push(newMealContainer.outerHTML);
  }

  // FIXME - after delete gives error
  extractBookmarkSection(id) {
    this.#parentElement.querySelectorAll('.bookmarked_meal').forEach(mealContainer => {
      if (mealContainer.id === id) {
        mealContainer.style.backgroundColor = '';
        removeMealContainer(model.state.mealContainers.mealContainerList, mealContainer.outerHTML);
        mealContainer.remove();
        model.saveLocalMeals();
      }
    });
  }

  createBookmarkElements(outerHTMLString) {
    const container = document.createElement('a');
    container.innerHTML = outerHTMLString;
    container.href = `#${container.children[0].id}`;
    container.className = 'bookmark_href';
    this.#parentElement.appendChild(container);
  }

  showRender() {
    this.#parentElement.style.display = 'block';
    document.querySelector('body').style.overflowY = 'hidden';
  }

  hideRender() {
    this.#parentElement.style.display = 'none';
    document.querySelector('body').style.overflowY = 'scroll';
  }

  addHandlerRender(handler) {
    this.#btnBookmark.addEventListener('click', function (event) {
      switch (event.target.className) {
        case 'fa-regular fa-bookmark':
        case 'fa-solid fa-bookmark':
        case '__btn_bookmark --btn_filled':
          handler();
          break;
      }
    });
    /* this.#link.addEventListener('click', handlerShow);
    this.#parentElement.querySelector('.__btn_close_bookmark_section').addEventListener('click', handlerHide); */
  }

  hideExclamation() {
    document.querySelector('.bookmark_section_exclamation_container').style.display = 'none';
  }
}
export default new AddBookmarkView();
