async function searchMeal() {
  const mealName = document.getElementById('mealName').value;
  const mealDiv = document.getElementById('meal');
  mealDiv.innerHTML = ''; // Clear previous results

  if (!mealName) {
    mealDiv.innerHTML = `<p style="color: red;">Please enter a meal name!</p>`;
    return;
  }

  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
    const data = await response.json();

    if (data.meals) {
      const meal = data.meals[0];
      mealDiv.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <p><strong>Category:</strong> ${meal.strCategory}</p>
        <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
      `;
    } else {
      mealDiv.innerHTML = `<p style="color: red;">No meals found. Try a different name!</p>`;
    }
  } catch (error) {
    mealDiv.innerHTML = `<p style="color: red;">An error occurred. Please try again later.</p>`;
  }
}