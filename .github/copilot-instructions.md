# Portfolio Site - Copilot Instructions

## Project Overview
Personal portfolio website for Daniel Fickling (UX/UI Designer & Frontend Developer). Single-page static site with smooth scroll navigation, showcasing work history and project case studies.

## Quick Start
```bash
npm install      # Install dependencies
npm run dev      # Start dev server at localhost:5173
npm run build    # Build for production to /dist
npm run preview  # Preview production build
```

## Architecture

### Directory Structure
```
├── src/
│   ├── index.html          # Main template with Handlebars
│   ├── data/               # JSON data files (easy content editing)
│   │   ├── site.json       # Site config, nav, about, skills
│   │   ├── projects.json   # Portfolio projects
│   │   └── experience.json # Work history
│   ├── partials/           # Reusable HTML components
│   │   ├── head.html
│   │   ├── navigation.html
│   │   ├── intro.html
│   │   ├── about.html
│   │   ├── skills.html
│   │   ├── project-card.html
│   │   └── experience-card.html
│   ├── styles/             # SCSS modules
│   │   ├── main.scss       # Entry point
│   │   ├── _variables.scss # Design tokens
│   │   ├── _mixins.scss    # Reusable mixins
│   │   ├── _base.scss      # Reset & base styles
│   │   ├── _typography.scss
│   │   ├── _grid.scss      # 12-column flexbox grid
│   │   ├── _navigation.scss
│   │   ├── _sections.scss
│   │   └── _projects.scss
│   └── js/
│       ├── main.js         # Entry point
│       └── modules/
│           ├── navigation.js    # Mobile menu toggle
│           ├── smooth-scroll.js # GSAP scroll animations
│           └── image-zoom.js    # Medium-zoom for images
├── public/                 # Static assets (copied to dist)
│   ├── images/
│   ├── favicon.ico
│   └── robots.txt
├── dist/                   # Production build output
├── package.json
└── vite.config.js
```

### Technology Stack
- **Build**: Vite 5.x (fast HMR, ES modules)
- **Templating**: Handlebars via vite-plugin-handlebars
- **CSS**: SCSS with modular architecture
- **JavaScript**: Vanilla ES modules (no jQuery)
- **Animations**: GSAP 3.x (modern ES module import)
- **Image Zoom**: medium-zoom library
- **Fonts**: Adobe Typekit (async load)
- **Analytics**: Google Analytics (UA)

## Common Tasks

### Add a New Project
1. Add project object to `src/data/projects.json`:
```json
{
  "id": "my-project",
  "title": "My Project",
  "description": "Project description...",
  "url": "https://example.com/",
  "urlDisplay": "example.com",
  "image": "my-project.jpg",
  "alt": "My Project Screenshot"
}
```
2. Add image to `public/images/`

### Add a New Skill
Edit `src/data/site.json` → `skills` array:
```json
{
  "title": "New Skill",
  "description": "Skill description..."
}
```

### Add Work Experience
Edit `src/data/experience.json` → `positions` array

### Modify Styling
- **Colors/spacing**: Edit `src/styles/_variables.scss`
- **Typography**: Edit `src/styles/_typography.scss`
- **Grid/layout**: Edit `src/styles/_grid.scss`
- **Components**: Edit respective `_component.scss` file

### Add a New Section
1. Create partial in `src/partials/new-section.html`
2. Add section styles to `src/styles/_sections.scss`
3. Include in `src/index.html` with `{{> new-section}}`
4. Add nav link in `src/data/site.json` → `nav` array

## Conventions

### HTML/Handlebars
- Use partials for reusable components: `{{> partial-name}}`
- Access data with: `{{site.property}}`, `{{#each projects}}`
- Conditional rendering: `{{#if url}}...{{/if}}`

### CSS/SCSS
- BEM naming: `block__element--modifier`
- Mobile-first breakpoints using `@include breakpoint(md)`
- Available breakpoints: `xxxs`, `xxs`, `xs`, `sm`, `md`, `lg`, `xl`
- Grid classes: `gr-1` to `gr-12`, with breakpoint suffix `gr-6@md`

### JavaScript
- ES modules with named exports
- Initialize modules in `main.js`
- Use `document.querySelector` over jQuery

## Responsive Grid
```html
<div class="row row@md">
  <div class="gr-12 gr-6@md">Half width on desktop</div>
  <div class="gr-12 gr-6@md">Half width on desktop</div>
</div>
```

## Deployment
Run `npm run build`, then upload contents of `/dist` folder to any static host (GitHub Pages, Netlify, Vercel, etc.)

## Legacy Files
The original compiled files (`index.html`, `styles/main.css`, `scripts/main.js`, `images/`) remain in the root for reference but are no longer used. The new source is in `src/` and builds to `dist/`.
