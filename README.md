# Accessibility test site (axe + Chromatic)

A fake "Acme Travel" site with **deliberately planted accessibility problems**, for testing
accessibility tools such as axe DevTools, axe-core, Axe Monitor and Chromatic accessibility tests.
Each broken spot has an `<!-- ISSUE: rule-id -->` comment naming the expected axe rule.

## What's here

| Path | Purpose |
|---|---|
| `index.html`, `pages/*.html` | Static pages full of violations. Test them with the axe browser extension or a crawler. |
| `accessible.html` | Control page. It should produce **zero** automated violations. |
| `stories/*.stories.js` | Storybook stories. Each area has a `Broken` and a `Fixed` story. Chromatic tests these. |
| `data/test-data.json` | Random but reproducible users and bookings, used by the tables. |
| `scripts/generate-data.mjs` | Regenerates the data: `npm run generate-data -- 123` (the number is the seed). |
| `.github/workflows/chromatic.yml` | Publishes Storybook to Chromatic on every push and pull request. |

## Running locally

```sh
npm install
npm run storybook   # Storybook at http://localhost:6006 (open the "Accessibility" panel)
npm run serve       # static pages at http://localhost:8080
```

## Connecting Chromatic

1. Push this repo to GitHub.
2. In https://www.chromatic.com, choose **Add project** and pick the repo. Copy the project token.
3. Add the token as a GitHub secret named `CHROMATIC_PROJECT_TOKEN`
   (Settings → Secrets and variables → Actions).
4. Turn on **Accessibility tests** in the Chromatic project settings.
5. Push. The workflow builds Storybook and uploads it. You can also publish by hand:
   `npx chromatic --project-token=<token>`.

`.storybook/preview.js` sets `a11y.test: 'error'`, so every `Broken` story should fail its
accessibility check and every `Fixed` story should pass. Change it to `'todo'` if you want
violations reported as warnings instead.

## Planted issues by page

- **index.html**: missing `lang`, missing `<title>`, zoom disabled, no landmarks, no `h1`, image and link with no name, vague "Click here" links, duplicate ids, low contrast.
- **forms.html**: unlabelled inputs, placeholder used as label, invalid autocomplete, `for` pointing at a missing id, unnamed select, radio buttons without a fieldset, required shown only by color, empty submit button, icon-only button.
- **images.html**: missing or meaningless alt text, image of text, unnamed SVG and `role="img"`, image input, image map areas, object.
- **contrast.html**: low-contrast text and buttons, links told apart only by color, status shown only by color.
- **structure.html**: invalid `lang`, empty title, duplicate banner and main, unlabeled navs, skipped heading levels, empty heading, fake heading, broken lists, iframe without a title, marquee.
- **aria.html**: invalid roles, attributes and values; missing required ARIA attributes, children and parents; focusable content inside `aria-hidden`; unnamed controls, progressbar and dialog.
- **tables.html**: no `<th>` or caption, `headers` pointing at missing ids, empty header cell, invalid `scope`, status shown only by color.
- **keyboard.html**: focus outline removed, positive tabindex, clickable divs, a hover-only menu, a keyboard trap, nested interactive elements, a scroll area that can't be focused, focus moved on page load.
- **media.html**: meta refresh, autoplaying video and audio, no captions, untitled iframe, flashing content.

Keyboard, media and color-only problems are mostly **manual-test** items. Automated tools catch only some of them.
