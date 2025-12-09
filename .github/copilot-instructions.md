# Portfolio Site - Copilot Instructions

## Project Overview
Static personal portfolio website for Daniel Fickling (UX/UI Designer & Frontend Developer). Single-page HTML site with smooth scroll navigation showcasing work history and project case studies.

## Architecture

### File Structure
- `index.html` - Single-page site with all content (sections: intro, about, skills, work/projects)
- `styles/main.css` - Compiled/minified CSS (includes normalize.css + custom grid system)
- `scripts/main.js` - Bundled JavaScript (includes GreenSock/GSAP TweenMax + ScrollTo plugin + jQuery)
- `images/` - Project screenshots and assets

### Technology Stack
- **CSS**: Minified output with source maps (`.map` files indicate build process)
- **JavaScript**: Browserify bundle containing:
  - GreenSock TweenMax (animation library)
  - GSAP ScrollToPlugin (smooth scrolling)
  - jQuery 2.2.3
- **Fonts**: Adobe Typekit (loaded via `use.typekit.net/jlf0psd.js`)
- **Analytics**: Google Analytics (UA-76752910-1)

## Conventions

### HTML Structure
- Semantic sections with ID anchors: `#about`, `#skills`, `#work`
- BEM-style class naming: `section--intro`, `project__inner`, `page-nav__link`
- Responsive grid uses `gr-*` and `gr-*@md` breakpoint classes (12-column system)
- Layout rows: `row row@md` for flexbox-based responsive layouts

### CSS Grid Pattern
```html
<div class="row row@md">
  <div class="gr-12 gr-6@md"><!-- Full width mobile, half on medium+ --></div>
  <div class="gr-12 gr-6@md"><!-- Full width mobile, half on medium+ --></div>
</div>
```

### Project Cards Pattern
Each project follows this structure inside `.projects`:
```html
<div class="project project--[name]">
  <div class="project__inner section">
    <h5>Project Title</h5>
    <div class="row row@md">
      <div class="gr-12 gr-6@md">
        <p>Description</p>
        <p><a target="_blank" href="...">link.com</a></p>
      </div>
    </div>
    <img class="project__img" data-action="zoom" src="./images/[name].jpg" alt="...">
  </div>
</div>
```

### Navigation
- Mobile hamburger toggle: `.page-nav-toggle` with span elements for burger lines
- Anchor-based smooth scrolling to section IDs
- External links use `target="_blank"`

## Development Notes

### Build System
This appears to be output from a Yeoman Yeogurt generator (see `README.md`). The source files (SASS, unminified JS) are not present - only compiled output. When modifying:
- Edit `index.html` directly
- CSS/JS are minified bundles - source modifications require original build setup

### Adding Content
- **New section**: Add `<section class="section section--[name]" id="[name]">` and corresponding nav link
- **New project**: Follow the project card pattern within `.projects` container
- **Images**: Add to `images/` directory, use relative paths with `./images/`

### Responsive Breakpoints
Grid uses breakpoint suffixes: `@xxxs`, `@xxs`, `@xs`, `@sm`, `@md`, `@lg`
- Mobile-first approach (no suffix = all sizes)
- `@md` is primary desktop breakpoint used throughout
