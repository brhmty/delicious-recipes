class SpinnerView {
  #parentElement;
  #conditionCheck;

  render(check, parentElement) {
    this.#conditionCheck = check;
    this.#parentElement = parentElement;

    const emptyPageMessage = document.querySelector('.__empty_page_message');
    const parent = document.querySelector(this.#parentElement);
    const spinner = parent.querySelector('.spinner');

    spinner.style.display = check ? 'none' : 'flex';
    if (this.#parentElement === '.recipe_container') emptyPageMessage.style.display = 'none';
  }
}
export default new SpinnerView();
