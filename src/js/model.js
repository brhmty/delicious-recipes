import { async } from 'regenerator-runtime';
import { API_PATH } from './utilities/configuration';
import { getJSON } from './utilities/helpers';

export const state = {
  recipes: {
    recipeList: [],
  },
  recipe: {},
};

export const loadRecipes = async function (query) {
  try {
    const data = await getJSON(`${API_PATH}?search=${query}`);
    let { recipes } = data.data;

    recipes.slice(0, 10).map(item => {
      state.recipes.recipeList.push({
        id: item.id,
        title: item.title,
        imageURL: item.image_url,
        publisher: item.publisher,
      });
    });
  } catch (err) {
    alert(err);
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
