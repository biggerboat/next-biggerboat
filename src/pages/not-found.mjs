// GitHub Pages serves this for every unknown URL, in any language, so it speaks both.

import { layout } from "../layout.mjs";
import { html } from "../lib/html.mjs";
import { pagePath } from "../lib/routes.mjs";
import { illustration } from "./home.mjs";

export const render = (ctx) =>
  layout(
    {
      lang: "en",
      id: "not-found",
      path: "/404.html",
      alternates: { nl: pagePath("home", "nl"), en: pagePath("home", "en") },
      title: "Page not found | Bigger Boat",
      description: "This page doesn't exist (anymore).",
      noindex: true,
      body: html`
      <section class="not-found">
        <div class="container narrow">
          ${illustration("shark", 217, 104, "", "not-found__shark")}
          <h1 class="page-head__title">404. This page swam off.</h1>
          <p class="page-head__lead">It doesn't exist, or not anymore. Try one of these instead.</p>
          <p class="page-head__lead" lang="nl">Deze pagina is weggezwommen. Probeer een van deze links.</p>
          <div class="actions">
            <a class="button button--primary" href="${pagePath("home", "en")}">English homepage</a>
            <a class="button button--ghost" href="${pagePath("home", "nl")}" lang="nl">Nederlandse homepage</a>
          </div>
        </div>
      </section>
      `,
    },
    ctx,
  );
