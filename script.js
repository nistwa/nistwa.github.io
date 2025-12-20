// ENTRANCE ANIMATION
const images = document.querySelectorAll(".image");

images.forEach((img, i) => {
  img.style.opacity = "0";
  img.style.transform = "skewX(-8deg) translateY(40px)";
  setTimeout(() => {
    img.style.transition = "0.8s ease";
    img.style.opacity = "1";
    img.style.transform = "skewX(-8deg) translateY(0)";
  }, 300 + i * 200);
});

// HOVER TILT
images.forEach(img => {
  img.addEventListener("mousemove", e => {
    const r = img.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    const rx = (y / r.height - 0.5) * 8;
    const ry = (x / r.width - 0.5) * -8;

    img.style.transform = `
      skewX(-8deg)
      rotateX(${rx}deg)
      rotateY(${ry}deg)
      scale(1.03)
    `;
    img.style.boxShadow = "0 0 30px rgba(124,58,237,0.6)";
  });

  img.addEventListener("mouseleave", () => {
    img.style.transform = "skewX(-8deg)";
    img.style.boxShadow = "none";
  });
});

// LOGO BREATHING
const logo = document.querySelector(".logo img");
let grow = true;

setInterval(() => {
  logo.style.transform = grow ? "scale(1.06)" : "scale(1)";
  grow = !grow;
}, 1600);
