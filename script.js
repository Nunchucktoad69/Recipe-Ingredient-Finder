document.getElementById('ingredientForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const ingredientsInput = document.getElementById('ingredients').value.trim();
    if (!ingredientsInput) {
      alert('Please enter at least one ingredient.');
      return;
    }
  
    const apiKey = '782c3f5e563447eda991193051773605';
    const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredientsInput)}&apiKey=${apiKey}&number=10`;
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      const recipes = await response.json();
      displayRecipes(recipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      alert('Failed to fetch recipes. Please try again later.');
    }
  });
  
  function displayRecipes(recipes) {
    const recipesContainer = document.getElementById('recipes');
    recipesContainer.innerHTML = ''; 
    
    if (recipes.length === 0) {
      recipesContainer.innerHTML = '<p>No recipes found. Try different ingredients.</p>';
      return;
    }
  
    recipes.forEach(recipe => {
      const recipeHTML = `
        <div class="recipe">
          <h2>${recipe.title}</h2>
          <img src="${recipe.image}" alt="${recipe.title}">
          <h3>Ingredients:</h3>
          <ul>
            ${recipe.usedIngredients.concat(recipe.missedIngredients).map(ingredient => `
              <li>${ingredient.name}</li>
            `).join('')}
          </ul>
          <p><a href="https://spoonacular.com/recipes/${recipe.id}" target="_blank" rel="noopener noreferrer">View Recipe</a></p>
        </div>
      `;
      recipesContainer.innerHTML += recipeHTML;
    });
  }
  