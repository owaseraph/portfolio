# Portfolio — project structure

```
portfolio/
├── index.html        ← markup + content (edit your real story/projects here)
├── css/
│   └── style.css     ← all styles, theme variables (light + dark) live at the top
├── js/
│   ├── main.js        ← entry point — imports and initializes everything
│   ├── theme.js        ← dark mode toggle + scroll-driven background sync
│   ├── cursor.js        ← custom cursor + magnetic hover elements
│   ├── hero.js          ← split-char title reveal, scramble text, mouse grid
│   ├── gallery.js       ← marquee, h2 mask reveals, pinned horizontal gallery
│   ├── stats.js         ← SVG progress ring + count-up stat numbers
│   ├── timeline.js      ← timeline spine draw + per-beat reveals
│   └── footer.js        ← footer fade-in
└── README.md          ← this file
```

## Running it in VS Code

1. **Open the folder** — `File → Open Folder…` and select `portfolio/`.
2. **Install the "Live Server" extension** (by Ritwick Dey) from the Extensions
   panel (`Cmd/Ctrl+Shift+X`, search "Live Server"). You need this because the
   JS is loaded as ES modules (`<script type="module">`), and browsers block
   module imports over the `file://` protocol — it has to be served over
   `http://`.
3. **Right-click `index.html` → "Open with Live Server"**. It'll open in your
   browser at something like `http://127.0.0.1:5500` and auto-reload whenever
   you save a file.

That's it — no npm install, no build step. GSAP is still loaded from a CDN in
`index.html`, so you need an internet connection the first time (it'll cache
after that).

## Making it yours

- **Content**: edit the text directly in `index.html` — hero headline, the
  three timeline "beats," the four project panels, the stat numbers.
- **Real numbers**: open `js/stats.js` and edit the `STAT_TARGETS` array to
  match whatever you want the count-up numbers to land on.
- **Colors**: everything runs off the CSS variables at the top of
  `css/style.css` (`:root` for light, `html.dark` for dark). Change a hue once
  there and it updates everywhere.
- **Fonts**: swap the Google Fonts `<link>` in `index.html` and update
  `--serif` / `--mono` in `style.css` to match.
- **Adding a section**: add the HTML in `index.html`, style it in
  `style.css`, and if it needs its own scroll-triggered behavior, add a new
  `js/yourfeature.js` module (following the same `export function initX(){...}`
  pattern) and import/call it from `main.js`.

## Optional: going further with a bundler

This setup is plain ES modules — no build step, which is the simplest thing
that works and is genuinely fine to ship as-is. If the project grows (npm
packages beyond GSAP, TypeScript, image optimization, etc.), the natural next
step is **Vite**:

```bash
npm create vite@latest . -- --template vanilla
```

That gives you `npm run dev` (hot reload, faster than Live Server) and
`npm run build` (a minified, production-ready `dist/` folder). Not necessary
for a portfolio this size, but worth knowing it's the upgrade path.
