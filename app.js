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

const searchform = document.querySelector("#searchform");
const randomform = document.querySelector("#randomform");
const loader = document.querySelector("#loader");
const results = document.querySelector("#res");
let display;
var resultsArray ;
// const randomform = 
// const ingform =
///---------- NORMAL SEARCH
  searchform.addEventListener('submit', e => {
    e.preventDefault();
    let fieldselector = document.querySelector("#foodquery").value;
    results.innerHTML = "";
    console.log(fieldselector);
  // Your loader styling, mine is just text that I display and hide
    let flag = 'search';
    // apicaller(fieldselector,flag);
    replicateAPI(); //this should be commented
    

    // reset field
    document.querySelector("#foodquery").value = "";
  })
//----------- Random SEARCH
 randomform.addEventListener('submit',e =>{
   e.preventDefault();
    let flag = 'random';
   let fieldselector = document.querySelector("#tags").value;
   results.innerHTML = "";
   document.querySelector("#tags").value = "";
    apicaller(fieldselector,flag);


   
 })

 function replicateAPI(){
      display = [];
      loader.style.display = 'flex';
      setTimeout(() => {
      //--- just change the fetch to use the actual api
        fetch('./resultsSave.json')
        .then(response => {
                if(response.ok) {
                  loader.style.display = 'none';

                  return response.json()
                }
              })
                  .then(response => {
                          let i = 0;
                          resultsArray = [...response.hits];
                          resultsArray.forEach( element => {
                            let resObJ = {
                              id : i,
                              title : element.recipe.label,
                              img : element.recipe.image,
                              cals : Math.trunc(element.recipe.calories),
                              ing : element.recipe.ingredientLines,
                              healthlabels : element.recipe.healthLabels,
                              caution : element.recipe.cautions,
                            }
                            display.push(resObJ);
                            i++;
             })
              
              display.forEach( element => cardBuilder(element));
        
      })

      } , 1500 );
      
}

function cardBuilder(obj){
  results.innerHTML += `
      <div class="card">
      <img src="${obj.img}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${obj.title}</h5>
        <p class="card-text">Total Calories in meal ${obj.cals}</p>
        <button class="btn btn-primary meals" onclick='mealgetter(${obj.id})'>Go to meal</button>
      </div>
      </div>
  `;

  
}
function mealgetter(obj){
  htmlBuilder(display[obj])
}

function htmlBuilder(obj){

let ing = document.createElement("ul");
obj.ing.forEach( e => {
  let li = document.createElement("li");
  li.innerText = e;
  ing.appendChild(li);
})

let healthlab = obj.healthlabels.join();
let caution = obj.caution.join();

results.innerHTML = `
  <section class="col-xs-12 col-sm-6 col-md-12">
  <article class="search-result row">
    <div class="col-xs-12 col-sm-12 col-md-3">
      <img class"imger" src='${obj.img}'>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-7 excerpet">
      <h2 style="color:yellowgreen">${obj.title}</h2>
      <p id="ing" style="font-size: 25px" ></p>
      <div style="font-size:20px">
      <span style="color:yellowgreen">Cals :</span><span>     <i class="fa fa-calculator">  ${obj.cals}</i></span><br>
      <span style="color:yellowgreen">  Health Labels: </span><span> ${healthlab}</i></span><br>
      <span style="color:crimson"> Health Concerns :</span><span>  ${caution}</i></span><br>
    </div>
    
  </article>
  </section>
  `;
  document.querySelector("#ing").appendChild(ing);
}
function apicaller(searchfield,flag){
  //   ** Recipe Search ** EDAMAM API
  const APP_ID = "1f1b83cd";
  const API_KEY = "22580d752a52693abbaad5fd2430b408"
  // change "seachfieldid.value" in the line below to search field button id
  display = [];
      loader.style.display = 'flex';
      setTimeout(() => {
      //--- just change the fetch to use the actual api
        fetch(`https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}&q=${encodeURI(searchfield)}`)
        .then(response => {
                if(response.ok) {
                  loader.style.display = 'none';

                  return response.json()
                }
              })
                  .then(response => {
                          let i = 0;
                          resultsArray = [...response.hits];
                          resultsArray.forEach( element => {
                            let resObJ = {
                              id : i,
                              title : element.recipe.label,
                              img : element.recipe.image,
                              cals : Math.trunc(element.recipe.calories),
                              ing : element.recipe.ingredientLines,
                              healthlabels : element.recipe.healthLabels,
                              caution : element.recipe.cautions,
                            }
                            display.push(resObJ);
                            i++;
                            console.log("we are inside ya kbeer");
             })
              if(flag == 'search'){ 
                display.forEach( element => cardBuilder(element));

              }else if(flag == 'random'){
                htmlBuilder(display[Math.floor(Math.random() * display.length)]);
              }
              
        
      })

      } , 1500 );
  }

// ----------------------------- TABS section JS logic ----------------------------------
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

