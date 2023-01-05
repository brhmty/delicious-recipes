import * as model from './model.js';

const showRecipe = async function () {
  await model.loadRecipe();
};
