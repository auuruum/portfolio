# Work with me — local prototype

Separate, buildless service page for the existing portfolio. EN/RU/LT switching, real portfolio images, public Telegram and email contacts, project selection, screenshot switching, FAQ and a message-preparation dialog.

## Preview

From the repository root, run `python -m http.server 8767 --bind 127.0.0.1` and visit `http://127.0.0.1:8767/work-with-me/`. Opening `work-with-me/index.html` directly also works; clipboard availability depends on the browser.

Language links support `?lang=en`, `?lang=ru` and `?lang=lt`. Switching updates the URL and remembers the choice in this browser.

## Contact behavior

- Preparing a brief shows a review dialog. It does not submit an order or send a message.
- The email action opens Gmail with a draft. The visitor reviews and sends it themselves.
- Copying the brief lets the visitor paste it into Telegram or another client.
- Form contents are not stored or posted to a server. Only the language preference is stored locally.
- The Telegram destination is the public `@auurruum` link on `https://auuruum.dev/`, checked on 2026-10-15. Email matches the existing portfolio.

## Before publication

Confirm the preferred client contact channel, final copy, available capacity, scope/acceptance/support terms and the legal/payment setup. No payment gateway, invoice issuer, merchant account or real checkout has been connected. Payment and project stages on the page describe the proposed workflow, not a verified operational service.

Check hosting suitability before making this a commercial site; GitHub Pages restricts sites primarily facilitating commercial transactions: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits

The approved layout is saved in commit `631cd37`, and the portfolio styling in `4207908`, on `feat/work-with-me-preview`.

## Portfolio styling

`portfolio-theme.css` applies Home's colors, font families, button treatments and neutral surfaces after `work.css`. The page structure, columns and responsive layout remain in `work.css`; the theme also tightens the header gap on the narrowest screens so its controls fit.

## Icons

UI icons on both Home and Work with me are inline SVGs from [Lucide](https://lucide.dev/), including navigation, project actions, contacts, form controls, FAQ toggles and gallery controls. They share a 24 × 24 viewBox, rounded strokes and `currentColor`; service icons display at 20 px. Common sizing lives in `../assets/icons.css`. Icons need no JavaScript loader and remain present when the language changes.

Source: [Lucide revision 1ef60af](https://github.com/lucide-icons/lucide/tree/1ef60af944de207e0d5176905a0759ba12e6ee8d/icons). The upstream ISC/MIT notices are preserved in `../assets/icons/lucide-LICENSE.txt`.

Modrinth and CurseForge marks use brand SVGs from Simple Icons. Sources, licenses and accessibility notes are documented in `../assets/icons/README.md`.
