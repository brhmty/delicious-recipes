import { async } from 'regenerator-runtime';
import { API_PATH } from './utilities/configuration';
import { returnHash } from './utilities/helpers';

export const state = {
  recipes: {
    recipeList: [],
  },
  recipe: {},
};

export const loadRecipes = async function () {
  try {
    const res = await fetch(`${API_PATH}?search=pizza`);
    const data = await res.json();
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
    const res = await fetch(`${API_PATH}/${id}`);
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    const data = await res.json();

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
    alert(err);
  }
};
