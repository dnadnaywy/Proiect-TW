let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".fa-magnifying-glass");

closeBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

searchBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

// let header = document.querySelector(".header");
// let mobileButton = document.querySelector("#mobile-btn");

// mobileButton.addEventListener("click", () => {
//   header.classList.toggle("open");
// });

// following are the code to change sidebar button(optional)
/*function menuBtnChange() {
  if (sidebar.classList.contains("open")) {
    closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the icons class
  } else {
    closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");//replacing the icons class
  }
}*/

document.addEventListener("DOMContentLoaded", () => {
  const hHeader = document.querySelector('.header');
  const headerReact = hHeader.getBoundingClientRect();

  class getHeightHeader {
    constructor() {
      this.height = `${headerReact.height}px`;
    }
  }

  const heightHeader = new getHeightHeader();

  function getHeightH() {
    console.log(heightHeader.height);
  }

  getHeightH();

  const root=document.documentElement;
  root.style.setProperty('--top', heightHeader.height);
});

document.addEventListener("DOMContentLoaded", () => {
  const hHeader = document.querySelector('.header-header');
  const headerReact = hHeader.getBoundingClientRect();

  class getHeightHeader {
    constructor() {
      this.height = `${headerReact.height}px`;
    }
  }

  const heightHeader = new getHeightHeader();

  function getHeightH() {
    console.log(heightHeader.height);
  }

  getHeightH();

  const root=document.documentElement;
  root.style.setProperty('--top', heightHeader.height);
});