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

// Easter egg: click the boat and the sea gets rough. The boat is thrown up and down while the waves swell, then it
// settles again. It animates translate, rotate and scale, so the gentle bobbing and the rolling waves carry on.
const boat = document.querySelector(".sea__boat");

if (boat) {
  const duration = 3600;
  const ease = (keyframes) => keyframes.map((keyframe) => ({ easing: "ease-in-out", ...keyframe }));

  const heave = ease([
    { translate: "0 0", rotate: "0deg" },
    { translate: "0 -38%", rotate: "-14deg", offset: 0.12 },
    { translate: "0 12%", rotate: "11deg", offset: 0.26 },
    { translate: "0 -30%", rotate: "-10deg", offset: 0.4 },
    { translate: "0 9%", rotate: "8deg", offset: 0.54 },
    { translate: "0 -18%", rotate: "-5deg", offset: 0.68 },
    { translate: "0 5%", rotate: "3deg", offset: 0.82 },
    { translate: "0 0", rotate: "0deg" },
  ]);

  // How high the waves are at each moment of the storm, relative to their highest point. That highest point follows
  // the size of the boat: the waves grow by at most 28% of its height while the boat rises 38%, so a small boat on a
  // phone rides on top of the waves instead of disappearing behind them.
  const swell = [0, 1, 0.14, 0.7, 0.1, 0.43, 0.04, 0];
  const moments = heave.map((keyframe, i) => keyframe.offset ?? i / (heave.length - 1));
  const waves = (wave) => {
    const growth = (boat.offsetHeight * 0.28) / wave.offsetHeight;
    return ease(swell.map((height, i) => ({ scale: `1 ${1 + growth * height}`, offset: moments[i] })));
  };

  boat.addEventListener("click", () => {
    const calm = !matchMedia("(prefers-reduced-motion: no-preference)").matches;
    // Wait until the boat has sailed in and the previous storm is over.
    const busy = boat.getAnimations().some((animation) => animation.playState === "running");
    if (calm || busy) return;

    boat.animate(heave, { duration });
    document.querySelectorAll(".sea__wave").forEach((wave, i) => wave.animate(waves(wave), { duration, delay: i * 150 }));
    track("Easter egg: storm", { path: location.pathname });
  });
}
