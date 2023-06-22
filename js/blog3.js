let title = document.getElementById("title");
let date = document.getElementById("date");
let para1 = document.getElementById("para1");
let para2 = document.getElementById("para2");
let para3 = document.getElementById("para3");
let para4 = document.getElementById("para4");
let para5 = document.getElementById("para5");

title.textContent = sessionStorage.getItem("title");
date.textContent = sessionStorage.getItem("date");
para1.textContent = sessionStorage.getItem("para1");
para2.textContent = sessionStorage.getItem("para2");
para3.textContent = sessionStorage.getItem("para3");
para4.textContent = sessionStorage.getItem("para4");
para5.textContent = sessionStorage.getItem("para5");