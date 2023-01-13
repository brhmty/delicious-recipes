import { async } from 'regenerator-runtime';
import { API_PATH, API_KEY } from './utilities/configuration';
import * as config from './utilities/configuration';
import { getJSON, sendJSON } from './utilities/helpers';

export const state = {
  recipes: {
    recipeList: [],
  },
  bookmarks: {
    bookmarkList: [],
  },
  mealContainers: {
    mealContainerList: [],
  },
  currentID: '',
  recipe: {},
  recipeLength: 0,
  currentHash: 0,
  currentMealContainer: '',
  newServingNumber: config.newServingNumber,
  increaseServing: config.increaseServing,
  decreaseServing: config.decreaseServing,
  servingInitialValues: [],
  totalPage: config.totalPage,
  totalItem: config.totalItem,
  itemStart: config.itemStart,
  itemEnd: config.itemEnd,
  currentPageIncrease: config.currentPageIncrease,
  currentPageDecrease: config.currentPageDecrease,
  btnIncreaseVisibility: config.btnIncreaseVisibility,
  btnDecreaseVisibility: config.btnDecreaseVisibility,
};

export const loadRecipes = async function (query) {
  try {
    const data = await getJSON(`${API_PATH}?search=${query}&key=${API_KEY}`);
    let { recipes } = data.data;
    state.recipeLength = recipes.length;

    recipes.forEach(item => {
      state.recipes.recipeList.push({
        id: item.id,
        title: item.title,
        imageURL: item.image_url,
        publisher: item.publisher,
        ...(item.key && { key: item.key }),
      });
    });
  } catch (err) {
    throw err;
  }
};

const createRecipeData = function (data) {
  let { recipe } = data.data;

  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceURL: recipe.source_url,
    imageURL: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_PATH}/${id}?key=${API_KEY}`);

    state.recipe = createRecipeData(data);
  } catch (err) {
    throw err;
  }
};

export const loadBookmarkSection = async function (id) {
  loadRecipe(id);
};

export const calcTotalPage = async function (recipeLength) {
  const quotient = Math.floor(recipeLength / 10);

  state.totalPage = recipeLength % 10 === 0 ? quotient : quotient + 1;
  state.btnIncreaseVisibility = state.totalPage === 1 ? 'hidden' : 'visible';
};

export const saveLocalBookmarks = function () {
  const localValue = getLocalBookmarks();
  if (localValue === null) {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks.bookmarkList));
  } else {
    localStorage.clear();
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks.bookmarkList));
  }
};

export const getLocalBookmarks = function () {
  return JSON.parse(localStorage.getItem('bookmarks'));
};

export const saveLocalMeals = function () {
  const localValue = getLocalMeals();
  if (localValue === null) {
    localStorage.setItem('meals', JSON.stringify(state.mealContainers.mealContainerList));
  } else {
    localStorage.clear();
    localStorage.setItem('meals', JSON.stringify(state.mealContainers.mealContainerList));
  }
};

export const getLocalMeals = function () {
  return JSON.parse(localStorage.getItem('meals'));
};

export const saveContainerList = function () {
  localStorage.setItem('container-list', JSON.stringify(state.mealContainers.mealContainerList));
};

export const saveBookmarkList = function () {
  localStorage.setItem('bookmark-list', JSON.stringify(state.bookmarks.bookmarkList));
};

export const getBookmarkList = function () {
  return JSON.parse(localStorage.getItem('bookmark-list'));
};

export const getContainerList = function () {
  return JSON.parse(localStorage.getItem('container-list'));
};

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());
        if (ingArr.length !== 3) throw new Error('Wrong ingredient format! Please use the correct format :)');

        const [quantity, unit, description] = ingArr;

        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    const data = await sendJSON(`${API_PATH}?key=${API_KEY}`, recipe);
    state.recipe = createRecipeData(data);
  } catch (err) {
    throw err;
  }
};
