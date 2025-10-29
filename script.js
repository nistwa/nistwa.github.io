// Scroll ile robotun dönmesi
let rotation = 0;
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  rotation = scrollY * 0.3;
  document.getElementById("robot").style.transform = `rotate(${rotation}deg)`;
});

// Klavye (typing) efekti
const text = "AKANA";
const typingElement = document.getElementById("typing-text");
let index = 0;

function typeText() {
  if (index < text.length) {
    typingElement.textContent += text.charAt(index);
    index++;
    setTimeout(typeText, 200);
  }
}

window.onload = typeText;
