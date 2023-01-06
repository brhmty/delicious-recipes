import * as model from './model';
import { hidingSpinner } from './utilities/helpers';
import { renderPaginationView } from './utilities/helpers';
import { resetPaginationView } from './utilities/helpers';
import { renderRecipeListView } from './utilities/helpers';
import { emptyRecipeList } from './utilities/helpers';
import { setCurrentMealContainer } from './utilities/helpers';
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
    //reset pagination
    resetPaginationView(model.state);
    //reset recipeListView
    recipeListView.removeRender('.clone_meal');

    //filling recipeListView
    const query = searchView.getQuery();
    emptyRecipeList(model.state.recipes.recipeList);
    await model.loadRecipes(query);
    const recipeLength = model.state.recipeLength;

    model.calcTotalPage(recipeLength);
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
    //hide showDetailREcipe
    recipeDetailView.hideRender();
    //removeBackgrounColor
    if (model.state.currentMealContainer !== '') recipeDetailView.removeBackgroundColor(model.state.currentMealContainer);

    //taking current hash
    model.state.currentHash = window.location.hash.substring(1);
    const id = model.state.currentHash;
    if (id === '') return 'error';

    setCurrentMealContainer(document, id, '.meal_href', '.meal_container');
    recipeDetailView.setBackgroundColor(model.state.currentMealContainer);

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
