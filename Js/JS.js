//selectors
let icon = document.querySelector(".landing-page header i:first-of-type");
let ulIcons = document.querySelector(".landing-page ul");
let liIcons = document.querySelectorAll(".landing-page ul li");
let Xicon = document.querySelector(".landing-page header i:last-of-type");
let links = document.querySelectorAll(".landing-page ul li a");
let landPage = document.querySelector(".landing-page");
let geerIcon = document.querySelector(".settings-box i");
let settingsDiv = document.querySelector(".settings-box");
let liList = document.querySelectorAll(".settings-content .option-box li");
// <<<<===========================End Selectors============================>>>>>>>>

// toggling settings bar
geerIcon.onclick = function () {
  settingsDiv.classList.toggle("opened");

  //toggle icon spin
  geerIcon.classList.toggle("fa-spin");
};

// check if color in local storage
let mainColor = window.localStorage.getItem("main-color");
if (mainColor) {
  //set the color from LS as main color
  document.documentElement.style.setProperty("--main-color", mainColor);

  //set active class to the correct color
  liList[0].classList.remove("active");
  liList.forEach((li) => {
    if (li.dataset.color === mainColor) {
      li.classList.add("active");
    }
  });
}

// change color function
liList.forEach((li) => {
  //add event to each  li
  li.addEventListener("click", function (e) {
    // e.target.getAttribute("data-color");
    //set the selected color as main color
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    //  add this selected color to the local storage
    window.localStorage.setItem("main-color", e.target.dataset.color);

    //set class active to the current color
    for (let i = 0; i < liList.length; i++) {
      if (liList[i].classList.contains("active")) {
        liList[i].classList.remove("active");
      }
    }
    li.classList.add("active");
  });
});

//select
let spanYesBgr = document.querySelector(
  ".settings-content .option-box.background .yes"
);
let spanNoBgr = document.querySelector(
  ".settings-content .option-box.background .no"
);
//check local storage for background randam Img
let bgrImg = window.localStorage.getItem("bgr-Img");
if (bgrImg) {
  landPage.style.cssText += JSON.parse(bgrImg);

  //change opacity from yes to no
  spanYesBgr.style.opacity = "0.4";
  spanNoBgr.style.opacity = "1";
}

//check local storage for background randam or not
let isRandom = true;
if (localStorage.getItem("isRandom")) {
  if (localStorage.getItem("isRandom") !== "true") {
    isRandom = false;
  }
}
// select if backdroung is random or not
// if Yes
let stopInterval;

spanYesBgr.onclick = function () {
  //change opacity from no to yes
  spanNoBgr.style.opacity = "0.4";
  spanYesBgr.style.opacity = "1";
  changBgrImg();
  localStorage.setItem("isRandom", true);
};

// if no
spanNoBgr.onclick = function () {
  //change opacity from yes to no
  spanYesBgr.style.opacity = "0.4";
  spanNoBgr.style.opacity = "1";
  clearInterval(stopInterval);
  localStorage.setItem("isRandom", false);
};
// check is random or not
if (isRandom) {
  spanYesBgr.click();
} else {
  spanNoBgr.click();
}
// change bgr img function
function changBgrImg() {
  let cntImgs;
  stopInterval = setInterval(() => {
    //   cntImgs++;

    cntImgs = Math.ceil(Math.random() * 10);
    cntImgs = cntImgs < 10 ? `0${cntImgs}` : cntImgs;

    //remove last
    landPage.style.removeProperty("background-image");

    //   set new ======> sorted(may be random)
    landPage.style.cssText += `background-image: url("../imgs/${cntImgs}${
      cntImgs == 06 ? ".png" : ".jpg"
    }")`;
    //   if (cntImgs == 10) {
    //     cntImgs = 0;
    //   }
    window.localStorage.setItem(
      "bgr-Img",
      JSON.stringify(`background-image: url("../imgs/${cntImgs}.jpg")`)
    );
  }, 2000);
}
// bullets settings
//select Yes & No spans
let spanYesBullet = document.querySelector(
  ".settings-content .option-box.bullets .yes"
);
let spanNoBullet = document.querySelector(
  ".settings-content .option-box.bullets .no"
);

//select nav bullets
let navBullets = document.querySelector(".bullets-nav");

//clicking yes span
spanYesBullet.onclick = function () {
  //change opacity from no to yes
  spanNoBullet.style.opacity = "0.4";
  spanYesBullet.style.opacity = "1";

  //display nav
  navBullets.classList.remove("remove");

  //add to local storage
  window.localStorage.setItem("bulletDisplay", true);
};

//clicking no span
spanNoBullet.onclick = function () {
  //change opacity from no to yes
  spanNoBullet.style.opacity = "1";
  spanYesBullet.style.opacity = "0.4";

  //undisplay nav
  navBullets.classList.add("remove");

  //add to local storage
  window.localStorage.setItem("bulletDisplay", false);
};

//check local storage for bulletDisplay
let bulletStorage = window.localStorage.getItem("bulletDisplay");

if (bulletStorage === "false") {
  spanNoBullet.click();
} else {
  spanYesBullet.click();
}

//reset button
let resetButton = document.querySelector(".settings-box button");
resetButton.onclick = function () {
  //clear localstorage
  window.localStorage.clear();

  //reload the page

  window.location.reload();
};
// <<<<<<<<<<<====================END settings box==============================>>>>>>>

// check if the media greater than 768px remove the toggle column list
let mediaStop;
function checkQuery() {
  mediaStop = setInterval(() => {
    if (!window.matchMedia("(max-width:768px)").matches) {
      Xicon.click();
    }
  }, 100);
}

//show links bar
icon.onclick = function () {
  for (let i = 0; i < liIcons.length; i++) {
    liIcons[i].classList.add("on");
  }
  ulIcons.classList.add("on");
  Xicon.style.display = "flex";
  checkQuery();
};

// select from nav=>header
let linksNav = document.querySelectorAll(".landing-page ul li a");

linksNav.forEach((link) => {
  //on clicking any link
  link.addEventListener("click", () => {
    goToSectionInDataSet(link);
    Xicon.click();
  });
});

//cancel icons bar
Xicon.onclick = function () {
  ulIcons.classList.remove("on");
  Xicon.style.display = "none";
  clearInterval(mediaStop);
};

//fill skill span on scrolling
let skillSpans = document.querySelectorAll(".skills-section .skill-box span ");
let skillsDiv = document.querySelector(".skills-section");
window.onscroll = function () {
  //offset Y for skill div (distanse from the top to the element)
  let skillOffset = skillsDiv.offsetTop;

  // height of the  All element(H of the element with its margin and padding...etc)
  let skillsHeight = skillsDiv.offsetHeight;

  //get window height
  let windowHeight = window.innerHeight;

  //get All Y offset( the distanse that has been scrolled Up of the current page)
  let offsetY = window.pageYOffset;

  //skills are reached
  if (skillOffset + skillsHeight - windowHeight < offsetY) {
    skillSpans.forEach((skill) => {
      //each percent
      skill.style.width = skill.dataset.percentage;
    });
  }

  // range after skills section
  if (skillOffset + skillsHeight < offsetY) {
    skillSpans.forEach((skill) => {
      //each percent
      skill.style.width = "0";
    });
  }

  // range before skills section
  if (skillOffset - windowHeight > offsetY) {
    skillSpans.forEach((skill) => {
      //each percent
      skill.style.width = "0";
    });
  }
};

//popup-box

//select element needed
let imgs = Array.from(document.querySelectorAll(".gallary-section img"));
let popupImg = document.querySelector(".popup-box-overlay img ");
let popupOverlay = document.querySelector(".popup-box-overlay");
let XiconPopup = document.querySelector(".popup-box-overlay .box i");
let SpanImgNumber = document.querySelector(".popup-box-overlay .box span");

// add event to each event
imgs.forEach((img) => {
  img.addEventListener("click", () => {
    //set photo number
    SpanImgNumber.innerHTML = img.getAttribute("data-phNum");

    //set the url to the popup
    popupImg.setAttribute("src", img.src);

    //display the popup-box
    popupOverlay.classList.add("show");
  });
});

//remove popup
XiconPopup.onclick = function () {
  //remove class show
  popupOverlay.classList.remove("show");
};

window.onclick = function (e) {
  if (e.target === popupOverlay) {
    //remove class show
    popupOverlay.classList.remove("show");
  }
};

/////=========nav bullets=======/////

// select elements
let bullets = document.querySelectorAll(".bullets-nav .bullet");
let spanMessages = document.querySelectorAll(".bullets-nav span");

//on hover
bullets.forEach((bullet, index) => {
  //set hover event
  bullet.addEventListener("mouseover", () => {
    //display the message
    spanMessages[index].classList.add("active");
  });

  //on unhover
  bullet.addEventListener("mouseout", () => {
    //display the message
    spanMessages[index].classList.remove("active");
  });

  //on click => scroll to  the selected section
  bullet.addEventListener("click", () => {
    goToSectionInDataSet(bullet);
  });
});

// scroll to the  element his class in [data-section] atrr
function goToSectionInDataSet(element) {
  //(function scroll to ===>>> make the Y number on top of the current window)
  window.scrollTo(
    0,
    document.querySelector(`.${element.dataset.section}`).offsetTop
  );
}
