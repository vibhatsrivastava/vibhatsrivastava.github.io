# Design System & UI Style Guide

This style guide documents the design tokens, components, and conventions used across the **Vibhat Srivastava Portfolio** website.

---

## 1. Design Tokens

### Color Palette

The design system implements a dual-mode palette with light and dark mode support:

| Token Name | Light Value | Dark Value | Purpose |
| :--- | :--- | :--- | :--- |
| `--bg-primary` | `#f8fafc` | `#0a0e17` | Main page background (with subtle top ambient glow) |
| `--bg-surface` | `#ffffff` | `#111827` | Elevated containers and modals |
| `--bg-subtle` | `#f1f5f9` | `#1a2234` | Code blocks, pill badges, and secondary areas |
| `--bg-card` | `#ffffff` | `#121826` | Interactive cards |
| `--text-primary` | `#0f172a` | `#f8fafc` | Primary headings and prominent text |
| `--text-secondary` | `#334155` | `#cbd5e1` | Body copy and descriptions |
| `--text-muted` | `#64748b` | `#94a3b8` | Metadata, dates, and captions |
| `--accent-primary` | `#0284c7` | `#38bdf8` | Primary brand accent (Sky blue) |
| `--accent-secondary` | `#059669` | `#34d399` | Secondary accent (Uptime emerald green) |
| `--accent-gradient` | `linear-gradient(...)` | `linear-gradient(...)` | Hero headings and highlighted badges |
| `--border-color` | `#e2e8f0` | `rgba(255,255,255,0.08)`| Subtle structural borders |

### Typography

* **Heading Font:** `Outfit`, sans-serif (Weights: 600, 700, 800, 900)
* **Body Font:** `Inter`, sans-serif (Weights: 400, 500, 600)
* **Monospace Font:** `JetBrains Mono`, monospace (Code blocks, technical pills)


---

## 2. Reusable UI Components

### Project Card
```html
<div class="project-card">
  <div class="project-card-image-wrap">
    <img src="/path/to/diagram.svg" alt="Diagram Description" class="project-card-image" loading="lazy" />
  </div>
  <div class="project-card-body">
    <div class="project-meta-bar">
      <span class="role-badge">Lead Architect</span>
      <span class="timeline-pill"><i class="far fa-calendar-alt"></i> 2024</span>
    </div>
    <h3>Project Title</h3>
    <p>Project summary and business context...</p>
    <div class="metrics-grid">
      <div class="metric-item">
        <span class="metric-value">85%</span>
        <span class="metric-label">Deployment Speedup</span>
      </div>
    </div>
    <div class="tech-stack-wrap">
      <span class="tech-tag">Terraform</span>
      <span class="tech-tag">AWS</span>
    </div>
    <div class="project-links">
      <a href="..." class="btn-pro btn-pro-primary">View GitHub</a>
    </div>
  </div>
</div>
```

### Skills Progress Bar
```html
<div class="skill-item">
  <div class="skill-info">
    <span>Skill Name</span>
    <span class="skill-percentage">90%</span>
  </div>
  <div class="skill-bar-track">
    <div class="skill-bar-fill" data-progress="90%"></div>
  </div>
</div>
```

### Career Timeline
```html
<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-dot"></div>
    <div class="timeline-content">
      <div class="timeline-header">
        <h4 class="timeline-title">Job Title</h4>
        <span class="timeline-period">2021 - Present</span>
      </div>
      <p>Responsibilities and measurable outcomes...</p>
    </div>
  </div>
</div>
```

### Breadcrumbs
```html
<nav class="pro-breadcrumb" aria-label="Breadcrumb">
  <a href="/"><i class="fas fa-home"></i> Home</a>
  <span class="separator">/</span>
  <span class="current">Current Page</span>
</nav>
```

---

## 3. Interactive Utilities

* **Dark Mode:** Toggled with `.theme-toggle-btn`. Persisted via `localStorage('theme')`.
* **Back to Top:** Dynamically initialized floating circular button appearing when scroll depth exceeds 300px.
* **Lightbox Preview:** Click any image in `.project-card-image-wrap` or `.lightbox-trigger` to zoom in full screen.
* **Blog Filter:** `.filter-pill` buttons dynamically filter articles by `data-filter` matching `data-tags`.

---

## 4. Accessibility & Quality Standards

1. **Tap Targets:** Interactive elements guarantee a minimum 44px × 44px touch area.
2. **Keyboard Focus:** High-contrast focus outline applied via `:focus-visible`.
3. **Contrast:** Meets WCAG 2.1 AA ratios in both light and dark themes.
4. **Print Optimization:** Embedded `@media print` rules ensure clean, page-break-aware resume exports.
