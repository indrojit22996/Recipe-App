import * as model from "./model"
import recipeView from "./view/recipeView";

import 'core-js/stable';
import 'regenerator-runtime/runtime';
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

function renderSpiner(parantEl) {
  const markup = `<div class="spinner">
  <i class="fa-solid fa-spinner fa-2xl" style="color: #00c4ff;"></i>
</div>`;
  parantEl.insertAdjacentHTML('afterbegin', markup);
}

async function controlRecipes() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) {
      return;
    }

    recipeView.renderSpinner()
    // Loading Recipe
   await model.loadRecipe(id);
   const {recipe}=model.state;
 
    

    //Rendering recipe
    recipeView.render(model.state.recipe)
   
  } catch (error) {
    alert(error);
  }
}
// controlRecipes();
['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipes));

// window.addEventListener('hashchange',controlRecipes)
// window.addEventListener('load',controlRecipes)
