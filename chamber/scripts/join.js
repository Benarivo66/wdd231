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
const membershipDetails = document.querySelector("#membership-details");
const membershipContent = {
  np: "Non-Profit Membership@Cost: Free@Benefits: Includes event access, community spotlight, newsletter exposure, and more tailored benefits for non-profits.",
  bronze:
    "Bronze Membership@Cost:$50@Benefits:Basic benefits such as event access, directory listing, training discounts, and business referrals.",
  silver:
    "Silver Membership@Cost:$100@Benefits:Includes all Bronze benefits plus advertising opportunities, additional event invites, and training programs.",
  gold: "Gold Membership@Cost:$150@Benefits:Premium benefits including exclusive events, VIP access, spotlight advertising, and priority business referrals.",
};
const displayMembershipDetails = (event)=>{
  event.preventDefault();
  membershipDetails.innerHTML = "";
  const activeLink = event.target.id;
  const detail = membershipContent[activeLink];
  if (detail) {
    const detailsParagraphs = detail.split("@");
    membershipDetails.innerHTML = `
            <button id="closeModal">Close</button>
            <p><strong>${detailsParagraphs[0]}</strong></p>
            <p>${detailsParagraphs[1]}</p>
            <p>${detailsParagraphs[2]}</p>
            `;
    membershipDetails.showModal();
    const closeModal = document.querySelector("#closeModal");
    closeModal.addEventListener("click", () => {
      membershipDetails.close();
    });
  }
};
document.querySelectorAll('.membership_info a').forEach(a=>{
    a.addEventListener('click', displayMembershipDetails);
});
const hiddenInput = document.querySelector('#timestamp label input[type="hidden"]');
const d = new Date();
const isoDate = d.toISOString();
hiddenInput.value = isoDate;

