const nutritionalTips = [
  "Starchy carbohydrates should make up just over a third of the food you eat. They include potatoes, bread, rice, pasta and cereals",
  "It's recommended that you eat at least 5 portions of a variety of fruit and veg every day. They can be fresh, frozen, canned, dried or juiced",
  "Aim to eat at least 2 portions of fish a week, including at least 1 portion of oily fish",
  "On average, men should have no more than 30g of saturated fat a day. On average, women should have no more than 20g of saturated fat a day",
  "Free sugars, added to foods or drinks, or found naturally in honey, syrups and unsweetened fruit juices and smoothies increase your risk of obesity and tooth decay",
  "Eating too much salt can raise your blood pressure. People with high blood pressure are more likely to develop heart disease or have a stroke",
];
const today = new Date();
const currentyear = document.querySelector("#currentyear");
const menu = document.getElementById("menu");
const navg = document.querySelector("#animateme");
const feedbackUrl = "data/feedback.json";
const feedbackDiv = document.querySelector(".feedback div");
const nutritionalTip = document.querySelector(".nutritional-tip");

currentyear.innerHTML = `©${today.getFullYear()} Madam Rose Restaurant`;
const lastModified = document.querySelector("#lastModified");
lastModified.innerHTML = `Last Modification: ${document.lastModified}`;
menu.addEventListener("click", () => {
  navg.classList.toggle("open");
  menu.classList.toggle("open");
});

const msToDays = 86400000;
const lastVisitedElem = document.querySelector(".last-visited");
const currentDayMS = Date.now();
let lastVisit = localStorage.getItem("lastVisit")
  ? parseInt(localStorage.getItem("lastVisit"))
  : currentDayMS;
let count = localStorage.getItem("counta")
  ? parseInt(localStorage.getItem("counta"))
  : 0;
const diffInDays = () => (currentDayMS - lastVisit) / msToDays;
if (count === 0) {
  lastVisitedElem.innerHTML = `<strong>Welcome! Let us know if you have any questions.</strong>`;
} else if (diffInDays() < 1) {
  lastVisitedElem.innerHTML = `<strong>Back so soon! Awesome!</strong>`;
} else if (diffInDays() >= 1) {
  if (parseInt(diffInDays().toFixed(0)) === 1)
    lastVisitedElem.innerHTML = `<strong>You last visited ${diffInDays().toFixed(
      0
    )} day ago.</strong>`;
  else
    lastVisitedElem.innerHTML = `<strong>You last visited ${diffInDays().toFixed(
      0
    )} days ago.</strong>`;
}
count += 1;
localStorage.setItem("lastVisit", currentDayMS);
localStorage.setItem("counta", count);

const getFeedback = async () => {
  try {
    const response = await fetch(feedbackUrl);
    if (response.ok) {
      const data = await response.json();
      displayFeedback(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
};

const displayFeedback = (data) => {
  let count = 0;
  const checkArr = [];
  while (count < 3) {
    const randomIndex = Math.floor(Math.random() * data.feedback.length);
    if (checkArr.includes(randomIndex) === false) {
      checkArr.push(randomIndex);
      const person = data.feedback[randomIndex];
      const personCard = document.createElement("div");
      const name = document.createElement("p");
      const meal_plan = document.createElement("p");
      const feedback = document.createElement("p");
      const occupation = document.createElement("p");
      const photo = document.createElement("img");
      name.innerHTML = `<strong>Name</strong>: ${person.name}`;
      meal_plan.innerHTML = `<strong>Meal Plan</strong>: ${person.meal_plan}`;
      feedback.innerHTML = `<strong>Feedback</strong>: ${person.feedback}`;
      occupation.innerHTML = `<strong>Occupation</strong>: ${person.occupation}`;
      photo.alt = person.name;
      photo.loading = "lazy";
      photo.src = person.img_src;
      personCard.append(photo, name, occupation, meal_plan, feedback);
      count += 1;
      feedbackDiv.append(personCard);
    }
  }
};
const displayNutritionalTip = () => {
  let count = 0;
  const randomIndex = Math.floor(Math.random() * nutritionalTips.length);
  nutritionalTip.innerHTML = `<i>${nutritionalTips[randomIndex]}</i>`;
};
const currentPath = window.location.pathname;
const currentPage = currentPath.split("/")[3];
console.log(currentPath);
const navLinks = document.querySelectorAll('span a');
navLinks.forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});
document.querySelectorAll("#animateme span a").forEach(elem => {
  if (elem.getAttribute('href') === currentPage) {
    elem.classList.add('active');
  }
});

getFeedback();
displayNutritionalTip();
