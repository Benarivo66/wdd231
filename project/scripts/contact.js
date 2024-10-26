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
const mealDetails = document.querySelector("#meal-details");
const mealContent = {
  daily: "Daily Supply@Cost: N3600/day@Plan: Fresh meals delivered daily, perfect for individuals seeking daily convenience without the need for storage.",
  weekly:
    "Weekly Supply@Cost: N26000/week@Plan: A week's worth of pre-prepared meals delivered at once, ideal for those who prefer bulk delivery and easy storage.",
  ondemand:
    "On-Demand Supply@Cost: N6000/meal@Plan: Flexible meal delivery whenever needed, allowing you to order meals on the go without a subscription commitment.",
  customized:
    "Customized Supply@Cost: Varies based on plan@Plan: Personalized meal plans tailored to your dietary preferences and health goals, with flexible delivery options."
};

const displayMembershipDetails = (event)=>{
  event.preventDefault();
  mealDetails.innerHTML = "";
  const activeLink = event.target.id;
  const detail = mealContent[activeLink];
  if (detail) {
    const detailsParagraphs = detail.split("@");
    mealDetails.innerHTML = `
            <button id="closeModal">Close</button>
            <p><strong>${detailsParagraphs[0]}</strong></p>
            <p>${detailsParagraphs[1]}</p>
            <p>${detailsParagraphs[2]}</p>
            `;
    mealDetails.showModal();
    const closeModal = document.querySelector("#closeModal");
    closeModal.addEventListener("click", () => {
      mealDetails.close();
    });
  }
};
document.querySelectorAll('.meal_info a').forEach(a=>{
    a.addEventListener('click', displayMembershipDetails);
});
const hiddenInput = document.querySelector('input[type="hidden"]');
const d = new Date();
const isoDate = d.toISOString();
hiddenInput.value = isoDate;
const currentPage = window.location.pathname.split("/").pop();
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
