/* ═══════════════════════════════════════════════════════
   SUBHAN BAIG — PORTFOLIO JS
   ═══════════════════════════════════════════════════════ */

"use strict";

/* ─── PARTICLE NETWORK BACKGROUND ─── */
(function () {
  const canvas = document.getElementById("portfolioCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const PARTICLE_COUNT = 60;
  const MAX_DIST = 130;
  const COLORS = { node: "rgba(52,211,153,", line: "rgba(56,189,248," };

  let W, H, particles = [], animId;
  let mouse = { x: null, y: null };

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.r = Math.random() * 1.8 + 0.6;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.alpha = Math.random() * 0.5 + 0.3;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < -20 || this.x > W + 20 || this.y < -20 || this.y > H + 20) this.reset();

      // subtle mouse repulsion
      if (mouse.x !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 80) {
          const force = (80 - dist) / 80 * 0.6;
          this.vx += (dx / dist) * force;
          this.vy += (dy / dist) * force;
          // dampen so they don't fly off
          this.vx *= 0.95;
          this.vy *= 0.95;
        }
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = COLORS.node + this.alpha + ")";
      ctx.fill();
    }
  }

  function init() {
    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
  }

  function connect() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.3;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = COLORS.line + alpha + ")";
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    connect();
    animId = requestAnimationFrame(loop);
  }

  window.addEventListener("resize", () => { resize(); });
  canvas.addEventListener("mousemove", e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  canvas.addEventListener("mouseleave", () => { mouse.x = null; mouse.y = null; });

  init();
  loop();
})();

/* ─── NAVBAR: SCROLL + ACTIVE LINK ─── */
(function () {
  const nav = document.getElementById("navbar");
  const links = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  function onScroll() {
    // scrolled style
    if (window.scrollY > 40) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");

    // active link
    let current = "";
    sections.forEach(sec => {
      const top = sec.offsetTop - 110;
      if (window.scrollY >= top) current = sec.id;
    });
    links.forEach(l => {
      l.classList.toggle("active", l.getAttribute("href") === "#" + current);
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

/* ─── HAMBURGER MENU ─── */
(function () {
  const btn = document.getElementById("hamburger");
  const menu = document.getElementById("navLinks");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    const open = btn.classList.toggle("open");
    menu.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", open);
  });

  document.querySelectorAll(".nav-link").forEach(l => {
    l.addEventListener("click", () => {
      btn.classList.remove("open");
      menu.classList.remove("open");
    });
  });
})();

/* ─── THEME TOGGLE ─── */
(function () {
  const btn = document.getElementById("themeToggle");
  const icon = document.getElementById("themeIcon");
  if (!btn) return;

  const saved = localStorage.getItem("portfolio-theme") || "dark";
  document.documentElement.setAttribute("data-theme", saved);
  updateIcon(saved);

  btn.addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme");
    const next = cur === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("portfolio-theme", next);
    updateIcon(next);
  });

  function updateIcon(theme) {
    if (!icon) return;
    icon.className = theme === "dark" ? "fa-solid fa-moon" : "fa-solid fa-sun";
  }
})();

/* ─── SCROLL REVEAL (IntersectionObserver) ─── */
(function () {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        io.unobserve(entry.target);

        // trigger proficiency bars when skills section reveals
        if (entry.target.querySelector && entry.target.querySelector(".prof-fill")) {
          triggerBars();
        }
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -60px 0px" });

  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
})();

/* ─── PROFICIENCY BARS ─── */
function triggerBars() {
  document.querySelectorAll(".prof-fill").forEach(fill => {
    const w = fill.getAttribute("data-width");
    if (w) fill.style.width = w + "%";
  });
}

/* Also trigger on skills section scroll */
(function () {
  const skSection = document.getElementById("skills");
  if (!skSection) return;
  let triggered = false;
  const io = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !triggered) {
      triggered = true;
      setTimeout(triggerBars, 400);
    }
  }, { threshold: 0.2 });
  io.observe(skSection);
})();

/* ─── COUNTER ANIMATION (HERO STATS) ─── */
(function () {
  const counters = document.querySelectorAll(".stat-num[data-target]");
  if (!counters.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.getAttribute("data-target"), 10);
      const duration = 1200;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(ease * target);
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target;
      }
      requestAnimationFrame(update);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => io.observe(c));
})();

/* ─── PROJECT FILTER ─── */
(function () {
  const btns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".project-card");

  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      btns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");
      cards.forEach(card => {
        const cat = card.getAttribute("data-category");
        const show = filter === "all" || cat === filter;
        card.classList.toggle("hidden", !show);
        // animate in
        if (show) {
          card.style.animation = "none";
          void card.offsetWidth;
          card.style.animation = "fadeIn 0.35s ease forwards";
        }
      });
    });
  });

  // Add fadeIn keyframe dynamically
  const style = document.createElement("style");
  style.textContent = `@keyframes fadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }`;
  document.head.appendChild(style);
})();

/* ─── CONTACT FORM ─── */
// Form removed - users can contact via LinkedIn instead

/* ─── BACK TO TOP ─── */
(function () {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();

/* ─── TOAST ─── */
function showToast(msg, duration = 3500) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), duration);
}

/* ─── CUSTOM CURSOR ─── */
(function () {
  const dot = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");
  if (!dot || !ring) return;

  // Only on non-touch devices
  if (window.matchMedia("(pointer: coarse)").matches) return;

  let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;

  document.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + "px";
    dot.style.top = mouseY + "px";
  });

  // Ring follows with lag
  (function animRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + "px";
    ring.style.top = ringY + "px";
    requestAnimationFrame(animRing);
  })();

  // Hover effect on interactive elements
  const hoverTargets = document.querySelectorAll("a, button, .glass-card, .filter-btn, .stag");
  hoverTargets.forEach(el => {
    el.addEventListener("mouseenter", () => ring.classList.add("hovering"));
    el.addEventListener("mouseleave", () => ring.classList.remove("hovering"));
  });

  document.addEventListener("mouseleave", () => {
    dot.style.opacity = "0";
    ring.style.opacity = "0";
  });
  document.addEventListener("mouseenter", () => {
    dot.style.opacity = "1";
    ring.style.opacity = "1";
  });
})();

/* ─── SMOOTH SCROLL for all anchor links ─── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-h"), 10) || 70;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});

/* ─── COPY EMAIL on click ─── */
(function () {
  const emailLink = document.querySelector('a[href^="mailto:"]');
  if (!emailLink) return;
  emailLink.addEventListener("click", e => {
    const email = emailLink.href.replace("mailto:", "");
    navigator.clipboard.writeText(email).then(() => {
      showToast("📋 Email copied to clipboard!");
    }).catch(() => {});
    // Let browser open mailto as well
  });
})();

/* ─── STAGGER REVEAL for child items ─── */
(function () {
  const staggerParents = document.querySelectorAll(".certs-grid, .projects-grid, .achievements-grid, .education-grid, .skills-categories");
  staggerParents.forEach(parent => {
    const children = parent.children;
    Array.from(children).forEach((child, i) => {
      child.style.transitionDelay = (i * 0.07) + "s";
    });
  });
})();

/* ─── ACTIVE SECTION highlight on URL hash update ─── */
(function () {
  const sections = document.querySelectorAll("section[id]");
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        history.replaceState(null, "", "#" + entry.target.id);
      }
    });
  }, { threshold: 0.45 });
  sections.forEach(s => io.observe(s));
})();

console.log(
  `%c[ SB ] %cSubhan Baig Portfolio — Cybersecurity & AI Engineer`,
  "color:#a855f7;font-family:monospace;font-weight:700;font-size:14px",
  "color:#22d3ee;font-family:monospace;font-size:14px"
);
console.log(
  "%cInterested in collaborating? → subhan@example.com",
  "color:#94a3b8;font-family:monospace;font-size:12px"
);
