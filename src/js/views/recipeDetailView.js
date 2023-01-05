class RecipeDetailView {
  #parentElement = document.querySelector('.recipe_container');
  #data;

  render(data) {
    this.#data = data;

    const recipeContainerActive = this.#parentElement.querySelector('.recipe_container_active');

    recipeContainerActive.style.display = 'none';

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

    document.querySelectorAll('.clone_ingredient_info_container').forEach(el => el.remove());

    this.#data.ingredients.map(item => {
      const newIngredientInfoContainer = ingredientInfoContainer.cloneNode(true);

      newIngredientInfoContainer.classList.toggle('clone_ingredient_info_container');
      newIngredientInfoContainer.querySelector('.__ingredient').textContent = `${item.quantity ?? ''} ${item.unit ?? ''} ${item.description ?? ''}`;
      newIngredientInfoContainer.style.display = 'flex';

      ingredientContainer.appendChild(newIngredientInfoContainer);
    });
  }
}

export default new RecipeDetailView();
