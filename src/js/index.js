import * as model from './model';
import { hidingSpinner } from './utilities/helpers';
import { renderPaginationView } from './utilities/helpers';
import { resetPaginationView } from './utilities/helpers';
import { renderRecipeListView } from './utilities/helpers';
import { emptyRecipeList } from './utilities/helpers';
import { setCurrentMealContainer } from './utilities/helpers';
import { servingDefaultNumber, servingDefaultNumber } from './utilities/configuration';
import recipeListView from './views/recipeListView';
import recipeDetailView from './views/recipeDetailView';
import spinnerView from './views/spinnerView';
import exclamationView from './views/exclamationView.';
import searchView from './views/searchView';
import paginationView from './views/paginationView';
import servingView from './views/servingView';
import barView from './views/barView';
import addRecipeView from './views/addRecipeView';
import addBookmarkView from './views/bookmarkView';
import bookmarkView from './views/bookmarkView';

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
    //removeBackgroundColor
    if (model.state.currentMealContainer !== '') recipeDetailView.removeBackgroundColor(model.state.currentMealContainer);

    //taking current hash
    model.state.currentHash = window.location.hash.substring(1);
    const id = model.state.currentHash;
    if (id === '') return 'error';

    //setBackgroundColor
    setCurrentMealContainer(document, id, '.meal_href', '.bookmark_href');
    recipeDetailView.setBackgroundColor(model.state.currentMealContainer);

    //showing detailed view
    await model.loadRecipe(id);
    recipeDetailView.render(model.state.recipe);

    //hiding spinner
    hidingSpinner(spinnerView, parentElement);
  } catch (err) {
    //hiding spinner
    console.log(err);
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

const btnServingIncrease = function () {
  if (model.state.newServingNumber < 8) {
    model.state.newServingNumber = servingDefaultNumber + model.state.increaseServing;
    model.state.increaseServing++;
    model.state.decreaseServing++;
  }
  servingView.render('.serving_quantity');
};

const btnServingDecrease = function () {
  if (model.state.newServingNumber > 1) {
    model.state.newServingNumber = servingDefaultNumber + model.state.decreaseServing;
    model.state.decreaseServing--;
    model.state.increaseServing--;
  }

  servingView.render('.serving_quantity');
};

const showBarSection = function () {
  barView.showRender();
};

const hideBarSection = function () {
  barView.hideRender();
};

const showAddRecipeSection = function () {
  barView.hideRender();
  addRecipeView.renderShow();
};

const hideAddRecipeSection = function () {
  addRecipeView.renderHide();
};

const bookmarkIcon = function () {
  bookmarkView.render(setBookmarkSection);
};

const showBookmark = function () {
  barView.hideRender();
  bookmarkView.showRender();
};

const hideBookmark = function () {
  bookmarkView.hideRender();
};

const bookmarkUnLoad = function () {
  model.saveContainerList();
  model.saveBookmarkList();
};

const loadBookmarkAndContainer = function () {
  if (model.getBookmarkList() !== null) {
    model.state.bookmarks.bookmarkList = [...model.getBookmarkList()];
  }
  if (model.getContainerList() !== null) {
    model.state.mealContainers.mealContainerList = [...model.getContainerList()];
  }
};

const setBookmarkSection = function () {
  if (model.getContainerList() !== null) {
    bookmarkView.hideExclamation();
    model.getContainerList().forEach(container => {
      bookmarkView.createBookmarkElements(container);
    });
  }
};

const init = function () {
  searchView.addHandlerSearch(showRecipeList);
  recipeDetailView.addHandlerRender(showRecipe);
  paginationView.addHandlerRender(btnIncrease, btnDecrease);
  servingView.addHandlerRender(btnServingIncrease, btnServingDecrease);
  barView.addHandlerRender(showBarSection, hideBarSection, showAddRecipeSection, hideAddRecipeSection, showBookmark, hideBookmark);
  bookmarkView.addHandlerRender(bookmarkIcon);
  setBookmarkSection();
};

init();

window.onload = loadBookmarkAndContainer;
window.onunload = bookmarkUnLoad;
