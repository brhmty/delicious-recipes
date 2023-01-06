import { timeout_second } from './configuration';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([timeout(timeout_second), fetch(url)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};

export function renderRecipeListView(viewClass, modelStateRecipeList, modelStateRecipeLength, itemStart, itemEnd) {
  if (!modelStateRecipeList || (Array.isArray(modelStateRecipeList) && modelStateRecipeLength === 0)) throw 'error';
  modelStateRecipeList.slice(itemStart, itemEnd).forEach(recipe => viewClass.render(recipe));
}

export function renderPaginationView(viewClass, modelState) {
  viewClass.render(modelState.currentPageIncrease, modelState.currentPageDecrease, modelState.btnIncreaseVisibility, modelState.btnDecreaseVisibility);
}

export function hidingSpinner(viewClass, parentElement) {
  viewClass.render(true, parentElement);
}

/* export function returnHash(windowObject) {
  windowObject.location.hash.substring(1);
} */

export function removeCloneNodes(documentObject, className) {
  documentObject.querySelectorAll(className).forEach(el => el.remove());
}

export function emptyRecipeList(recipeList) {
  recipeList.length = 0;
}
