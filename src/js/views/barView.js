class BarView {
  #bodyElement = document.querySelector('body');
  #parentElement = document.querySelector('.navigation_bar');
  #barContainer = document.querySelector('.bar_container');

  showRender() {
    this.#barContainer.style.display = 'flex';
    document.querySelector('nav').style.marginTop = '0';
    document.querySelector('body').style.overflowY = 'hidden';
  }

  hideRender() {
    this.#barContainer.style.display = 'none';
    document.querySelector('nav').style.marginTop = '1vh';
    document.querySelector('body').style.overflowY = 'scroll';
  }

  addHandlerRender(handlerShow, handlerHide, handlerShowAddRecipe, handlerHideAddRecipe, handlerShowBookmark, handlerHideBookmark) {
    this.#parentElement.addEventListener('click', handlerShow);
    this.#bodyElement.addEventListener('click', function (event) {
      switch (event.target.className) {
        case 'bar_container':
          handlerHide();
          break;
        case 'add_recipe':
        case '__add_recipe':
        case 'fa-regular fa-pen-to-square --add_color':
          handlerShowAddRecipe();
          break;
        case '__btn_close_recipe_data':
          handlerHideAddRecipe();
          break;
        case 'bookmark':
        case '__bookmark':
        case 'fa-regular fa-bookmark --add_color':
          handlerShowBookmark();
          break;
        case '__btn_close_bookmark_section':
          handlerHideBookmark();
          break;
      }
    });
  }
}
export default new BarView();
