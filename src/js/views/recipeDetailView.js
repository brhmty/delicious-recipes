import * as config from '../utilities/configuration';
import { removeCloneNodes } from '../utilities/helpers';
import { API_KEY } from '../utilities/configuration';
import * as model from '../model';

class RecipeDetailView {
  #parentElement = document.querySelector('.recipe_container');
  #btnBookmark = this.#parentElement.querySelector('.__btn_bookmark');
  #data;

  render(data) {
    this.#data = data;
    //serving_container_user;
    model.state.currentID = this.#data.id;

    const recipeContainerActive = this.#parentElement.querySelector('.recipe_container_active');

    const userIcon = this.#parentElement.querySelector('.serving_container_user');
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
    userIcon.style.display = this.#data.key === API_KEY ? 'flex' : 'hidden';
    recipeContainerActive.style.display = 'block';
    this.#btnBookmark.id = model.state.currentID;

    removeCloneNodes(document, '.clone_ingredient');

    //EmptyServingValues
    model.state.servingInitialValues = [];
    model.state.newServingNumber = config.newServingNumber;
    model.state.increaseServing = config.increaseServing;
    model.state.decreaseServing = config.decreaseServing;

    //clearingbookmark
    this.#btnBookmark.querySelector('.empty_icon').style.display = 'block';
    this.#btnBookmark.querySelector('.filled_icon').style.display = 'none';

    this.btnBookmarkRender();

    //ingredients
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
    document.querySelector('.bookmark_section').style.display = 'none';
    document.querySelector('body').style.overflowY = 'scroll';
  }

  removeBackgroundColor(item) {
    if (item.className === 'meal_href clone_meal') item.querySelector('.meal_container').style.backgroundColor = '';
  }

  //btnBookmarkIcons
  btnBookmarkRender() {
    const local = model.getLocalBookmarks();
    if (local !== null) {
      local.forEach(item => {
        if (item === model.state.currentID) {
          this.#btnBookmark.querySelector('.empty_icon').style.display = 'none';
          this.#btnBookmark.querySelector('.filled_icon').style.display = 'block';
        }
      });
    }
  }
}

export default new RecipeDetailView();
