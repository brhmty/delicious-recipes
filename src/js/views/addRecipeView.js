class AddRecipeView {
  #parentElement = document.querySelector('.add_recipe_section');
  #btnUpload = document.querySelector('.btn_upload');
  #link = document.querySelector('.add_recipe');

  renderShow() {
    this.#parentElement.style.display = 'flex';
  }

  renderHide() {
    this.#parentElement.style.display = 'none';
  }

  addEventHandler(handler) {
    this.#parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const formElement = document.querySelector('.upload');
      const dataArr = [...new FormData(formElement)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}
export default new AddRecipeView();
