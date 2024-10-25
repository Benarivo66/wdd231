const recipesOriginContent = {
  0: "Red Lentil Soup with Chicken and Turnips @Country: Ancient Greece@Info: Lentil soup dates back to Genesis, where it may have been the dish Jacob served Esau for his birthright. This nutritious dish spread across the Alexandrian empire and the Middle East.",
  
  1: "Asparagus and Pea Soup: Real Convenience Food @Country: France@Info: Asparagus soup has been a staple of French cuisine since the 19th century, symbolizing spring harvests. Peas, often paired with asparagus, add a vibrant color and subtle sweetness to this beloved soup.",
  
  2: "Garlicky Kale @Country: Mediterranean Region@Info: Kale has been consumed for over 2,000 years, especially in Mediterranean cuisines. Garlic-infused kale dishes are popular in Italy and Greece, known for their health benefits and robust flavors.",
  
  3: "Slow Cooker Beef Stew @Country: United Kingdom@Info: Traditional beef stew has origins in British and Irish cooking, with roots in medieval times. The slow-cooker version is a modern adaptation, maintaining the hearty flavors of this time-honored dish.",
  
  4: "Red Kidney Bean Jambalaya @Country: United States (Louisiana)@Info: Jambalaya is a classic Creole dish, blending African, French, and Spanish influences. Kidney beans add heartiness to this New Orleans staple.",
  
  5: "Cauliflower, Brown Rice, and Vegetable Fried Rice @Country: China (modern adaptation)@Info: Fried rice originated in China as a way to use leftovers. This modern, vegetable-rich variation with cauliflower and brown rice is popular in health-conscious Western diets.",
  
  6: "Quinoa and Chickpea Salad with Sun-Dried Tomatoes and Dried Cherries @Country: South America (modern adaptation)@Info: Quinoa, a staple of ancient Incan cuisine, pairs with chickpeas for protein. Sun-dried tomatoes and dried cherries add a Mediterranean twist to this nutritious salad.",
  
  7: "Easy Homemade Rice and Beans @Country: Latin America@Info: Rice and beans is a traditional dish in Latin America, enjoyed for centuries as a protein-rich, affordable staple. Each region has unique seasoning variations.",
  
  8: "Tuscan White Bean Soup with Olive Oil and Rosemary @Country: Italy@Info: Originating in Tuscany, this simple, flavorful soup celebrates the region’s agricultural bounty, including olive oil, beans, and fragrant rosemary.",
  
  9: "Crunchy Brussels Sprouts Side Dish @Country: Belgium (modern adaptation)@Info: Brussels sprouts, named after the Belgian capital, have become a popular side dish worldwide. The crunchy, roasted variation is a contemporary take enjoyed in Western cuisines.",
  
  10: "Slow Cooker: Pork and Garbanzo Beans @Country: Spain@Info: Slow-cooked pork and garbanzo (chickpeas) are traditional in Spanish stews, where slow-cooking techniques enhance flavor and tenderness in this hearty dish.",
  
  11: "Powerhouse Almond Matcha Superfood Smoothie @Country: Japan (modern adaptation)@Info: Matcha, originally from Japan, is rich in antioxidants. This smoothie combines almond and matcha, blending Japanese tradition with modern superfood trends.",
  
  12: "Broccolini Quinoa Pilaf @Country: South America (quinoa) and Italy (pilaf influence)@Info: Quinoa’s origins trace back to the Incas, while pilaf is a Mediterranean and Middle Eastern preparation. This fusion dish combines nutrient-dense broccolini with wholesome quinoa.",
  
  13: "Easy To Make Spring Rolls @Country: Vietnam@Info: Spring rolls are a staple of Vietnamese cuisine, traditionally made with fresh vegetables and herbs, wrapped in rice paper for a refreshing and light appetizer.",
  
  14: "Farro With Mushrooms and Asparagus @Country: Italy@Info: Farro, an ancient grain, has been used in Italy for centuries. Combined with mushrooms and asparagus, it creates a wholesome dish enjoyed in rustic Italian cooking."
};



const today = new Date();
const currentyear = document.querySelector("#currentyear");
const menu = document.getElementById("menu");
const navg = document.querySelector("#animateme");
const links = document.querySelectorAll("#animateme span a");

const url =
  "https://api.spoonacular.com/recipes/complexSearch?apiKey=17059537322c4ee0b51c3079f566d5d0&number=15";
const menuWrapper = document.querySelector(".menu-container");
const view = document.querySelector("#view");
const recipesOrigin = document.querySelector("#recipe-origin");
let cachedData;

currentyear.innerHTML = `©${today.getFullYear()} Madam Rose Restaurant`;
const lastModified = document.querySelector("#lastModified");
lastModified.innerHTML = `Last Modification: ${document.lastModified}`;
menu.addEventListener("click", () => {
  navg.classList.toggle("open");
  menu.classList.toggle("open");
});

const fetchMenu = async () => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      cachedData = await response.json();
      displayMenu(cachedData);    
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
};

view.addEventListener("click", () => {
  view.classList.toggle("grid");
  menuWrapper.classList.toggle("grid");
  menuWrapper.innerHTML = "";
  displayMenu(cachedData);
});  

const displayMenu = (data) => {
  data.results.forEach((elem, index) => {
    if (view.classList.contains("grid") === false) {
      const recipeDiv = document.createElement("div");
      recipeDiv.setAttribute("class", "recipeDiv");
      const recipe = document.createElement("p");
      const origin = document.createElement("a");
      origin.setAttribute("href", "#");
      origin.setAttribute("aria-label", "recipe origin");
      origin.setAttribute("id", index);
      origin.textContent = "Click to learn origin";
      origin.addEventListener("click", displayRecipeOrigin);
      recipe.textContent = elem.title;
      recipeDiv.append(recipe, origin);
      menuWrapper.appendChild(recipeDiv);
    } else {
      const div = document.createElement("div");
      const img = document.createElement("img");
      const p = document.createElement("p");

      img.setAttribute("loading", "lazy");
      img.setAttribute("src", elem.image);
      img.setAttribute("alt", elem.title);
      p.innerHTML = elem.title;
      div.append(img, p);
      menuWrapper.appendChild(div);
    }
  });

  if (view.classList.contains("grid") === false) {
    menuWrapper.appendChild(dialog);
  }
};
const currentPath = window.location.pathname;
const currentPage = currentPath.split("/")[3];
links.forEach(elem => {
  if (elem.getAttribute('href') === currentPage) {
    elem.classList.add('active');
  }
});

const displayRecipeOrigin = (event)=>{
  event.preventDefault();
  recipesOrigin.innerHTML = "";
  const activeLink = event.target.id;
  const detail = recipesOriginContent[activeLink];
  if (detail) {
    const detailsParagraphs = detail.split("@");
    recipesOrigin.innerHTML = `
            <button id="closeModal">Close</button>
            <p><strong>${detailsParagraphs[0]}</strong></p>
            <p>${detailsParagraphs[1]}</p>
            <p>${detailsParagraphs[2]}</p>
            `;
    recipesOrigin.showModal();
    const closeModal = document.querySelector("#closeModal");
    closeModal.addEventListener("click", () => {
      recipesOrigin.close();
    });
  }
};
fetchMenu();
