// Moving stars background
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

let stars = [];
let width = 0;
let height = 0;

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;

  canvas.width = width * ratio;
  canvas.height = height * ratio;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const count = Math.min(180, Math.floor((width * height) / 6500));

  stars = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.4 + 0.25,
    speed: Math.random() * 0.32 + 0.08,
    opacity: Math.random() * 0.65 + 0.2
  }));
}

function drawStars() {
  ctx.clearRect(0, 0, width, height);

  stars.forEach(star => {
    star.y += star.speed;

    if (star.y > height) {
      star.y = -3;
      star.x = Math.random() * width;
    }

    star.opacity += (Math.random() - 0.5) * 0.02;
    star.opacity = Math.max(0.15, Math.min(0.9, star.opacity));

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(220, 190, 255, ${star.opacity})`;
    ctx.fill();
  });

  requestAnimationFrame(drawStars);
}

resizeCanvas();
drawStars();
window.addEventListener("resize", resizeCanvas);

// Mobile menu
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

navMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
  });
});

// Automatic footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Contact form: opens the visitor's email application
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const service = document.getElementById("service").value;
  const message = document.getElementById("message").value.trim();

  const subject = encodeURIComponent(`Nexovanta project enquiry from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nService: ${service}\n\nProject details:\n${message}`
  );

  // Replace this demo address with your real email before publishing.
  window.location.href =
    `mailto:hello@nexovanta.com?subject=${subject}&body=${body}`;
});