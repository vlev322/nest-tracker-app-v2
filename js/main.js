const sliderContainer = document.getElementById("slider-container");
const slide = document.getElementById("slide");
const thumbnails = document.getElementById("thumbnails");
const scroller = document.getElementById("scroller");
const thumbnailsWrapper = document.getElementsByClassName("thumbnails-wrapper")[0];

const slideImg = slide.querySelector("img");
const controlls = sliderContainer.querySelectorAll("div");
const scrollThumb = scroller.querySelectorAll("div")[0];

// Create an array <div> <img /> <div/> for thumbnail preview
for (let i = 1; i <= 32; i++) {
  const div = document.createElement("div");
  const img = document.createElement("img");
  img.setAttribute("src", "./assets/img/slides/Nest Tracker App Presentation- Page-" + i + ".jpg");
  // img.setAttribute("src", `./assets/img/slides/Nest Tracker App Presentation- Page-${[i]}.jpg`);
  thumbnails.appendChild(div).appendChild(img);
}

const thumbnailItems = thumbnails.querySelectorAll("div");
//controll from slider
let current = 1;
const isOutside = function (pos) {
  if (pos > 32) {
    current = 1;
  }
  if (pos < 1) {
    current = 32;
  }
};
controlls[0].addEventListener("click", function () {
  current -= 1;
  isOutside(current);
  thumbnails.scrollLeft = Math.trunc(thumbnails.scrollWidth / 32) * current - Math.trunc(thumbnails.scrollWidth / 32);
  slideImg.setAttribute("src", "./assets/img/slides/Nest Tracker App Presentation- Page-" + current + ".jpg");
});

controlls[1].addEventListener("click", function () {
  current += 1;
  isOutside(current);
  thumbnails.scrollLeft = Math.trunc(thumbnails.scrollWidth / 32) * current - Math.trunc(thumbnails.scrollWidth / 32);
  slideImg.setAttribute("src", "./assets/img/slides/Nest Tracker App Presentation- Page-" + current + ".jpg");
});

// controll thumbnail moving
scrollThumb.ondragstart = function () {
  return false;
};

scrollThumb.onmousedown = function (e) {
  const shiftX = e.pageX - scrollThumb.getBoundingClientRect().left + thumbnailsWrapper.getBoundingClientRect().left;

  function moveAt(e) {
    const avalibleWidthThumb = thumbnailsWrapper.getBoundingClientRect().width;
    const left = e.clientX - shiftX;

    if (left >= 0 && left <= avalibleWidthThumb) {
      const persThumb = (left / avalibleWidthThumb) * 100;
      const scrollThumbnails = (thumbnails.scrollWidth * persThumb) / 100;
      thumbnails.scrollLeft = scrollThumbnails;
      scrollThumb.style.left = left + "px";
    }
  }

  document.onmousemove = function (e) {
    moveAt(e);
  };

  scrollThumb.onmouseup = function () {
    document.onmousemove = null;
  };
  scrollThumb.onmouseleave = function () {
    document.onmousemove = null;
  };
};

thumbnails.onmousedown = function () {
  let pageX = 0;

  document.onmousemove = function (e) {
    if (pageX !== 0) {
      thumbnails.scrollLeft = thumbnails.scrollLeft + (pageX - e.pageX);

      const avalibleWidth =
        thumbnailsWrapper.getBoundingClientRect().width + scrollThumb.getBoundingClientRect().width * 2.5;
      const persNum =
        (thumbnails.scrollLeft / (thumbnails.scrollWidth + thumbnails.getBoundingClientRect().width)) * 100;
      const left = (avalibleWidth * persNum) / 100;
      scrollThumb.style.left = left + "px";
    }
    pageX = e.pageX;
  };

  thumbnails.onmouseup = function () {
    document.onmousemove = null;
  };
  thumbnails.onmouseleave = function () {
    document.onmousemove = null;
  };

  thumbnails.ondragstart = function () {
    return false;
  };
};

//fullscreenImg
for (let i = 0; i < thumbnailItems.length; i++) {
  const thumb = thumbnailItems[i];
  const img = thumb.querySelector("img");
  thumb.addEventListener("click", function (e) {
    const src = img.getAttribute("src");
    slideImg.setAttribute("src", src);
  });
}
slide.addEventListener("click", function () {
  sliderContainer.classList.toggle("full-screen");
});
