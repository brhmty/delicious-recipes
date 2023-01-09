import { removeCloneNodes } from '../utilities/helpers';
import * as model from '../model';

class RecipeListView {
  #parentElement = document.querySelector('.recipe_list_container');
  #data;

  render(data) {
    this.#data = data;

    const mealHref = this.#parentElement.querySelector('.meal_href');
    const newMealHref = mealHref.cloneNode(true);

    newMealHref.classList.toggle('clone_meal');

    newMealHref.href = `#${this.#data.id}`;
    newMealHref.querySelector('.__meal_img').src = this.#data.imageURL;
    newMealHref.querySelector('.__meal_name').textContent = this.#data.title;
    newMealHref.querySelector('.__recipe_owner').textContent = this.#data.publisher;
    newMealHref.querySelector('.meal_container').style.display = 'flex';

    this.#parentElement.appendChild(newMealHref);
  }

  /* bookmarkRender() {
    this.#parentElement.querySelectorAll('.clone_meal').forEach(item => {
      if (item.href.slice(23) === model.state.currentID) {
        const newMealContainer = item.cloneNode(true);
        model.state.mealContainers.mealContainerList.push(newMealContainer);
      }
    });
  } */

  removeRender(cloneClass) {
    removeCloneNodes(document, cloneClass);
  }
}

export default new RecipeListView();
