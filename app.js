//    ** Random ** Search Recipe - Food - Nutrition API
/*
fetch("https://api.spoonacular.com/recipes/random?apiKey=078ee27527f84853abaf1d220fd9d1b6&", {
})
.then(response => {
  return response.json()
	console.log(response);
})
.then(response=>{
  // Random dish generator
  console.log(response);
  console.log(response.recipes[0].summary);
  // Title
  const recipeTitle = document.querySelector("#recipe-title");
  recipeTitle.textContent = response.recipes[0].title;
  // recipe summary
  const recipeSummary = document.querySelector("#recipe-summary");
  recipeSummary.innerHTML = response.recipes[0].summary;
  
})
.catch(err => {
	console.log(err);
});
*/

//   ** Recipe Search ** EDAMAM API
const APP_ID = "6e21c9f4";
const API_KEY = "ddea9e15893170954aaea4c65bad68f0"
// change "seachfieldid.value" in the line below to search field button id
fetch(`https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}&q=${encodeURI(seachfieldid.value)}`, { 
})
.then(response => {
  return response.json()
})
.then(response=>{
  // Search dish
  console.log(response);
  // Title
  //const searchRecipeTitle = document.querySelector("#recipe-title");
  //searchRecipeTitle.textContent = response.recipes[0].title;
  // recipe summary
  //const searchRecipeSummary = document.querySelector("#search-recipe-summary");
  //searchRecipeSummary.innerHTML = response.recipes[0].summary;
  
})
.catch(err => {
	console.log(err);
});

// TABS section JS logic
function openMenu(evt, tabname) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabname).style.display = "block";
    evt.currentTarget.className += " active";
}