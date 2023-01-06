class SearhView {
  #parentElement = document.querySelector('.navigation');

  getQuery() {
    return this.#parentElement.querySelector('.searchbar').value;
  }

  addHandlerSearch(handler) {
    this.#parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}
export default new SearhView();
