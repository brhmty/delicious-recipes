import * as model from './model';
import { hidingSpinner } from './utilities/helpers';
import recipeListView from './views/recipeListView';
import recipeDetailView from './views/recipeDetailView';
import spinnerView from './views/spinnerView';
import exclamationView from './views/exclamationView.';
import searchView from './views/searchView';

const showRecipeList = async function () {
  let check = false;
  const parentElement = '.recipe_list_container';
  try {
    //showing spinner
    spinnerView.render(check, parentElement);

    //filling recipeListView
    let query = searchView.getQuery();
    await model.loadRecipes(query);
    model.state.recipes.recipeList.forEach(recipe => recipeListView.render(recipe));

    //hiding spinner
    hidingSpinner(spinnerView, parentElement);
  } catch (err) {
    throw err;
  }
};

const showRecipe = async function () {
  let check = false;
  const parentElement = '.recipe_container';
  try {
    //hiding error message
    exclamationView.render(check, '.recipe_container_exclamation_container');
    //showing spinner
    spinnerView.render(check, parentElement);

    //taking current hash
    const id = window.location.hash.substring(1);
    if (id === '') return '';

    //showing detailed view
    await model.loadRecipe(id);
    recipeDetailView.render(model.state.recipe);

    //hiding spinner
    hidingSpinner(spinnerView, parentElement);
  } catch (err) {
    //hiding spinner
    check = true;
    hidingSpinner(spinnerView, parentElement);
    setTimeout(exclamationView.render(check, '.recipe_container_exclamation_container'), 1000);
  }
};

const init = function () {
  searchView.addHandlerSearch(showRecipeList);
  recipeDetailView.addHandlerRender(showRecipe);
};

init();
