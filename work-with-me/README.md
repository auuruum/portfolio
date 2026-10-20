# Work with me — local prototype

Separate, buildless service page for the existing portfolio. EN/RU/LT switching, real portfolio images, public Telegram and email contacts, project selection, screenshot switching, FAQ and a message-preparation dialog.

## Preview

From the repository root, run `python -m http.server 8767 --bind 127.0.0.1` and visit `http://127.0.0.1:8767/work-with-me/`. Opening `work-with-me/index.html` directly also works; clipboard availability depends on the browser.

Language links support `?lang=en`, `?lang=ru` and `?lang=lt`. Switching updates the URL and remembers the choice in this browser.

Visible translated text fades out with a slight blur, then the new language appears with a small upward reveal and a short stagger. Only rendered text blocks animate; the cosmic video keeps playing. The current reading position, calculator choices and inquiry draft are preserved. Rapid clicks cancel the previous transition and use the last selected language. Reduced-motion preferences switch immediately, including when enabled during a transition. Page cleanup cancels language animations before navigation replaces the foreground.

## Hero composition

The hero shows the complete launcher and website screenshots at their original proportions, with overlapping placement, a shared perspective and restrained shadows. The project caption sits below the composition and links to the details; each screen has its own attached label. Labels and image descriptions follow EN/RU/LT; layout styles live in `hero-layers.css`.

## Budget calculator

The calculator sits after the service links and works in EN/RU/LT without collecting contact details. Service links select the corresponding calculator option.

- Minecraft mods/plugins: **Small mod** €20–30, **Medium mod** €50–70, **Large mod from €80 with an individual quote**. These tiers use general size labels without per-feature examples; estimates cover one agreed game version and platform.
- Discord bots: €30–50 for basic commands or a small automation on one server; **from €80 with an individual quote** for integrations or connected workflows.
- Small changes: €15–25 for one defined change, after reviewing the existing code. Several related changes need a separate quote; an unknown cause, migration or affected integration is captured in the requirements.
- Websites: €100–180 for one responsive page using a familiar starting layout; €200–350 for a few pages in one style. Text and images are supplied by the client. Custom applications, custom design beyond the starting layout, content creation and extra languages need a separate quote.
- Server setups: €40–80 for basic configuration; €100–180 for an extended setup of one game mode using existing plugins. Hosting, paid plugins, maps and custom code are separate.
- Small launches using existing tools: a €200–300 **starting budget**, with a limited scope to agree. Selected components are requests to discuss, not a promise that an entire ecosystem is included. Selecting multiple components or a launcher requests an individual quote.
- Uncertainty and additional requirements need an individual quote. The requirements are specific to each service: Minecraft compatibility/assets/integrations for mods; integrations, multiple Discord servers and bot languages for bots; accounts/payments, website languages and design/content for websites; custom plugins, server networks and map/resource-pack configuration for setups; diagnosis, migration and integrations for fixes; custom development, component connections and languages for complete projects.
- Launchers ask about accounts, updates and operating-system support as requirements for an individual quote. They never refer to a nonexistent basic price range.
- Any base range shown is explicitly a reference for the selected scope before additional requirements, not the quote for the selection. Starting prices never become fixed-price estimates.
- Standalone launchers are individually quoted after discussing the existing base, platforms, accounts and update system.

Prices and per-service scope options live in `pricingServices` in `work.js`; calculator copy lives in `pricingTranslations`. Each scope has a label and optional explanation, plus either a budget range, a starting minimum or no automatic amount. A separate “not sure” option never assigns a price. Hosting, domains, paid services and ongoing maintenance are separate from development. New features and additional platforms are quoted before being added.

Each service also defines its requirement labels, optional heading/help text, included deliverables and excluded costs. Server setups include configuration/testing and configuration files; fixes include updated source files and change notes; websites include publishing instructions. Complete-project component choices also include mods/plugins. Changing services resets requirements and components; changing languages preserves the choices and translates their labels in both the calculator and prepared message.

“Use this estimate” attaches the current selection to the inquiry and selects its service. Further calculator changes update the attached estimate. Removing it, or deselecting its service in the form, detaches it. The visitor's own budget remains a separate, untouched field. The prepared message includes the chosen scope, components, additional requirements and estimate status.

Calculator choices and the attached-estimate flag are retained in memory when navigating to the portfolio and back, along with the inquiry draft. They are not saved to local storage or sent to a server. Language changes preserve the choices and translate the attached estimate.

## Contact behavior

- Preparing a brief shows a review dialog. It does not submit an order or send a message.
- The email action opens Gmail with a draft. The visitor reviews and sends it themselves.
- Telegram opens the `@auurruum` chat with the brief in the draft, using Telegram's public-username `text` link parameter. Briefs longer than 4,096 Unicode code points are copied in full and open the chat without a draft so the client cannot silently trim them; they may need to be sent in parts.
- Discord copies the brief and opens the owner's profile (`568834033430036525`, supplied by the owner). The visitor starts a chat and pastes the text; messaging remains subject to Discord's account and privacy settings. There is no automatic DM or text prefill.
- Channel links open in a new tab. Copying starts during the click, before normal link navigation. Clipboard success is confirmed in the dialog; if copying is unavailable, the preview is selected for manual copying. The separate copy action is available for any client.
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
