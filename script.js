let posterList = [];

fetch("./list.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((element) => {
      const slider = document.querySelector("#grid");
      const slide = document.createElement("div");
      const content = document.createElement("div");
      content.classList.add("content");
      slide.classList.add("item");
      slide.classList.add("photo");
      const img = document.createElement("img");
      const btn = document.createElement("a");
      btn.textContent = "Acheter";
      img.classList.add("photothumb");
      btn.setAttribute("href", element.buyUrl);
      btn.setAttribute("target", "_blank");
      img.setAttribute("loading", "lazy");
      img.src = element.imageUrl;
      const description = document.createElement("div");
      description.classList.add("tooltip");
      const name = document.createElement("span");
      const desc = document.createElement("p");
      name.textContent = element.name;
      desc.textContent = element.description;
      content.appendChild(img);
      slide.append(content);
      content.append(description);
      description.append(name, desc, btn);
      slider.append(slide);
    });

    setTimeout(() => {
      resize();
    }, "1000");

    setTimeout(() => {
      freeScroll();
    }, "1200");
  });

function freeScroll() {
  document.body.style.overflowY = "scroll";
}

function resize() {
  function resizeGridItem(item) {
    grid = document.getElementsByClassName("grid")[0];
    rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue("grid-auto-rows"));
    rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue("grid-row-gap"));
    rowSpan = Math.ceil(
      (item.querySelector(".content").getBoundingClientRect().height + rowGap) /
        (rowHeight + rowGap) -
        1
    );
    item.style.gridRowEnd = "span " + rowSpan;
  }

  function resizeAllGridItems() {
    allItems = document.getElementsByClassName("item");
    for (x = 0; x < allItems.length; x++) {
      resizeGridItem(allItems[x]);
    }
  }

  function resizeInstance(instance) {
    item = instance.elements[0];
    resizeGridItem(item);
  }

  window.onload = resizeAllGridItems();
  window.addEventListener("resize", resizeAllGridItems);

  allItems = document.getElementsByClassName("item");
  for (x = 0; x < allItems.length; x++) {
    imagesLoaded(allItems[x], resizeInstance);
  }
}

// SCROLL;

const body = document.body,
  scrollWrap = document.getElementsByClassName("smooth-scroll-wrapper")[0],
  height = scrollWrap.getBoundingClientRect().height,
  speed = 0.04;

var offset = 0;

body.style.height = Math.floor(height) + "px";

function smoothScroll() {
  offset += (window.pageYOffset - offset) * speed;

  var scroll = "translateY(-" + offset + "px) translateZ(0)";
  scrollWrap.style.transform = scroll;

  callScroll = requestAnimationFrame(smoothScroll);
}

smoothScroll();
const content = document.querySelector("section");
let currentPos = window.pageYOffset;

const callDistort = function () {
  const newPos = window.pageYOffset;
  const diff = newPos - currentPos;
  const speed = diff * 0.2;

  content.style.transform = "skewY(" + speed + "deg)";
  currentPos = newPos;
  requestAnimationFrame(callDistort);
};

callDistort();
