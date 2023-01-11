class AddRecipeView {
  #parentElement = document.querySelector('.add_recipe_section');
  #link = document.querySelector('.add_recipe');

  renderShow() {
    this.#parentElement.style.display = 'flex';
  }

  renderHide() {
    this.#parentElement.style.display = 'none';
  }
}
export default new AddRecipeView();
