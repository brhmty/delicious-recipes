import { timeout_second } from './configuration';
import * as config from './configuration';
import * as model from '../model';

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

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });
    const res = await Promise.race([fetchPro, timeout(timeout_second)]);
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

export function resetPaginationView(modelState) {
  modelState.totalPage = config.totalPage;
  modelState.totalItem = config.totalItem;
  modelState.itemStart = config.itemStart;
  modelState.itemEnd = config.itemEnd;
  modelState.currentPageIncrease = config.currentPageIncrease;
  modelState.currentPageDecrease = config.currentPageDecrease;
  modelState.btnIncreaseVisibility = config.btnIncreaseVisibility;
  modelState.btnDecreaseVisibility = config.btnDecreaseVisibility;
}

export function hidingSpinner(viewClass, parentElement) {
  viewClass.render(true, parentElement);
}

export function removeCloneNodes(documentObject, className) {
  documentObject.querySelectorAll(className).forEach(el => el.remove());
}

export function emptyRecipeList(recipeList) {
  recipeList.length = 0;
}

export function setCurrentMealContainer(documentObject, id, mealHref, bookmarkHref) {
  documentObject.querySelectorAll(mealHref).forEach(item => {
    if (item.href.split('#')[1] === id) {
      model.state.currentMealContainer = item;
    }
  });
  documentObject.querySelectorAll(bookmarkHref).forEach(item => {
    if (item.href.split('#')[1] === id) {
      model.state.currentMealContainer = item;
    }
  });
}

export function removeSpecificValue(arr, value) {
  const index = arr.indexOf(value);
  arr.splice(index, 1);
}

export function removeMealContainer(arr, outer) {
  let loopIndex = 0;
  let index = -1;
  arr.forEach(container => {
    if (container === outer) {
      index = loopIndex;
    }
    loopIndex++;
  });
  if (index => 0) arr.splice(index, 1);
}
