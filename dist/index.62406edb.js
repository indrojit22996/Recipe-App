const recipeContainer = document.querySelector(".recipe");
const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
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
    parantEl.insertAdjacentHTML("afterbegin", markup);
}
async function showRecipe() {
    try {
        // call api call
        renderSpiner(recipeContainer);
        const res = await fetch("https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886");
        const data = await res.json();
        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        // Restruction api data
        let { recipe } = data.data;
        recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        };
        console.log(recipe);
        //
        const markup = `
     <figure class="recipe__fig">
  <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
  <h1 class="recipe__title">
    <span>${recipe.title}</span>
  </h1>
</figure>

<div class="recipe__details">
  <div class="recipe__info">
  <i class="fa-regular fa-clock recipe__info-icon" style="color: #00c4ff;"></i>
    <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingTime}</span>
    <span class="recipe__info-text">minutes</span>
  </div>
  <div class="recipe__info">
  <i class="fa-solid fa-users-rectangle recipe__info-icon" style="color: #00c4ff;"></i>
    <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
    <span class="recipe__info-text">servings</span>

    <div class="recipe__info-buttons">
      <button class="btn--tiny btn--increase-servings">
      <i class="fa-solid fa-plus" style="color: #00c4ff;"></i>
      </button>
      <button class="btn--tiny btn--increase-servings">
      <i class="fa-solid fa-minus" style="color: #00c4ff;"></i>
      </button>
    </div>
  </div>

  <div class="recipe__user-generated">
  <i class="fa-regular fa-user fa-2xl" style="color: #00c4ff;"></i>
  </div>
  <button class="btn--round">
  <i class="fa-solid fa-bookmark fa-xl" style="color: #ffffff;"></i>
  </button>
</div>

<div class="recipe__ingredients">
  <h2 class="heading--2">Recipe ingredients</h2>
  <ul class="recipe__ingredient-list">

${recipe.ingredients.map((ing)=>{
            return `
  <li class="recipe__ingredient">
  <i class="fa-solid fa-check recipe__icon" style="color: #00c4ff;"></i>
     
      <div class="recipe__quantity">${ing.quantity}</div>
      <div class="recipe__description">
        <span class="recipe__unit">${ing.unit}</span>
       ${ing.description}
      </div>
    </li>
  `;
        }).join("")}
  </ul>
</div>

<div class="recipe__directions">
  <h2 class="heading--2">How to cook it</h2>
  <p class="recipe__directions-text">
    This recipe was carefully designed and tested by
    <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
    directions at their website.
  </p>
  <a
    class="btn--small recipe__btn"
    href="${recipe.sourceUrl}"
    target="_blank"
  >
    <span>Directions</span>
    <i class="fa-solid fa-arrow-right search__icon"" style="color: #ffffff;"></i>
    
  </a>
</div>`;
        recipeContainer.innerHTML = "";
        // Adding eliment to the DOM
        recipeContainer.insertAdjacentHTML("afterbegin", markup);
    } catch (error) {
        alert(error);
    }
}
showRecipe();

//# sourceMappingURL=index.62406edb.js.map
