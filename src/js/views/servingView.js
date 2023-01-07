import * as model from '../model';

class servingView {
  #parentElement = document.querySelector('.recipe_container');
  #data;
  #newServingNumber;

  render(data) {
    this.#data = data;
    this.#newServingNumber = model.state.newServingNumber;
    let arrayIndex = 0;

    this.#parentElement.querySelector('.__number_of_serving').textContent = this.#newServingNumber;

    this.#parentElement.querySelectorAll(this.#data).forEach(item => {
      const initialValue = model.state.servingInitialValues[arrayIndex];
      const quantity = initialValue === '' || initialValue === undefined ? '' : (initialValue / 4) * this.#newServingNumber;

      item.textContent = `${quantity}`;

      arrayIndex++;
    });
  }

  addHandlerRender(handlerIncrease, handlerDecrease) {
    this.#parentElement.querySelector('.__btn_increase').addEventListener('click', handlerIncrease);
    this.#parentElement.querySelector('.__btn_decrease').addEventListener('click', handlerDecrease);
  }
}
export default new servingView();
