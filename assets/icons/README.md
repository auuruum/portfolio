# Portfolio SVG icons

UI icons are inline Lucide SVGs from revision `1ef60af944de207e0d5176905a0759ba12e6ee8d`: https://github.com/lucide-icons/lucide/tree/1ef60af944de207e0d5176905a0759ba12e6ee8d/icons

This extends the service icons to navigation, project actions, contact controls, disclosure toggles and gallery controls on both pages. All UI icons use a 24 × 24 viewBox, rounded strokes and `currentColor`. Shared sizes live in `../icons.css`; page styles set the size appropriate to each control.

Modrinth and CurseForge brand paths come from Simple Icons revision `4d29a35c954699b389a834aacc97dd6e7e74143c`: https://github.com/simple-icons/simple-icons/tree/4d29a35c954699b389a834aacc97dd6e7e74143c/icons

Licenses are retained in `lucide-LICENSE.txt` and `simple-icons-LICENSE.md`. Brand names remain visible beside their decorative marks.

SVGs are embedded directly in HTML, without a JavaScript loader or external SVG sprite. Decorative icons use `aria-hidden="true"` and `focusable="false"`; icon-only controls keep accessible labels. Translated labels live in child spans, so changing EN/RU/LT cannot erase an adjacent icon.
