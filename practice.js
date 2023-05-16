const API_KEY = "[YOUR_API_KEY_GOES_HERE]";

const recipeListElement = document.getElementById("recipe-list");

const getRecipes = async () => {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`
  );
  const responseData = await response.json();
  return responseData.recipes;
};

const displayRecipes = (recipes) => {
  recipeListElement.innerHTML = "";
  recipes.forEach((recipe) => {
    const recipeItemElement = document.createElement("li");
    recipeItemElement.classList.add("recipe-item");

    const recipeImageElement = document.createElement("img");
    recipeImageElement.src = recipe.image;
    recipeImageElement.alt = "Recipe image";

    const recipeTitleElement = document.createElement("h2");
    recipeTitleElement.textContent = recipe.title;

    const recipeIngredientsElement = document.createElement("p");
    recipeIngredientsElement.innerHTML = `
    <strong>Ingredients: </strong>
    ${recipe.extendedIngredients
      .map((ingredient) => ingredient.original)
      .join(", ")}
    `;

    const recipeLinkElement = document.createElement("a");
    recipeLinkElement.href = recipe.sourceUrl;
    recipeLinkElement.textContent = "View recipe";

    recipeItemElement.appendChild(recipeLinkElement);
    recipeItemElement.appendChild(recipeIngredientsElement);
    recipeItemElement.appendChild(recipeImageElement);
    recipeItemElement.appendChild(recipeTitleElement);
    recipeListElement.appendChild(recipeItemElement);
  });
};

const initFunction = async () => {
  const recipes = await getRecipes();
  console.log(recipes);
  displayRecipes(recipes);
};

initFunction();
