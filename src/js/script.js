document.addEventListener('DOMContentLoaded', () => {
  // Apply PowerGlitch to the specified element
  const applyGlitch = (selector, delay, infinite = false) => {
    setTimeout(() => {
      const element = document.querySelector(selector);
      if (element) {
        element.style.opacity = '1';
        PowerGlitch.glitch(selector, {
          playMode: 'always',
          createContainers: true,
          hideOverflow: true,
          timing: {
            duration: 2500,
            iterations: infinite ? Infinity : 1,
          },
          glitchTimeSpan: {
            start: 0,
            end: 0.5,
          },
          shake: {
            velocity: infinite ? 80 : 15,
            amplitudeX: infinite ? 0.5 : 0.2,
            amplitudeY: infinite ? 0.5 : 0.2,
          },
          slice: {
            count: infinite ? 60 : 6,
            velocity: 15,
            minHeight: 0.02,
            maxHeight: 0.15,
            hueRotate: true,
          },
          pulse: false,
        });

        if (infinite) {
          const scrollDown = document.getElementById("scroll-down");
          const arrow = scrollDown.querySelector("span");
          arrow.style.display = "block";
          arrow.style.fontSize = "2rem";
          arrow.style.cursor = "pointer";
          scrollDown.style.position = "absolute";
          scrollDown.style.bottom = "20px";
          scrollDown.style.left = "50%";
          scrollDown.style.transform = "translateX(-50%)";
        }
      }
    }, delay);
  };

  // Initially hide the arrow
  const scrollDown = document.getElementById("scroll-down");
  const arrow = scrollDown.querySelector("span");
  arrow.style.display = "none";

  // Apply glitch effects with a small delay between each element
  applyGlitch('#title', 0);
  applyGlitch('#subtitle', 500);
  applyGlitch('#subtitle-text', 1000);
  applyGlitch('#about', 2000);
  applyGlitch('#scroll-down span', 4000, true); // Glitch indefinitely

  // Initially hide the glitch-sections
  const glitchSections = document.querySelectorAll('.glitch-section');
  glitchSections.forEach(section => {
    section.style.opacity = '0';
  });

  // Glitch titles with the glitch-title class when they come into view
  const glitchTitles = document.querySelectorAll('.glitch-title');
  const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        PowerGlitch.glitch(entry.target, {
          playMode: 'always',
          createContainers: true,
          hideOverflow: true,
          timing: {
            duration: 1000,
            iterations: 1,
          },
          glitchTimeSpan: {
            start: 0,
            end: 0.7,
          },
          shake: {
            velocity: 15,
            amplitudeX: 0.2,
            amplitudeY: 0.2,
          },
          slice: {
            count: 6,
            velocity: 15,
            minHeight: 0.02,
            maxHeight: 0.15,
            hueRotate: true,
          },
          pulse: false,
        });
      }
    });
  });

  glitchTitles.forEach(title => {
    titleObserver.observe(title);
  });

  // Glitch projects-section only the first time it comes into view
  const projectsSection = document.querySelector('.projects-section');
  const projectsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        PowerGlitch.glitch(entry.target, {
          playMode: 'always',
          createContainers: true,
          hideOverflow: true,
          timing: {
            duration: 2000,
            iterations: 1,
          },
          glitchTimeSpan: {
            start: 0,
            end: 0.7,
          },
          shake: {
            velocity: 15,
            amplitudeX: 0.2,
            amplitudeY: 0.2,
          },
          slice: {
            count: 6,
            velocity: 15,
            minHeight: 0.02,
            maxHeight: 0.15,
            hueRotate: true,
          },
          pulse: false,
        });
        entry.target.style.opacity = '1'; // Ensure the opacity is set back to 1 after glitching
        projectsObserver.unobserve(entry.target);
      }
    });
  });

  projectsObserver.observe(projectsSection);

  const navbar = document.querySelector(".navbar");
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".navbar ul");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    hamburger.classList.toggle("open");
  });

  navLinks.querySelectorAll("li").forEach(li => {
    li.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = li.querySelector("a").getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      const offset = navbar.offsetHeight;
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
      navLinks.classList.remove("open");
      hamburger.classList.remove("open");
    });
  });
});