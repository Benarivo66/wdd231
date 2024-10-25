const today = new Date();
const currentyear = document.querySelector("#currentyear");
const menu = document.getElementById("menu");
const navg = document.querySelector("#animateme");

currentyear.innerHTML = `©${today.getFullYear()} Madam Rose Restaurant`;
const lastModified = document.querySelector("#lastModified");
lastModified.innerHTML = `Last Modification: ${document.lastModified}`;
menu.addEventListener("click", () => {
  navg.classList.toggle("open");
  menu.classList.toggle("open");
});
const currentPath = window.location.pathname;
console.log(currentPath.split("/"))
const currentPage = currentPath.split("/")[3];
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