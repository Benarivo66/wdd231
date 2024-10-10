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
const showInfo = document.querySelector("#results");
const url = window.location.href;
const everything = url.split("?");
let formData = everything[1].split("&");
function show(field){
    formData.forEach((elem)=>{
        if(elem.startsWith(field)){
            result = elem.split("=")[1].replace("%40", "@");
        }
    });
    return result;
}
const timestamp = show("timestamp").split("T");
const timepart = timestamp[1].split("%3A");
showInfo.innerHTML = `
<p>First Name: ${show("first-name")}</p>
<p>Last Name: ${show("last-name")}</p>
<p>Email: ${show("email")}</p>
<p>Phone: ${show("telephone")}</p>
<p>Business Name: ${show("business-name").replace(/\+/g, " ")}</p>
<p>Timestamp: ${timestamp[0]} ${timepart[0]}:${timepart[1]}</p>
`;