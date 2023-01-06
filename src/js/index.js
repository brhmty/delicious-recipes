import * as model from './model';
import { hidingSpinner } from './utilities/helpers';
import { renderPaginationView } from './utilities/helpers';
import { renderRecipeListView } from './utilities/helpers';
import { emptyRecipeList } from './utilities/helpers';
import recipeListView from './views/recipeListView';
import recipeDetailView from './views/recipeDetailView';
import spinnerView from './views/spinnerView';
import exclamationView from './views/exclamationView.';
import searchView from './views/searchView';
import paginationView from './views/paginationView';

const showRecipeList = async function () {
  let check = false;
  const parentElement = '.recipe_list_container';
  try {
    //hiding error message
    exclamationView.render(check, '.recipe_list_exclamation_container');
    //showing spinner
    spinnerView.render(check, parentElement);

    //filling recipeListView
    const query = searchView.getQuery();
    emptyRecipeList(model.state.recipes.recipeList);
    await model.loadRecipes(query);
    const recipeLength = model.state.recipeLength;

    model.calcTotalPage(recipeLength);

    recipeListView.removeRender('.clone_meal');
    renderRecipeListView(recipeListView, model.state.recipes.recipeList, recipeLength, model.state.itemStart, model.state.totalItem);

    renderPaginationView(paginationView, model.state);

    //hiding spinner
    hidingSpinner(spinnerView, parentElement);
  } catch (err) {
    //hiding spinner
    check = true;
    hidingSpinner(spinnerView, parentElement);
    setTimeout(exclamationView.render(check, '.recipe_list_exclamation_container'), 1000);
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
    if (id === '') return 'error';

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

const btnIncrease = function () {
  if (model.state.totalPage > model.state.currentPageIncrease) {
    model.state.currentPageDecrease++;
    model.state.currentPageIncrease++;

    model.state.itemStart += model.state.totalItem;
    model.state.itemEnd = model.state.currentPageIncrease * model.state.totalItem;

    //prevent overflow
    if (model.state.totalPage === model.state.currentPageIncrease) {
      model.state.itemEnd = model.state.recipeLength;
      model.state.btnIncreaseVisibility = 'hidden';
    }

    recipeListView.removeRender('.clone_meal');
    renderRecipeListView(recipeListView, model.state.recipes.recipeList, model.state.recipeLength, model.state.itemStart, model.state.itemEnd);

    model.state.btnDecreaseVisibility = 'visible';
    renderPaginationView(paginationView, model.state);
  }
};

const btnDecrease = function () {
  if (0 < model.state.currentPageDecrease) {
    model.state.currentPageDecrease--;
    model.state.currentPageIncrease--;

    model.state.itemStart -= model.state.totalItem;
    model.state.itemEnd = model.state.currentPageIncrease * model.state.totalItem;
    console.log(model.state.itemEnd);

    recipeListView.removeRender('.clone_meal');
    renderRecipeListView(recipeListView, model.state.recipes.recipeList, model.state.recipeLength, model.state.itemStart, model.state.itemEnd);

    if (model.state.currentPageDecrease === 0) model.state.btnDecreaseVisibility = 'hidden';
    model.state.btnIncreaseVisibility = 'visible';
    renderPaginationView(paginationView, model.state);
  }
};

const init = function () {
  searchView.addHandlerSearch(showRecipeList);
  recipeDetailView.addHandlerRender(showRecipe);
  paginationView.addHandlerRender(btnIncrease, btnDecrease);
};

init();
