const today = new Date();
const currentyear = document.querySelector("#currentyear");
currentyear.innerHTML = `©${today.getFullYear()} Benarivo Chamber of Commerce`;
const menu = document.getElementById("menu");
const navg = document.querySelector("#animateme");
const lastModified = document.querySelector("#lastModified");
lastModified.innerHTML = `Last Modification: ${document.lastModified}`;
menu.addEventListener("click", () => {
  navg.classList.toggle("open");
  menu.classList.toggle("open");
});
const msToDays = 86400000;
const lastVisitedElem = document.querySelector(".last-visited p");
const currentDayMS = Date.now();
let lastVisit = localStorage.getItem("lastVisited")
? parseInt(localStorage.getItem("lastVisited"))
: currentDayMS;
let count = localStorage.getItem("counter")
? parseInt(localStorage.getItem("counter"))
: 0;
const diffInDays = ()=>(currentDayMS - lastVisit) / msToDays;
if(count === 0){
    lastVisitedElem.innerHTML = `<strong>Welcome! Let us know if you have any questions.</strong>`;
}else if(diffInDays() < 1){
    lastVisitedElem.innerHTML = `<strong>Back so soon! Awesome!</strong>`;
}
else if(diffInDays() >= 1){
    console.log(diffInDays().toFixed(0))
    if(parseInt(diffInDays().toFixed(0)) === 1)
    lastVisitedElem.innerHTML = `<strong>You last visited ${diffInDays().toFixed(0)} day ago.</strong>`;
    else
    lastVisitedElem.innerHTML = `<strong>You last visited ${diffInDays().toFixed(0)} days ago.</strong>`;
}
count += 1;
localStorage.setItem("lastVisited", lastVisit);
localStorage.setItem("counter", count);

