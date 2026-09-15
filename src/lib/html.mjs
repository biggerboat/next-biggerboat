// A tiny tagged template: every interpolated value is escaped, unless it is itself html`` or raw().

class Raw {
  constructor(value) {
    this.value = value;
  }

  toString() {
    return this.value;
  }
}

export const raw = (value) => new Raw(String(value));

export const escape = (value) =>
  String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

const render = (value) => {
  if (value == null || value === false) return "";
  if (value instanceof Raw) return value.value;
  if (Array.isArray(value)) return value.map(render).join("");
  return escape(value);
};

export const html = (strings, ...values) =>
  raw(strings.reduce((out, string, i) => out + string + (i < values.length ? render(values[i]) : ""), ""));

// Pick the value for the current language from a { nl, en } object, plain values are returned as is.
export const t = (value, lang) => (value && typeof value === "object" && !Array.isArray(value) && lang in value ? value[lang] : value);

// Inline markup in copy: *bold* and [links](https://…), everything else is escaped.
export const md = (text) =>
  raw(
    escape(text)
      .replace(/\*(.+?)\*/g, "<strong>$1</strong>")
      .replace(/\[(.+?)\]\(((?:https?:\/\/|mailto:|\/)[^)\s]+)\)/g, '<a href="$2">$1</a>'),
  );

export const jsonLd = (data) =>
  raw(`<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`);
