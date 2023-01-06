class PaginationView {
  #parentElement = document.querySelector('.btn_pagination_container');
  #btnIncrease = this.#parentElement.querySelector('.page_right');
  #btnDecrease = this.#parentElement.querySelector('.page_left');

  render(currentPageIncrease, currentPageDecrease, btnIncreaseVisible, btnDecreaseVisible) {
    this.#parentElement.style.display = 'flex';
    this.#parentElement.querySelector('.__page_number_right').textContent = currentPageIncrease + 1;
    this.#parentElement.querySelector('.__page_number_left').textContent = currentPageDecrease;
    this.#btnIncrease.style.visibility = btnIncreaseVisible;
    this.#btnDecrease.style.visibility = btnDecreaseVisible;
  }

  addHandlerRender(handlerIncrease, handlerDecrease) {
    this.#btnIncrease.addEventListener('click', handlerIncrease);
    this.#btnDecrease.addEventListener('click', handlerDecrease);
  }
}
export default new PaginationView();
