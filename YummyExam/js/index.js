

let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");


// -----------------------------------------------

$(document).ready(() => {
  searchByName("").then(() => {
    $(".loadingScreen").fadeOut(500);
    $("body").css("overflow", "visible");
  });
});

function openSideNav() {
  $(".side-nav").animate({ left: 0 }, 500);
  $(".open-close-icon").removeClass("fa-align-justify");
  $(".open-close-icon").addClass("fa-x");
}
function closeSideNav() {
  let boxWidth = $(".side-nav .nav-tab").outerWidth();
  $(".side-nav").animate({ left: -boxWidth }, 500);
  $(".open-close-icon").addClass("fa-align-justify");
  $(".open-close-icon").removeClass("fa-x");
}

$(".side-nav .open-close-icon").click(() => {
  if ($(".side-nav").css("left") == "0px") {
    closeSideNav();
  } else {
    openSideNav();
  }
});
const date = new Date().getFullYear();
document.querySelector(".year").innerHTML = date;


function displayMeals(arr) {
  let container = "";

  for (let i = 0; i < arr.length; i++) {
    container += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `;
  }

  rowData.innerHTML = container;
}

async function getCategories() {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);
  searchContainer.innerHTML = "";

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  response = await response.json();

  displayCategories(response.categories);
  $(".inner-loading-screen").fadeOut(300);
}

function displayCategories(arr) {
  let container = "";

  for (let i = 0; i < arr.length; i++) {
    container += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${
                  arr[i].strCategory
                }')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${
                      arr[i].strCategoryThumb
                    }" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription
                          .split(" ")
                          .slice(0, 20)
                          .join(" ")}</p>
                    </div>
                </div>
        </div>
        `;
  }

  rowData.innerHTML = container;
}

async function getArea() {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  searchContainer.innerHTML = "";

  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  respone = await respone.json();
  console.log(respone.meals);

  displayArea(respone.meals);
  $(".inner-loading-screen").fadeOut(300);
}

function displayArea(arr) {
  let container = "";

  for (let i = 0; i < arr.length; i++) {
    container += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `;
  }

  rowData.innerHTML = container;
}

async function getIngredients() {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  searchContainer.innerHTML = "";

  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  respone = await respone.json();
  console.log(respone.meals);

  displayIngredients(respone.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(300);
}

function displayIngredients(arr) {
  let container = "";

  for (let i = 0; i < arr.length; i++) {
    container += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${
                  arr[i].strIngredient
                }')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription
                          .split(" ")
                          .slice(0, 20)
                          .join(" ")}</p>
                </div>
        </div>
        `;
  }

  rowData.innerHTML = container;
}

async function getCategoryMeals(category) {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  response = await response.json();

  displayMeals(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(300);
}

async function getAreaMeals(area) {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  response = await response.json();

  displayMeals(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(300);
}

async function getIngredientsMeals(ingredients) {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
  );
  response = await response.json();

  displayMeals(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(300);
}

async function getMealDetails(mealID) {
  closeSideNav();
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  searchContainer.innerHTML = "";
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  );
  respone = await respone.json();

  displayMealDetails(respone.meals[0]);
  $(".inner-loading-screen").fadeOut(300);
}

function displayMealDetails(meal) {
  searchContainer.innerHTML = "";

  let ingredients = ``;

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags?.split(",");
  
  if (!tags) tags = [];

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }

  let container = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`;

  rowData.innerHTML = container;
}

function showSearchInputs() {
  searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control  text-dark" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control  text-dark" type="text" placeholder="Search By First Letter">
        </div>
    </div>`;

  rowData.innerHTML = "";
}

async function searchByName(term) {
  closeSideNav();
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  response = await response.json();

  response.meals ? displayMeals(response.meals) : displayMeals([]);
  $(".inner-loading-screen").fadeOut(300);
}

async function searchByFLetter(term) {
  closeSideNav();
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  term == "" ? (term = "a") : "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
  );
  response = await response.json();

  response.meals ? displayMeals(response.meals) : displayMeals([]);
  $(".inner-loading-screen").fadeOut(300);
}

function showContacts() {
  rowData.innerHTML = `<div class="contact d-flex justify-content-center align-items-center min-vh-100">
    <div class="container w-75 text-center">
      <div class="row g-4">
        <div class="col-md-6">
          <input onkeyup="validateContactsInputs()" id="nameinput" type="text" class="form-control" placeholder="Enter Your Name">
          <div id="namealert" class="d-none w-100 alert alert-danger">
            Special characters and numbers not allowed
          </div>
        </div>
        <div class="col-md-6">
         <input onkeyup="validateContactsInputs()" placeholder="Enter Your Email" type="email"class="form-control" id="mailinput">
         <div id="mailalert" class=" d-none w-100 alert alert-danger">
            Email not valid *exemple@yyy.zzz
          </div>
        </div>
        <div class="col-md-6">
        <input onkeyup="validateContactsInputs()" placeholder="Enter Your Phone" type="text"class="form-control" id="phoneinput">
         <div id="phonealert" class=" d-none w-100 alert alert-danger">
            Enter valid Phone Number
          </div>
        </div>
        <div class="col-md-6">
        <input onkeyup="validateContactsInputs()" placeholder="Enter Your Age" type="number" class="form-control" id="ageinput">
         <div id="agealert" class=" d-none w-100 alert alert-danger">
            Enter valid age
          </div>
        </div>
        <div class="col-md-6">
            <input onkeyup="validateContactsInputs()" placeholder="Enter Your Password" type="password" class="form-control" id="passwordinput">
         <div id="passalert" class=" d-none w-100 alert alert-danger">
            Enter valid password *Minimum eight characters, at least one letter and one number:*
          </div>
        </div>
        <div class="col-md-6">
          <input onkeyup="validateContactsInputs()" placeholder="Enter  Repassword" type="password" class="form-control" id="repasswordinput">
         <div id="repassalert" class=" d-none w-100 alert alert-danger">
            Enter valid repassword
          </div>
        </div>
      </div>
      <button id="submitbtn" disabled   class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
  </div>`;
  submitbtn = document.getElementById("submitbtn");
  document.getElementById("nameinput").addEventListener("focus", () => {
    inputNameTouch = true;
  });
  document.getElementById("mailinput").addEventListener("focus", () => {
    inputMailTouch = true;
  });
  document.getElementById("phoneinput").addEventListener("focus", () => {
    inputPhoneTouch = true;
  });
  document.getElementById("ageinput").addEventListener("focus", () => {
    inputAgeTouch = true;
  });
  document.getElementById("passwordinput").addEventListener("focus", () => {
    passinput = true;
  });
  document.getElementById("repasswordinput").addEventListener("focus", () => {
    repassinput = true;
  });
}

let inputNameTouch = false;
let inputMailTouch = false;
let inputPhoneTouch = false;
let inputAgeTouch = false;
let inputPassTouch = false;
let inputRepassTouch = false;

function validateInputs() {
  let nameinput = document.getElementById("nameinput");
  let mailinput = document.getElementById("mailinput");
  let phoneinput = document.getElementById("phoneinput");
  let ageinput = document.getElementById("ageinput");
  let passinput = document.getElementById("passwordinput");
  let repassinput = document.getElementById("repasswordinput");
  let validate = {
    validateName: /^[a-zA-Z ]+$/,
    validateMail:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    validatePhone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    validateAge: /^[1-9]?[0-9]{1}$|^100$/,
    validatePass: /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/,
  };
  let validName = validate.validateName.test(nameinput.value);
  let validMail = validate.validateMail.test(mailinput.value);
  let validPhone = validate.validatePhone.test(phoneinput.value);
  let validAge = validate.validateAge.test(ageinput.value);
  let validPass = validate.validatePass.test(passinput.value);
  let validrePass = repassinput.value == passinput.value;
  return {
    nameValidation: validName,
    mailValidation: validMail,
    phoneValidation: validPhone,
    ageValidation: validAge,
    passValidation: validPass,
    repassValidation: validrePass,
  };
}

function validateContactsInputs() {
  let validationFunction = validateInputs();
  if (inputNameTouch) {
    if (validationFunction.nameValidation) {
      document
        .getElementById("namealert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("namealert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (inputMailTouch) {
    if (validationFunction.mailValidation) {
      document
        .getElementById("mailalert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("mailalert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (inputPhoneTouch) {
    if (validationFunction.phoneValidation) {
      document
        .getElementById("phonealert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("phonealert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (inputAgeTouch) {
    if (validationFunction.ageValidation) {
      document
        .getElementById("agealert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("agealert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (validationFunction.passValidation) {
    document.getElementById("passalert").classList.replace("d-block", "d-none");
  } else {
    document.getElementById("passalert").classList.replace("d-none", "d-block");
  }

  if (validationFunction.repassValidation) {
    document
      .getElementById("repassalert")
      .classList.replace("d-block", "d-none");
  } else {
    document
      .getElementById("repassalert")
      .classList.replace("d-none", "d-block");
  }

  if (
    validationFunction.nameValidation &&
    validationFunction.mailValidation &&
    validationFunction.phoneValidation &&
    validationFunction.ageValidation &&
    validationFunction.passValidation &&
    validationFunction.repassValidation
  ) {
    submitbtn.removeAttribute("disabled");
  } else {
    submitbtn.setAttribute("disabled", "disabled");
  }
  submitbtn.addEventListener("click", () => {
    let name = document.getElementById("nameinput");
    name.value = "";
    let mail = document.getElementById("mailinput");
    mail.value = "";
    let phone = document.getElementById("phoneinput");
    phone.value = "";
    let age = document.getElementById("ageinput");
    age.value = "";
    let pass = document.getElementById("passwordinput");
    pass.value = "";
    let repass = document.getElementById("repasswordinput");
    repass.value = "";
    submitbtn.setAttribute("disabled", "disabled");
  });
}