// The only JavaScript on the site. Everything works without it.

// Nobody gets to be first in line forever: the crew is shuffled on every visit.
for (const list of document.querySelectorAll("[data-shuffle]")) {
  const items = [...list.children];
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  list.append(...items);
}

// The numbers count up when they scroll into view. The real numbers are in the HTML, this only animates them.
// Zero counts down instead: there used to be account managers, now there are none.
if (matchMedia("(prefers-reduced-motion: no-preference)").matches && "IntersectionObserver" in window) {
  const numbers = new Map();

  const count = (element) => {
    const { target, from, suffix } = numbers.get(element);
    const start = performance.now();
    const duration = 1400;

    const frame = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      element.textContent = `${Math.round(from + (target - from) * eased)}${suffix}`;
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };

  // The observer reports every number once right away, which tells where it is without forcing a layout.
  const observer = new IntersectionObserver(
    (entries) => {
      for (const { target: element, isIntersecting, boundingClientRect } of entries) {
        const below = boundingClientRect.top >= innerHeight;
        if (below) {
          // Start from the starting value, so the number doesn't jump back when it scrolls into view.
          const { from, suffix } = numbers.get(element);
          element.textContent = `${from}${suffix}`;
        } else {
          // Visible now, or already scrolled past on a reload halfway down the page.
          observer.unobserve(element);
          if (isIntersecting || boundingClientRect.bottom > 0) count(element);
        }
      }
    },
    { threshold: 0.5 },
  );

  for (const element of document.querySelectorAll(".stats dd")) {
    const match = element.textContent.match(/^(\d+)(.*)$/);
    if (!match) continue;
    const target = Number(match[1]);
    numbers.set(element, { target, from: target === 0 ? 9 : 0, suffix: match[2] });
    observer.observe(element);
  }
}

// Remember an explicit language choice, so the language gateway on / respects it next time.
// Custom analytics events, only sent when a privacy friendly analytics script (Plausible compatible) is loaded.
const track = (name, props) => {
  if (typeof window.plausible === "function") window.plausible(name, { props });
};

document.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (!link) return;

  const href = link.getAttribute("href") || "";
  const name = link.dataset.event;

  if (link.dataset.lang) {
    try {
      localStorage.setItem("lang", link.dataset.lang);
    } catch {}
  }

  if (name) {
    track(name, { path: location.pathname, href });
  } else if (href.startsWith("mailto:")) {
    track("Email click", { path: location.pathname });
  } else if (href.startsWith("tel:")) {
    track("Phone click", { path: location.pathname });
  } else if (link.host && link.host !== location.host) {
    track("Outbound link", { path: location.pathname, url: link.href });
  }
});
