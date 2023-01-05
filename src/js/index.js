import * as model from './model';
import recipeListView from './views/recipeListView';
import recipeDetailView from './views/recipeDetailView';
import spinnerView from './views/spinnerView';

const showRecipeList = async function () {
  //showing spinner
  let check = false;
  const parentElement = '.recipe_list_container';
  spinnerView.render(check, parentElement);

  //filling recipeListView
  await model.loadRecipes();
  model.state.recipes.recipeList.forEach(recipe => recipeListView.render(recipe));

  //hiding spinner
  check = true;
  spinnerView.render(check, parentElement);
};

const showRecipe = async function () {
  try {
    //showing spinner
    let check = false;
    const parentElement = '.recipe_container';
    spinnerView.render(check, parentElement);

    const recipeContainerActiv = document.querySelector('.recipe_container_active');
    recipeContainerActiv.style.display = 'none';

    const id = window.location.hash.substring(1);
    if (id === '') return '';

    //showing detailed view
    await model.loadRecipe(id);
    recipeDetailView.render(model.state.recipe);

    //hiding spinner
    check = true;
    spinnerView.render(check, parentElement);
  } catch (err) {
    alert(err);
  }
};

showRecipeList();
window.addEventListener('hashchange', showRecipe);
