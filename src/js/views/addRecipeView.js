class AddRecipeView {
  #parentElement = document.querySelector('.add_recipe_section');
  #link = document.querySelector('.add_recipe');

  renderShow() {
    this.#parentElement.style.display = 'flex';
  }

  renderHide() {
    this.#parentElement.style.display = 'none';
  }

  addHandlerRender(handlerShow, handlerHide) {
    this.#link.addEventListener('click', handlerShow);
    this.#parentElement.querySelector('.__btn_close_recipe_data').addEventListener('click', handlerHide);
  }
}
export default new AddRecipeView();
