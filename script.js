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

const swim = (fish) => {
  const image = fish.dataset.image;
  const speed = parseFloat(fish.dataset.speed);
  const delay = parseInt(fish.dataset.delay, 10);
  let x = -100;
  let direction = "right";
  let start = null;

  const turn = (to) => {
    direction = to;
    fish.src = `${image}_${to}.png`;
  };

  const frame = (timestamp) => {
    if (start === null) start = timestamp;
    const wobble = Math.sin(((timestamp - start) / 1000) * 1.5) * 15;

    x += direction === "right" ? speed : -speed;
    if (x > window.innerWidth + 100) {
      x = window.innerWidth + 100;
      turn("left");
    }
    if (x < -100) {
      x = -100;
      turn("right");
    }

    fish.style.transform = `translate(${x}px, ${wobble}px)`;
    requestAnimationFrame(frame);
  };

  setTimeout(() => requestAnimationFrame(frame), delay);
};

layoutCrew();
document.querySelectorAll(".fish").forEach(swim);
