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

This work is intended to remain uncommitted on `feat/work-with-me-preview` until reviewed by the owner.
