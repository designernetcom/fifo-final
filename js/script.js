// Progressive enhancement - only add JavaScript features if supported
if ("IntersectionObserver" in window) {
  // Lazy animation on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = "fadeInUp 0.6s ease forwards";
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );
  // Observe all grid items
  document.querySelectorAll(".grid-item").forEach((item) => {
    item.style.opacity = "0";
    observer.observe(item);
  });
  // Add fadeInUp animation
  const style = document.createElement("style");
  style.textContent = `
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `;
  document.head.appendChild(style);
}
// Animate numbers on load
const animateValue = (element, start, end, duration) => {
  const startTimestamp = Date.now();
  const step = () => {
    const timestamp = Date.now();
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    element.textContent = element.dataset.value.includes("%")
      ? value + "%"
      : element.dataset.value.includes("fps")
      ? value + "fps"
      : element.dataset.value.includes("ms")
      ? value + "ms"
      : value;
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      element.textContent = element.dataset.value;
    }
  };
  requestAnimationFrame(step);
};
// Animate stats when visible
if ("IntersectionObserver" in window) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const statNumbers = entry.target.querySelectorAll(".stat-number");
          statNumbers.forEach((stat) => {
            const endValue = parseInt(stat.dataset.value);
            animateValue(stat, 0, endValue, 1000);
          });
          statsObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );
  statsObserver.observe(document.querySelector(".stats"));
}
// Remove loading indicator after content loads
window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelector(".loading").style.display = "none";
  }, 500);
});
// Performance optimization: Debounced resize handler
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Any resize-specific logic here
    console.log("Resize complete");
  }, 250);
});
