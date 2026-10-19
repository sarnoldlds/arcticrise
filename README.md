# Arctic RISE website

A static, single-page website for **Arctic RISE** (Arctic RoutIne atmoSphEric profile sampling).
Plain HTML, CSS and a little JavaScript — no build step, no frameworks, no external services.

```
arctic-rise/
├── index.html              All page content (text, sections, hero illustration)
├── css/styles.css          All styling (colours, fonts, layout, responsive rules)
├── js/main.js              Mobile menu, header on scroll, active nav link, contact email
├── assets/
│   ├── hero-landscape.jpg  Hero background photograph
│   ├── arctic-rise-badge.webp / .png   Arctic RISE badge (shown beside "About Arctic RISE")
│   ├── paces-logo.png      PACES logo (Contact section, links to pacesproject.org)
│   └── favicon.svg         Browser-tab icon
└── README.md
```

---

## 1. Preview locally

The simplest option: double-click `index.html` to open it in a browser.

For a more realistic preview (recommended), run a tiny local web server from this folder:

```bash
# Python 3 (macOS / Linux / Windows)
python3 -m http.server 8000
# then open http://localhost:8000
```

Or with Node.js: `npx serve .`

---

## 2. Editing text

All text is in **`index.html`**, in clearly commented sections:

| Section | Find this comment / id |
|---|---|
| Header & menu | `HEADER` |
| Hero headline, sentence, button | `HERO` → `.hero__content` |
| Why atmospheric profiles matter | `SECTION A` / `id="why"` |
| About Arctic RISE (incl. observing approaches) | `SECTION B` / `id="about"` |
| Vision (incl. IPY 2032–33 box) | `SECTION C` / `id="vision"` |
| Activities (numbered cards) | `SECTION D` / `id="activities"` |
| Contact | `SECTION E` / `id="contact"` |
| Footer | `FOOTER` |

Edit the words between the tags; leave the tags themselves in place. Activity cards are numbered automatically, so you can add, remove or reorder `<li class="card">` items freely.

### Setting the contact email

The address is set in **one place** in `index.html`, split into two parts so that spam bots scanning the page source don't find a complete email address:

```html
<section ... id="contact" ... data-contact-user="s.arnold" data-contact-domain="leeds.ac.uk">
```

- `data-contact-user` — the part **before** the @
- `data-contact-domain` — the part **after** the @

`js/main.js` joins them in the visitor's browser, so people see and click the address as normal. Avoid typing the full address anywhere else in the site, or the protection is lost. If either part is empty (`""`), the email button is hidden and only the invitation text is shown.

This deters most automated address harvesting but isn't foolproof. A shared role address (e.g. a project mailbox or alias) is a good long-term option, so enquiries aren't tied to one person.

---

## 3. Changing colours, fonts and spacing

Open **`css/styles.css`** — section **1. SETTINGS** at the top holds everything you are likely to change:

- `--navy-900`, `--blue-600`, … — the colour palette
- `--obs-icon`, `--obs-insitu`, `--obs-beam` — illustration colours
- `--font-sans`, `--font-serif` — typefaces (system fonts; nothing is downloaded)
- `--container`, `--section-space` — page width and vertical spacing

---

## 4. Replacing the hero image

1. Put your photograph in `assets/` (e.g. `assets/my-photo.jpg`). A landscape image of **at least 2400 px wide**, saved as JPEG at ~80 % quality (ideally under 500 KB), works well.
2. In `css/styles.css`, change:
   ```css
   --hero-image: url("../assets/my-photo.jpg");
   --hero-position: center bottom;
   ```
   `--hero-position` controls which part of the photo stays visible when it is cropped to fit the screen (e.g. `center 70%`, `left bottom`).
3. Check the page on desktop and mobile. The ground-based instruments in the illustration sit along the bottom edge of the hero, so photos with snow or ground along the bottom work best.
4. If text becomes hard to read, darken the overlay in `.hero__overlay` (raise the `rgba(…, 0.78)` values).

Also update the hero image description in `index.html` (`aria-label` on `.hero__media`) if the scene changes.

> **About the current image.** `hero-landscape.jpg` was extracted from the design mockup: the headline, labels, icons, glowing paths and ground station were removed and filled in, the right-hand edge was trimmed, and the sky was extended upwards so it fills a full-height hero. Because the source was a small screenshot, it is softer than a true photograph. Replace it with the original high-resolution photo (or another licensed Arctic landscape) when available.

### Updating the badge

The circular Arctic RISE badge appears, deliberately small, beside the "About Arctic RISE" heading. To update it, replace `assets/arctic-rise-badge.webp` and `assets/arctic-rise-badge.png` (square images, about 440 × 440 px, transparent corners). To remove it, delete the `<picture class="badge">…</picture>` block in `index.html`. Its size is set by `.badge img` in `css/styles.css`.

The PACES logo and link sit at the end of the Contact section (`<div class="affiliation">`), with a text link in the footer. The logo file is small (283 px wide), so keep it at about 140 px on screen; if a higher-resolution version becomes available, replace `assets/paces-logo.png` (a transparent background works best).

### Partner logos (PACES, IGAC, IASC)

The strip directly below the hero names the parent programme (PACES) and its co-sponsors (IGAC and IASC), with their logos: `assets/paces-logo.png`, `assets/igac-logo.png` and `assets/iasc-logo.png`. To update a logo, replace the file (keeping its name), ideally with a transparent background. Wide logos are shown 48 px tall (`.partner img` in `css/styles.css`); square or upright logos (IGAC, IASC) use `class="partner partner--tall"` and are shown 64 px tall.

---

## 5. Editing the hero illustration (platforms, labels and measurement paths)

The illustration is in `index.html` inside `<figure class="hero__illustration">`. Nothing is baked into the photograph — every element can be edited independently.

### How it is built

- **Drawing** — an inline `<svg>` with a `viewBox="0 0 800 900"` coordinate system. `x` runs 0 → 800 left to right; `y` runs 0 → 900 top to bottom. **The ground is at `y = 868`.**
- **One group per platform** — `id="obs-satellite"`, `obs-aircraft`, `obs-uas`, `obs-balloon`, `obs-ground-rs`, `obs-community`. Delete or edit a group to remove or change a platform.
- **Line styles** (set by CSS class, so they stay consistent):
  - `class="path-insitu"` — solid line for in-situ sampling (aircraft, UAS, tethered balloon)
  - `class="marker"` — small dots/squares marking sampling points
  - `class="beam"` — dashed line for remote sensing (satellite, ground-based instrument). Beams fade out using the `fade-sat` / `fade-ground` gradients defined in `<defs>`.
- **Ground-based remote sensing** — all three beams start at the same point on the instrument (`x1="530" y1="851"`) and diverge upwards; keep the shared start point if you edit them.

### Moving or editing paths

- A straight line: `<line x1="…" y1="…" x2="…" y2="…">` — change the end points.
- The aircraft path: `<path d="M70 450 L190 450 L340 240 L444 240">` — `M` is the start point, each `L` is the next corner.
- A marker: `<circle cx="…" cy="…" r="3">` — move it with `cx`/`cy`.
- An icon: move it with its `transform="translate(x y)"`.

### Labels

Labels are HTML (so they stay sharp and readable) in the `<ul class="platform-labels">` after the SVG:

```html
<li class="platform-label" data-align="left" style="--x:81.25%; --y:16.7%;">
  <span class="label-full">Satellites</span><span class="label-short">Satellites</span>
</li>
```

- `--x` / `--y` — the anchor point as a percentage of the illustration. Convert from SVG coordinates with **x% = x ÷ 8** and **y% = y ÷ 9** (e.g. point (650, 150) → `--x:81.25%; --y:16.7%`).
- `data-align` — where the label sits relative to that point: `left`, `right`, `above` or `below`.
- `.label-full` is shown on larger screens, `.label-short` on phones (≤ 600 px).
- Optional small-screen overrides (≤ 959 px): `--mx`, `--my` and `data-m-align`.

After any change, check the page at desktop (~1440 px), tablet (~768 px) and phone (~390 px) widths — in most browsers use *Developer Tools → device toolbar* — to make sure labels don't overlap.

---

## 6. Publishing

The site is just files, so any static host works. Upload the **whole folder** keeping the structure (`index.html` at the top level).

### GitHub Pages

1. Create a repository on GitHub (public, unless your plan supports Pages for private repositories).
2. In the repository click **Add file → Upload files** and drag in the **contents** of this folder — `index.html`, `README.md`, and the `css`, `js` and `assets` folders. Don't upload the `.zip` (GitHub won't unpack it), and don't drag the enclosing folder itself, or the site will end up one level down. `index.html` must be at the top level of the repository.
3. **Scroll down and click _Commit changes_.** Uploaded files are not saved until you do this.
4. Go to **Settings → Pages**. Under *Build and deployment*, choose **Deploy from a branch**, select `main` and `/ (root)`, then **Save**.
5. Open the **Actions** tab: a "pages build and deployment" run appears. When it shows a green tick (usually 1–2 minutes), the site is live at `https://<username>.github.io/<repository>/`.

**Updating the site later:** edit a file directly on GitHub (pencil icon) or upload a replacement with **Add file → Upload files**, then click **Commit changes** each time. The site republishes automatically within a minute or two.

A custom domain can be added under **Settings → Pages → Custom domain** (see GitHub's guide to managing a custom domain).

### Conventional web host (cPanel, university web space, etc.)

Upload the folder contents to the web root (often `public_html/` or `www/`) using the host's file manager or an SFTP client such as FileZilla. Make sure `index.html`, `css/`, `js/` and `assets/` sit side by side.

### Other options

Netlify, Cloudflare Pages and similar services accept a drag-and-dropped folder — no configuration needed.

---

## 7. Accessibility notes

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`) and a "Skip to main content" link.
- The mobile menu button reports its state (`aria-expanded`) and closes with **Esc**.
- The hero illustration has a text description (`<title>`/`<desc>` in the SVG) for screen readers.
- Smooth scrolling and transitions are switched off for visitors who prefer reduced motion.
- When editing colours, keep text contrast high (WebAIM's contrast checker is a quick test).
