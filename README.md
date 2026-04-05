# 🍅 Pomodoro Timer Widget

> A minimalistic, semi-transparent Pomodoro timer widget for [Seelen UI](https://github.com/eythaann/Seelen-UI), integrated with [Obsidian](https://obsidian.md) markdown tasks.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)

---

## Overview

A focused, single-row widget that lives in your Seelen UI desktop environment. Select a task from your Obsidian markdown vault, start the Pomodoro timer, and let the widget auto-check the task when the session completes.

```
┌─────────────────────────────────────────────────────────┐
│  [▼] Write project report - finish Q1   🔴 25:00  ▶️ 🔄  │
└─────────────────────────────────────────────────────────┘
```

### Features

- **Task integration** — reads incomplete tasks directly from your Obsidian markdown files
- **Pomodoro timer** — work (25min), short break (5min), long break (15min) phases
- **Circular progress ring** — color-coded feedback: green → yellow → red as time runs out
- **Auto-completion** — marks the task as done in Obsidian when the session ends
- **Keyboard shortcuts** — `Space` start/pause, `R` reset
- **Minimal controls** — Start, Pause, Reset
- **Semi-transparent UI** — floats cleanly over your desktop
- **Dark/light mode** — follows your system preference automatically

### Task Format

Tasks are read from any Obsidian `.md` file. The widget picks up incomplete Markdown checkboxes:

```markdown
- [ ] Task title                        ← title only
- [ ] Task title :: goal description    ← title + goal shown in widget
- [x] Already done                      ← skipped
```

---

## Screenshots

> _Coming soon — widget UI in progress_

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Motion (formerly Framer Motion) |
| Build | Vite 6 + vite-plugin-singlefile |
| Testing | Vitest + React Testing Library |
| Platform | Seelen UI widget |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [Seelen UI](https://github.com/eythaann/Seelen-UI) installed

### Install

```bash
git clone https://github.com/KaracaMert/task-pomodoro-widget.git
cd task-pomodoro-widget
npm install
```

### Development

```bash
npm run dev
```

Opens the widget in your browser at `http://localhost:5173` for rapid iteration.

### Build

```bash
npm run build
```

Produces a single `dist/index.html` (all JS and CSS inlined) ready for Seelen UI.

### Deploy to Seelen UI

```bash
# Copy dist/ to Seelen UI's widget directory
xcopy /E /I /Y dist "%APPDATA%\seelen\widgets\pomodoro-timer"
```

Then reload widgets in Seelen UI.

### Run Tests

```bash
npm run test
npm run test:coverage
```

---

## Roadmap

### Phase 1 — Core (current)
- [x] Single task display with dropdown selection
- [x] Pomodoro timer: start, pause, reset
- [x] Circular progress ring with color transitions (green → yellow → red)
- [x] Keyboard shortcuts: `Space` start/pause, `R` reset
- [x] Auto-check task completion in Obsidian markdown
- [x] File System Access API — reads/writes directly to your Obsidian vault
- [ ] Dynamic sizing, semi-transparent background (Iteration 5)

### Phase 2 — Enhancements
- [ ] Hover animations for buttons and dropdown
- [ ] Quick add task button `[+]`
- [ ] Sound / vibration alerts on phase change

### Phase 3 — Advanced
- [ ] Multiple mini-timers
- [ ] Session stats display
- [ ] Customizable theme accent color
- [ ] Obsidian session history logging

---

## License

[MIT](./LICENSE) © 2026 KaracaMert
