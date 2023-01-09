class BarView {
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

  addHandlerRender(handlerShow, handlerHide) {
    this.#parentElement.addEventListener('click', handlerShow);
    this.#barContainer.addEventListener('click', handlerHide);
  }
}
export default new BarView();
