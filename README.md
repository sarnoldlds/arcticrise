# Arctic RISE website

A static, single-page website for **Arctic RISE** (Arctic RoutIne atmoSphEric profile sampling).
Plain HTML, CSS and a little JavaScript — no build step, no frameworks, no external services.

```
(repository root)
├── index.html              All page content (text, sections, hero illustration)
├── namas.html              Project page for NAMAS (linked from the Projects section)
├── css/styles.css          All styling (colours, fonts, layout, responsive rules)
├── js/main.js              Mobile menu, header on scroll, active nav link, contact email
├── assets/
│   ├── hero-landscape.jpg              Hero background photograph
│   ├── arctic-rise-badge.webp / .png   Arctic RISE badge (beside "About Arctic RISE")
│   ├── paces-logo.png                  PACES logo   ┐
│   ├── igac-logo.png                   IGAC logo    ├ partners strip below the hero
│   ├── iasc-logo.png                   IASC logo    ┘
│   ├── arctic-rise-signature.png       Email signature banner (loaded by email signatures – do not rename or delete)
│   └── favicon.svg                     Browser-tab icon
├── CNAME                   Custom domain (www.arcticrise.org) – created by GitHub, do not delete
└── README.md
```

The live site is at **https://www.arcticrise.org** (hosted on GitHub Pages; see section 6).

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
| Hero headline, sentence, PACES line, button | `HERO` → `.hero__content` |
| Partners strip (PACES, IGAC, IASC) | `PARTNERS STRIP` / `class="partners"` |
| Why atmospheric profiles matter (incl. "An international research priority" and the two document links) | `SECTION A` / `id="why"` → `class="priority"` |
| About Arctic RISE (incl. observing approaches) | `SECTION B` / `id="about"` |
| Vision (incl. IPY 2032–33 box) | `SECTION C` / `id="vision"` |
| Activities (numbered cards) | `SECTION D` / `id="activities"` |
| Contact | `SECTION E` / `id="contact"` |
| Footer | `FOOTER` |

Edit the words between the tags; leave the tags themselves in place. Activity cards are numbered automatically, so you can add, remove or reorder `<li class="card">` items freely.

**Key documents.** The two document cards (ICARP IV report and the Arctic Observing Summit statement) are the `<ul class="doc-links">` list at the end of the "Why" section. To add another, copy one `<li>…</li>` block and change the link, title (`doc-links__title`) and details line (`doc-links__meta`).

**PACES link.** PACES is linked to `https://igacproject.org/activities/PACES` in five places (hero line, partners strip text and logo, Contact section, footer). If the address changes, use your editor's find-and-replace on `igacproject.org/activities/PACES`.

### Setting the contact email

The address is set in **one place** in `index.html`, split into two parts so that spam bots scanning the page source don't find a complete email address:

```html
<section ... id="contact" ... data-contact-user="contact" data-contact-domain="arcticrise.org">
```

- `data-contact-user` — the part **before** the @
- `data-contact-domain` — the part **after** the @

`js/main.js` joins them in the visitor's browser, so people see and click the address as normal. Avoid typing the full address anywhere else in the site, or the protection is lost. If either part is empty (`""`), the email button is hidden and only the invitation text is shown.

This deters most automated address harvesting but isn't foolproof.

The current address, **contact@arcticrise.org**, is an email-forwarding alias set up in Squarespace (account.squarespace.com/domains → arcticrise.org → Email forwarding). To change who receives enquiries, edit the forwarding rule there – the website doesn't need to change.

### Project pages

Each funded project has its own page (currently `namas.html`, at https://www.arcticrise.org/namas.html), linked from a card in the **Projects** section of `index.html` (`id="projects"`).

To add another project:

1. Copy `namas.html` to a new file, e.g. `newproject.html`, and edit its text. The header, footer and styles are shared, so only the content between `<main>` and `</main>` needs changing.
2. In `index.html`, copy the `<article class="project-card">…</article>` block in the Projects section, and point its links at the new page.
3. Upload both files and click **Commit changes**.

Keep budgets and other internal details off public project pages.

### Visitor statistics

The site uses **Cloudflare Web Analytics** (free and cookie-free) to count visits, countries, referrers and popular pages. View the statistics by logging in to Cloudflare → **Web Analytics** → arcticrise.org.

The tracking code is at the end of `js/main.js` and only runs when the page is served from arcticrise.org, so the preview copy on github.io isn't counted. To switch analytics off, delete that block, and the "cookie-free analytics" sentence in each page's footer.

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

### Partner logos (PACES, IGAC, IASC)

The strip directly below the hero names the parent programme (PACES) and its co-sponsors (IGAC and IASC), with their logos: `assets/paces-logo.png`, `assets/igac-logo.png` and `assets/iasc-logo.png`. To update a logo, replace the file (keeping its name), ideally with a transparent background. Wide logos are shown 48 px tall (`.partner img` in `css/styles.css`); square or upright logos (IGAC, IASC) use `class="partner partner--tall"` and are shown 64 px tall. The PACES logo file is small (283 px wide), so avoid enlarging it; replace it if a higher-resolution version becomes available.

### Email signature banner

`assets/arctic-rise-signature.png` is the 600 × 120 email signature banner (stored at double resolution). Email signatures load it from `https://www.arcticrise.org/assets/arctic-rise-signature.png`, so keep the file name unchanged, or existing signatures will show a broken image. To update the design, replace the file with a new image of the same name and size.

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

**If a change to `css/styles.css` or `js/main.js` doesn't show up:** browsers keep old copies of these files. In both `index.html` and `namas.html`, raise the number after `?v=` where they are linked near the top and bottom of the file (e.g. `css/styles.css?v=2` → `?v=3`), so every visitor's browser fetches the new version.

### Custom domain (arcticrise.org)

The domain is registered with Squarespace and points to GitHub Pages:

- **GitHub:** *Settings → Pages → Custom domain* is set to `www.arcticrise.org`, with **Enforce HTTPS** ticked. GitHub stores this in the `CNAME` file at the top of the repository – **don't delete it**, or the custom domain stops working.
- **Squarespace DNS** (account.squarespace.com/domains → arcticrise.org → DNS):
  - four **A** records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
  - a **CNAME** record for `www` → `sarnoldlds.github.io`
  - a **TXT** record (`_github-pages-challenge-…`) that verifies the domain with GitHub
  - **MX** and **SPF (TXT)** records for Mailgun, added automatically by Squarespace email forwarding – leave these in place for contact@arcticrise.org to work.

`arcticrise.org` and the old `sarnoldlds.github.io/arcticrise` address both redirect to `https://www.arcticrise.org`.

**Note on institutional networks:** some university and corporate web filters block newly registered or uncategorised domains for a few weeks. If the site shows a 403 error on one network but loads elsewhere, ask that organisation's IT team to allow-list arcticrise.org.

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
