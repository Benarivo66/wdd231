const today=new Date();
const currentyear=document.querySelector("#currentyear");
currentyear.innerHTML=`©${today.getFullYear()} Benarivo Chamber of Commerce`;
const menu=document.getElementById("menu");
const navg=document.querySelector("#animateme");
const lastModified=document.querySelector("#lastModified");
lastModified.innerHTML=`Last Modification: ${document.lastModified}`;
menu.addEventListener("click",()=>{
    navg.classList.toggle("open");
    menu.classList.toggle("open");
  });
const weatherIcon = document.querySelector('#weatherIcon');  
const pTemp = document.querySelector('#weatherTemp');
const pDesc = document.querySelector('#weatherDesc');
const humidity = document.querySelector('#humidity');
const place = document.querySelector('#place');
const forecast = document.querySelector('.weatherforecast');
const spotlight = document.querySelector(".spotlight");

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=6.53&lon=3.38&units=imperial&appid=233ba0014a0d58bddf5edbd7d7355321';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=6.53&lon=3.38&units=imperial&appid=233ba0014a0d58bddf5edbd7d7355321';
const membersUrl = "data/members.json";

async function apiFetch() {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        displayResults(data);
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }

  async function forecastApiFetch(){
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
          const data = await response.json();
          console.log(data); 
          displayForecastResults(data.list);
        } else {
            throw Error(await response.text());
        }
      } catch (error) {
          console.log(error);
      }
  }
  async function getSpotlightMembers(){
    try {
        const response = await fetch(membersUrl);
        if (response.ok) {
          const data = await response.json();
          console.log(data); 
          displaySpotlightMembers(data);
        } else {
            throw Error(await response.text());
        }
      } catch (error) {
          console.log(error);
      }
  }
  function displayResults(data) {
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    const desc = data.weather[0].description;
    pTemp.innerHTML = `${data.main.temp}&deg;F`;
    pDesc.innerHTML = desc;
    humidity.innerHTML = `Humidity: ${data.main.humidity}%`;
    place.innerHTML = `${data.name}, ${data.sys.country}`;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', `${desc} icon`);
  }
  function displayForecastResults(data){
    const div = document.createElement("div");
    for(let i=6; i<28; i+=10){
        const p = document.createElement("p");
        const temp = data[i].main.temp;
        const date = convertToReadableDate(data[i].dt);
        p.innerHTML = `<i>${date}</i>: ${temp}&deg;F`;
        div.appendChild(p);
    }
    forecast.appendChild(div);
  }
  function convertToReadableDate(unix){
    const timestamp = unix * 1000;
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const readableDate = date.toLocaleDateString('en-US', options);
    return readableDate;
  }
  function displaySpotlightMembers(data){
    const starMembersDiv = document.createElement("div");
    starMembersDiv.setAttribute("class", "starMembers");
    let count=0;
    const checkArr = [];
    const starMembers = data.filter(elem=>elem.membership_level.toLowerCase() !== "bronze");
    while(count<3){
        const randomIndex = Math.floor(Math.random() * starMembers.length);
        if(checkArr.includes(randomIndex) === false){
            checkArr.push(randomIndex);
            const member = starMembers[randomIndex];
            const starMemberCard = document.createElement("div");
            const name = document.createElement("p");
            const phone = document.createElement("p");
            const address = document.createElement("p");
            const website = document.createElement("p");
            const memLevel = document.createElement("p");
            const logo = document.createElement("img");
            name.textContent = member.name;
            phone.textContent = member.phone;
            address.textContent = member.address;
            website.textContent = member.website;
            memLevel.textContent = member.membership_level;
            logo.alt = "company logo";
            logo.loading = "lazy";
            logo.src = member.logo;
            starMemberCard.append(logo, name, phone, address, website, memLevel);
            starMembersDiv.appendChild(starMemberCard);
            count += 1;
        }
    }
    spotlight.appendChild(starMembersDiv);
  }
 
  apiFetch();
  forecastApiFetch();
  getSpotlightMembers();