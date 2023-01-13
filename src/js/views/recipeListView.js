import { removeCloneNodes } from '../utilities/helpers';
import { API_KEY } from '../utilities/configuration';

class RecipeListView {
  #parentElement = document.querySelector('.recipe_list_container');
  #data;

  render(data) {
    this.#data = data;

    const mealHref = this.#parentElement.querySelector('.meal_href');
    const newMealHref = mealHref.cloneNode(true);
    const userIcon = newMealHref.querySelector('.meal_user');

    newMealHref.classList.toggle('clone_meal');

    newMealHref.href = `#${this.#data.id}`;
    newMealHref.querySelector('.__meal_img').src = this.#data.imageURL;
    newMealHref.querySelector('.__meal_name').textContent = this.#data.title;
    newMealHref.querySelector('.__recipe_owner').textContent = this.#data.publisher;
    userIcon.style.display = this.#data.key === API_KEY ? 'flex' : 'hidden';
    newMealHref.querySelector('.meal_container').style.display = 'flex';

    this.#parentElement.appendChild(newMealHref);
  }

  removeRender(cloneClass) {
    removeCloneNodes(document, cloneClass);
  }
}

export default new RecipeListView();
