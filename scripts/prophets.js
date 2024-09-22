const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');

const getProphetData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    displayProphets(data.prophets);
}

const displayProphets = (prophets) => {
    prophets.forEach(prophet => {
        const card = document.createElement("section");
        const fullName = document.createElement("h2");
        const portrait = document.createElement("img");
        const placeOfBirth = document.createElement('p');
        const dateOfBirth = document.createElement('p');
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        portrait.setAttribute("src", prophet.imageurl);
        portrait.setAttribute("alt", "latter-day prophet");
        portrait.setAttribute("loading", "lazy");
        portrait.setAttribute("width", "300px");
        portrait.setAttribute("height", "auto");
        placeOfBirth.textContent = `Place of Birth: ${prophet.birthplace}`;
        dateOfBirth.textContent = `Place of Birth: ${prophet.birthdate}`;
        card.appendChild(fullName);
        card.append(dateOfBirth, placeOfBirth);
        card.appendChild(portrait);
        cards.appendChild(card);
    });
}

getProphetData();