class ExclamationView {
  #parentElement;

  render(check, parent) {
    this.#parentElement = parent;
    document.querySelector(this.#parentElement).style.display = check ? 'flex' : 'none';
  }
}
export default new ExclamationView();
