import * as config from '../utilities/configuration';
import { removeCloneNodes } from '../utilities/helpers';
import * as model from '../model';

class RecipeDetailView {
  #parentElement = document.querySelector('.recipe_container');
  #data;

  render(data) {
    this.#data = data;

    const recipeContainerActive = this.#parentElement.querySelector('.recipe_container_active');

    const emptyPageMessage = this.#parentElement.querySelector('.__empty_page_message');
    const bigImg = this.#parentElement.querySelector('.__img_big');
    const mealNameTag = this.#parentElement.querySelector('.__meal_name_tag');
    const cookingTime = this.#parentElement.querySelector('.__cooking_time_number');
    const numberOfServing = this.#parentElement.querySelector('.__number_of_serving');
    const cookName = this.#parentElement.querySelector('.__cook_name');
    const ingredientContainer = this.#parentElement.querySelector('.ingredient_container');
    const ingredientInfoContainer = this.#parentElement.querySelector('.ingredient_info_container');

    bigImg.src = this.#data.imageURL;
    mealNameTag.textContent = this.#data.title;
    cookingTime.textContent = this.#data.cookingTime;
    numberOfServing.textContent = this.#data.servings;
    cookName.textContent = this.#data.publisher;
    emptyPageMessage.style.display = 'none';
    recipeContainerActive.style.display = 'block';

    removeCloneNodes(document, '.clone_ingredient');

    //EmptyServingValues
    model.state.servingInitialValues = [];
    model.state.newServingNumber = config.newServingNumber;
    model.state.increaseServing = config.increaseServing;
    model.state.decreaseServing = config.decreaseServing;

    this.#data.ingredients.map(item => {
      const newIngredientInfoContainer = ingredientInfoContainer.cloneNode(true);

      newIngredientInfoContainer.classList.toggle('clone_ingredient');
      newIngredientInfoContainer.querySelector('.serving_quantity').textContent = `${item.quantity ?? ''}`;
      newIngredientInfoContainer.querySelector('.ingredient_last').textContent = `${item.unit ?? ''} ${item.description ?? ''}`;
      newIngredientInfoContainer.style.display = 'flex';

      //SavingServingInitialValues
      model.state.servingInitialValues.push(item.quantity ?? '');

      ingredientContainer.appendChild(newIngredientInfoContainer);
    });
  }

  hideRender() {
    this.#parentElement.querySelector('.recipe_container_active').style.display = 'none';
  }

  addHandlerRender(handler) {
    window.addEventListener('hashchange', handler);
  }

  setBackgroundColor(item) {
    item.querySelector('.meal_container').style.backgroundColor = config.color_ingredient;
  }

  removeBackgroundColor(item) {
    item.querySelector('.meal_container').style.backgroundColor = '';
  }
}

export default new RecipeDetailView();
