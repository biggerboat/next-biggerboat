// Shuffle the crew on every visit and let the fish swim.

const shuffle = (items) => {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const layoutCrew = () => {
  const list = document.querySelector(".crew-list");
  if (!list) return;

  const [left, right] = list.querySelectorAll(".crew-column");
  const cards = [...list.querySelectorAll(".boatie")];
  const available = shuffle(cards.filter((card) => !card.classList.contains("is-alumni")));
  const alumni = shuffle(cards.filter((card) => card.classList.contains("is-alumni")));
  const desktop = window.matchMedia("(min-width: 768px)");
  const half = (items) => Math.ceil(items.length / 2);

  const layout = () => {
    if (desktop.matches) {
      left.append(...available.slice(0, half(available)), ...alumni.slice(0, half(alumni)));
      right.append(...available.slice(half(available)), ...alumni.slice(half(alumni)));
    } else {
      left.append(...available, ...alumni);
    }
  };

  layout();
  desktop.addEventListener("change", layout);
};

// All fish share one animation loop, which only runs while they are on screen.
const swimFishes = () => {
  const container = document.querySelector(".fishes");
  if (!container) return;

  const fishes = [...container.querySelectorAll(".fish")].map((element) => ({
    element,
    image: element.dataset.image,
    speed: parseFloat(element.dataset.speed),
    delay: parseInt(element.dataset.delay, 10),
    x: -100,
    direction: "right",
  }));

  const turn = (fish, direction) => {
    fish.direction = direction;
    fish.element.src = `${fish.image}_${direction}.png`;
  };

  const start = performance.now();
  let visible = true;
  let last = null;

  const frame = (now) => {
    if (!visible) {
      last = null;
      return;
    }

    // Speeds are in pixels per 60 fps frame, keep them the same on faster screens
    const steps = last === null ? 1 : Math.min((now - last) / (1000 / 60), 4);
    last = now;
    const width = window.innerWidth;

    for (const fish of fishes) {
      const elapsed = now - start - fish.delay;
      if (elapsed < 0) continue;

      fish.x += (fish.direction === "right" ? fish.speed : -fish.speed) * steps;
      if (fish.x > width + 100) {
        fish.x = width + 100;
        turn(fish, "left");
      }
      if (fish.x < -100) {
        fish.x = -100;
        turn(fish, "right");
      }

      const wobble = Math.sin((elapsed / 1000) * 1.5) * 15;
      fish.element.style.transform = `translate3d(${fish.x}px, ${wobble}px, 0)`;
    }

    requestAnimationFrame(frame);
  };

  new IntersectionObserver(([entry]) => {
    const wasVisible = visible;
    visible = entry.isIntersecting;
    if (visible && !wasVisible) requestAnimationFrame(frame);
  }).observe(container);

  requestAnimationFrame(frame);
};

layoutCrew();
swimFishes();
