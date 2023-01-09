import * as model from '../model.js';
import recipeDetailView from './recipeDetailView.js';
import { removeSpecificValue } from '../utilities/helpers.js';

class AddBookmarkView {
  #parentElement = document.querySelector('.bookmark_section');
  #link = document.querySelector('.bookmark');
  #btnBookmark = document.querySelector('.__btn_bookmark');

  render() {
    const local = model.getLocal();
    //tocheckifelementidinbookmarklis
    let bookmarked = false;

    //deletingbookmark
    if (local !== null) {
      local.forEach(item => {
        if (item === model.state.currentID) {
          bookmarked = true;
          removeSpecificValue(model.state.bookmarks.bookmarkList, model.state.currentID);
          model.saveLocal();
          this.#btnBookmark.querySelector('.empty_icon').style.display = 'block';
          this.#btnBookmark.querySelector('.filled_icon').style.display = 'none';
        }
      });
    }

    //addingbookmark
    if (!bookmarked) {
      model.state.bookmarks.bookmarkList.push(model.state.currentID);
      model.saveLocal();
    }

    bookmarked = false;
    recipeDetailView.btnBookmarkRender();
  }

  showRender() {
    this.#parentElement.style.display = 'block';
  }

  hideRender() {
    this.#parentElement.style.display = 'none';
  }

  addHandlerRender(handler, handlerShow, handlerHide) {
    this.#btnBookmark.addEventListener('click', handler);
    this.#link.addEventListener('click', handlerShow);
    this.#parentElement.querySelector('.__btn_close_bookmark_section').addEventListener('click', handlerHide);
  }
}
export default new AddBookmarkView();
