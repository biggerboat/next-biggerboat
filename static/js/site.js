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
