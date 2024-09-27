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
  const url="chamber/data/members.json";
  const main=document.querySelector("main");
  const cards=document.createElement("div");
  const lists=document.createElement("ul");
  const view=document.createElement("button");
  view.setAttribute("aria-label", "toggle view");
  view.setAttribute("id", "view");
  const getMemberData=async ()=>{
      const response=await fetch(url);
      const data=await response.json();
        displayMembers(data);
      view.addEventListener("click",()=>{
        view.classList.toggle("list");    
        cards.classList.toggle("list");
        cards.innerHTML="";
        lists.innerHTML="";
        displayMembers(data);
      });}  
  const displayMembers=(members)=>{
      members.forEach(member=>{
        if(view.classList.contains("list")){
          const list=document.createElement("li");
          list.textContent=member.name;
          lists.appendChild(list);
          cards.appendChild(lists);
        }else{
          const img=document.createElement('img');
          img.alt=`${member.name} photo`;
          img.src=member.image;
          img.loading="lazy"  
          const card=document.createElement("div");
          const name=document.createElement("p");
          const address=document.createElement("p");
          const phone=document.createElement("p");
          const memLevel=document.createElement("p");
          name.textContent=member.name;
          address.textContent=member.address;
          phone.textContent=member.phone;
          memLevel.textContent=member.membership_level;
          card.append(img, name, phone, address, memLevel);
          cards.appendChild(card);}});
      main.append(view, cards);}
  getMemberData();
