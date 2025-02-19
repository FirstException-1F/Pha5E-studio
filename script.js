function animateElementPosition(
  elem,
  left,
  top,
  duration = 0.6,
  ease = "power2.out"
) {
  gsap.to(elem, {
    left: typeof left === "number" ? left + "px" : left,
    top: typeof top === "number" ? top + "px" : top,
    duration: duration,
    ease: ease,
    overwrite: "auto",
  });
}

function setHeaderHoverStyle() {
  const header = selectElement("header");
  header.style.WebkitTextStroke = ".5px gray";
  header.style.color = "transparent";
}

function resetHeaderStyle() {
  const header = selectElement("header");
  header.style.WebkitTextStroke = "";
  header.style.color = "";
}

function setWrapperZIndex(wrapper, zIndex) {
  wrapper.style.zIndex = zIndex;
}

function fadeOutAllImagesExcept(mainImg) {
  const otherImgs = Array.from(document.querySelectorAll("img")).filter(
    (img) => img !== mainImg
  );
  otherImgs.forEach((img) => {
    gsap.to(img, {
      opacity: 0,
      duration: 0.2,
      ease: "power1.out",
    });
  });
}

function fadeInAllImages() {
  const imgs = document.querySelectorAll("img");
  imgs.forEach((img) => {
    gsap.to(img, {
      opacity: 1,
      duration: 0.2,
      ease: "power1.in",
    });
  });
}

function fadeInText(mainText) {
  gsap.to(mainText, {
    opacity: 1,
    duration: 0.2,
    ease: "power1.out",
  });
}
function fadeOutText(mainText) {
  gsap.to(mainText, {
    opacity: 0,
    duration: 0.2,
    ease: "power1.out",
  });
}
function MouseMoveHelper(
  imageWrapper,
  image,
  wrapperToMoveAhead,
  initialPosition
) {
  let lastEvent = null;
  let isTicking = false;

  function updateImagePosition() {
    const rect = wrapperToMoveAhead.getBoundingClientRect();
    const imageRect = image.getBoundingClientRect();
    const targetX = lastEvent.clientX - rect.left - imageRect.width / 2;
    const targetY = lastEvent.clientY - rect.top - imageRect.height / 2;

    animateElementPosition(image, targetX, targetY);
    setHeaderHoverStyle();
    setWrapperZIndex(wrapperToMoveAhead, 99);
    const mainImg = image.querySelector("img");
    const mainText = image.querySelector("div");
    fadeOutAllImagesExcept(mainImg);
    fadeInText(mainText);
  }

  imageWrapper.addEventListener("mousemove", (event) => {
    lastEvent = event;
    if (!isTicking) {
      isTicking = true;
      requestAnimationFrame(() => {
        updateImagePosition();
        isTicking = false;
      });
    }
  });

  imageWrapper.addEventListener("mouseleave", () => {
    animateElementPosition(
      image,
      initialPosition.left,
      initialPosition.top,
      2,
      "expo.out"
    );
    resetHeaderStyle();
    setWrapperZIndex(wrapperToMoveAhead, 2);
    fadeInAllImages();
    const mainText = image.querySelector("div");
    fadeOutText(mainText);
  });
}

function mouseMoveAnimation() {
  const AllImagesInformation = [
    {
      overlay: "first-overlay",
      image: "image-top-left-container",
      wrapper: "image-top-left-wrapper",
      initial: { left: "188.512px", top: "140px" },
    },
    {
      overlay: "second-overlay",
      image: "image-top-right-container",
      wrapper: "image-top-right-wrapper",
      initial: { left: "288.512px", top: "140px" },
    },
    {
      overlay: "third-overlay",
      image: "image-bottom-left-container",
      wrapper: "image-bottom-left-wrapper",
      initial: { left: "101.35px", top: "30.4px" },
    },
    {
      overlay: "fourth-overlay",
      image: "image-bottom-right-container",
      wrapper: "image-bottom-right-wrapper",
      initial: { left: "151.35px", top: "-10px" },
    },
  ];

  AllImagesInformation.forEach((Image) => {
    MouseMoveHelper(
      selectElement(Image.overlay),
      selectElement(Image.image),
      selectElement(Image.wrapper),
      Image.initial
    );
  });
}

function selectElement(name) {
  return document.querySelector(`.${name}`);
}

function InitialAnimationSetting() {
  const header = selectElement("header");
  Array.from(header.children).forEach((child) => {
    const h1inside = child.querySelector("h1");
    if (h1inside) {
      h1inside.style.transform = "translateY(300%)";
      h1inside.style.opacity = "0";
    }
    child.style.height = "105px";
    child.style.overflow = "hidden";
  });
}

function InitialAnimation() {
  const header = selectElement("header");
  Array.from(header.children).forEach((child, idx) => {
    const h1inside = child.querySelector("h1");
    if (h1inside) {
      gsap.to(h1inside, {
        y: -10,
        opacity: 1,
        duration: 0.8,
        delay: 0.12 * idx,
        ease: "power2.out",
      });
    }
  });

  const contentFirst = selectElement("content-first");
  const contentSecond = selectElement("content-second");
  const contentFirstWrappers = Array.from(contentFirst.children);
  const contentSecondWrappers = Array.from(contentSecond.children);

  const animations = [
    { elem: contentFirstWrappers[0], delay: 0.6 },
    { elem: contentSecondWrappers[0], delay: 1.1 },
    { elem: contentFirstWrappers[1], delay: 0.9 },
    { elem: contentSecondWrappers[1], delay: 0.7 },
  ];

  animations.forEach((item) => {
    gsap.to(item.elem, {
      scale: 1,
      opacity: 1,
      delay: item.delay,
      duration: 1,
      ease: "power2.out",
    });
  });
}

InitialAnimationSetting();
InitialAnimation();
setTimeout(() => {
  mouseMoveAnimation();
}, 1800);
