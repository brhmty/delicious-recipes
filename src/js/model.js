import { async } from 'regenerator-runtime';
import { API_PATH } from './utilities/configuration';
import * as config from './utilities/configuration';
import { getJSON } from './utilities/helpers';

export const state = {
  recipes: {
    recipeList: [],
  },
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
    const data = await getJSON(`${API_PATH}?search=${query}`);
    let { recipes } = data.data;
    state.recipeLength = recipes.length;

    recipes.forEach(item => {
      state.recipes.recipeList.push({
        id: item.id,
        title: item.title,
        imageURL: item.image_url,
        publisher: item.publisher,
      });
    });
  } catch (err) {
    throw err;
  }
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_PATH}/${id}`);
    let { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceURL: recipe.source_url,
      imageURL: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    throw err;
  }
};

export const calcTotalPage = async function (recipeLength) {
  const quotient = Math.floor(recipeLength / 10);

  state.totalPage = recipeLength % 10 === 0 ? quotient : quotient + 1;
  state.btnIncreaseVisibility = state.totalPage === 1 ? 'hidden' : 'visible';
};
