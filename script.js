const navbar = document.getElementById("navbar");
const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");
const year = document.getElementById("year");

// Navbar background
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
});

// Mobile navigation
menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuButton.classList.toggle("active", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
});

// Close menu after choosing a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  });
});

// FAQ accordion
document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const selectedItem = button.parentElement;

    document.querySelectorAll(".faq-item").forEach((item) => {
      if (item !== selectedItem) {
        item.classList.remove("active");
      }
    });

    selectedItem.classList.toggle("active");
  });
});

// Reveal elements as the page scrolls
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

// Animated counters
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = Number(counter.dataset.counter);
      const duration = 1200;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(target * easedProgress);

        counter.textContent =
          target >= 1000
            ? `${currentValue.toLocaleString("fr-FR")}+`
            : currentValue;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      }

      requestAnimationFrame(updateCounter);
      counterObserver.unobserve(counter);
    });
  },
  {
    threshold: 0.7
  }
);

document.querySelectorAll("[data-counter]").forEach((counter) => {
  counterObserver.observe(counter);
});

// Current year
year.textContent = new Date().getFullYear();
