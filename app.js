/* definitions !*/

const searchform = document.querySelector("#searchform");
const randomform = document.querySelector("#randomform");
const loader = document.querySelector("#loader");
const results = document.querySelector("#res");
let display;
var resultsArray;

///---------- NORMAL SEARCH QUERY
searchform.addEventListener("submit", (e) => {
  window.scrollTo(1000, 1000);
  e.preventDefault();
  let fieldselector = document.querySelector("#foodquery").value;
  results.innerHTML = "";
  // console.log(fieldselector);
  // Your loader styling, mine is just text that I display and hide
  let flag = "search";
  // apicaller(fieldselector,flag);
  replicateAPI(flag); //this should be commented

  // reset field
  document.querySelector("#foodquery").value = "";
});

//----------- Random SEARCH QUERY
randomform.addEventListener("submit", (e) => {
  window.scrollTo(1000, 1000);
  e.preventDefault();
  let flag = "random";
  let fieldselector = document.querySelector("#tags").value;
  results.innerHTML = "";
  
  // apicaller(fieldselector,flag); // this should be uncommented
  replicateAPI(flag); //this should be commented


  document.querySelector("#tags").value = "";
});

// a redirectiong function that will take the ID of the pressed on item, which will be looked up on our display results of DISPLAY array
function mealgetter(obj) {
  htmlBuilder(display[obj]);
}

// Mail meal section html builder
function htmlBuilder(obj) {
  let ing = document.createElement("ul");
  ing.classList.add("list-group");
  obj.ing.forEach((e) => {
    let li = document.createElement("li");
    li.innerText = e;
    li.classList.add('list-group-item')
    li.style.textAlign='justify';
    ing.appendChild(li);
  });

  

  let healthlab = obj.healthlabels.join();
  let caution = obj.caution.join();
//  <section class="col-xs-12 col-sm-6 col-md-12 page">
//   <article class="search-result row pager">
//     <div class="col-xs-12 col-sm-12 col-md-3">
//       <img class="imger" src='${obj.img}'>
//     </div>
//     <div class="col-xs-12 col-sm-12 col-md-7 excerpet">
//       <h2 style="color:yellowgreen">${obj.title}</h2>
//       <p id="ing" style="font-size: 25px" ></p>
//       <div style="font-size:20px">
//       <span style="color:yellowgreen">Cals :</span><span>     <i class="fa fa-calculator">  ${obj.cals}</i></span><br>
//       <span style="color:yellowgreen">  Health Labels: </span><span> ${healthlab}</i></span><br>
//       <span style="color:crimson"> Health Concerns :</span><span>  ${caution}</i></span><br>
//     </div>
    
//   </article>
//   </section>
  results.innerHTML = `
  <section> 
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center">
            <h2 class="section-heading text-title">${obj.title}</h2>
            <hr class="my-4">
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-md-8 text-center">

          <img src='${obj.img}' style="width:100%;">
                <h3 class="mb-3"</h3>
              <p class="mb-0"></p>
          </div>
          <div class="col-lg-6 col-md-8 text-center">
            <div class="service-box mt-5 mx-auto">
                <p id="ing" style="font-size: 15px" ></p>
                <h3 class="mb-3"><i class="fa fa-1x fa-calculator"> </i> <span style="color:yellowgreen">Cals :</span> <span>  ${obj.cals} </span></h3><br>

                <p class=" mb-0"> 
                    <span style="color:yellowgreen"> Health Labels: </span><span> ${healthlab}</i></span><br>
                    <span style="color:crimson"> Health Concerns :</span><span>  ${caution}</i></span><br>
                </p>
                
            </div>
          </div>

        </div>
      </div>
    </section>
  `;
  document.querySelector("#ing").appendChild(ing);
}
// the builder of the card view seen when we have multiple results
function cardBuilder(obj) {
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
// the actual API caller function **** use with caustion ***** we are only limited to 5000 calls, use the ReplicateAPI() function instead
function apicaller(searchfield, flag) {
  //   ** Recipe Search ** EDAMAM API
  const APP_ID = "1f1b83cd";
  const API_KEY = "22580d752a52693abbaad5fd2430b408";
  // change "seachfieldid.value" in the line below to search field button id
  display = [];
  loader.style.display = "flex";
  setTimeout(() => {
    //--- just change the fetch to use the actual api
    fetch(
      `https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}&q=${encodeURI(
        searchfield
      )}`
    )
      .then((response) => {
        if (response.ok) {
          loader.style.display = "none";

          return response.json();
        }
      })
      .then((response) => {
        let i = 0;
        resultsArray = [...response.hits];
        resultsArray.forEach((element) => {
          let resObJ = {
            id: i,
            title: element.recipe.label,
            img: element.recipe.image,
            cals: Math.trunc(element.recipe.calories),
            ing: element.recipe.ingredientLines,
            healthlabels: element.recipe.healthLabels,
            caution: element.recipe.cautions,
          };
          display.push(resObJ);
          i++;
          console.log("we are inside ya kbeer");
        });
        if (flag == "search") {
          display.forEach((element) => cardBuilder(element));
        } else if (flag == "random") {
          htmlBuilder(display[Math.floor(Math.random() * display.length)]);
        }

        window.scrollTo(1000, 1000);
      });
  }, 1500);
}

/// a function that replicates the API calls, the results are hardcoded the search query will make no different, PERFECT FOR TESTINGN
function replicateAPI(flag) {
  display = [];
  loader.style.display = "flex";
  setTimeout(() => {
    //--- just change the fetch to use the actual api
    fetch("./resultsSave.json")
      .then((response) => {
        if (response.ok) {
          loader.style.display = "none";

          return response.json();
        }
      })
      .then((response) => {
        let i = 0;
        resultsArray = [...response.hits];
        resultsArray.forEach((element) => {
          let resObJ = {
            id: i,
            title: element.recipe.label,
            img: element.recipe.image,
            cals: Math.trunc(element.recipe.calories),
            ing: element.recipe.ingredientLines,
            healthlabels: element.recipe.healthLabels,
            caution: element.recipe.cautions,
          };
          display.push(resObJ);
          i++;
        });

        if (flag == "search") {
          display.forEach((element) => cardBuilder(element));
        } else if (flag == "random") {
          htmlBuilder(display[Math.floor(Math.random() * display.length)]);
        }

        window.scrollTo(1000, 1000);
      });
  }, 1500);
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
