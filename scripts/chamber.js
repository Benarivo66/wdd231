const courses = [
  {
    subject: "CSE",
    number: 110,
    title: "Introduction to Programming",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.",
    technology: ["HTML", "CSS"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 210,
    title: "Programming with Classes",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.",
    technology: ["C#"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 231,
    title: "Frontend Web Development I",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: false,
  },
];
const today = new Date();
const currentyear = document.querySelector("#currentyear");
currentyear.innerHTML = `©${today.getFullYear()}`;
const menu = document.getElementById("menu");
const navg = document.querySelector("nav");
const lastModified = document.querySelector("#lastModified");
lastModified.innerHTML = document.lastModified;
menu.addEventListener("click", () => {
  navg.classList.toggle("open");
  menu.classList.toggle("open");
});
const courseCodes = document.querySelectorAll(".certificate div")[1];
const displayCourses = (coursess) => {
  coursess.forEach((course) => {
    const p = document.createElement("p");
    if (course.completed === false) {
      p.style.backgroundColor = "white";
      p.style.color = "#03390c";
      p.style.border = "1px solid #03390c";
    } else {
      p.style.backgroundColor = "#03390c";
      p.style.color = "white";
    }
    p.textContent = `${course.subject} ${course.number}`;
    courseCodes.appendChild(p);
  });
};
document.addEventListener('DOMContentLoaded', ()=>{
    displayCourses(courses);
})
const courseFilter = document.querySelectorAll(".certificate div button");
const all = courseFilter[0];
const cse = courseFilter[1];
const wdd = courseFilter[2];
all.addEventListener("click", (event) => {
  courseCodes.innerHTML = "";
  displayCourses(courses);
});
cse.addEventListener("click", (event) => {
  const filteredCourses = courses.filter(
    (course) => course.subject === "CSE"
  );
  courseCodes.innerHTML = "";
  displayCourses(filteredCourses);
});
wdd.addEventListener("click", (event) => {
  const filteredCourses = courses.filter(
    (course) => course.subject === "WDD"
  );
  courseCodes.innerHTML = "";
  displayCourses(filteredCourses);
});
const totalCreditDiv = document.querySelectorAll(".certificate div")[2];
const span = document.createElement("span");
const totalCredits = courses.reduce((a, b) => a + b.credits, 0);
span.innerHTML = `Total number of credits required is ${totalCredits}`;
totalCreditDiv.appendChild(span);
totalCreditDiv.style.margin = "1rem";



