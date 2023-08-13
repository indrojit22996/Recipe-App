import * as model from "./model"
import recipeView from "./view/recipeView";

import 'core-js/stable';
import 'regenerator-runtime/runtime';
const recipeContainer = document.querySelector('.recipe');



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


const init=function(){
recipeView.addHandelerRender(controlRecipes)
}
init();