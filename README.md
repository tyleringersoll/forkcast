# Forkcast — Frontend Engineering Code Challenge

Welcome, and thank you for taking the time to complete this exercise. This challenge is designed to reflect the kind of work you'd encounter day-to-day on our team — reading unfamiliar code, identifying problems, making targeted improvements, and shipping clean, well-tested work.

Please read this document in full before writing any code.

---

## Overview

Forkcast is an Angular application that displays trending GitHub repositories. It is functional, but intentionally contains several bugs, code quality issues, and an incomplete feature that you will be asked to address.

Your goal is to submit a pull request that resolves the items listed in the [Challenge Requirements](#challenge-requirements) section below.

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Setup

```bash
git clone <repo-url>
cd forkcast
npm install
npm start
```

Open [http://localhost:4200](http://localhost:4200) and confirm the app loads and displays repository cards.

### Available Scripts

| Command | Description |
|---|---|
| `npm start` | Start the local dev server |
| `npm run build` | Production build |
| `npm test` | Run unit tests (Karma/Jasmine) |
| `npm run test:ci` | Run tests with code coverage report |

---

## Tech Stack

- **Angular 20** — standalone components, signal-based reactivity
- **NgRx 20** — Store, Effects, Selectors, Actions
- **TypeScript 5.8** — strict mode enabled
- **SCSS** — hand-rolled styles, no component libraries
- **Jasmine/Karma** — unit testing

---

## Project Structure

```
src/
  app/
    store/           # NgRx slices: repos + theme
    components/      # Presentational: nav-bar, search-bar, repo-card, skeleton-card
    containers/      # Smart (store-connected): repo-list
    models/          # TypeScript interfaces
    pipes/           # Shared pipes (e.g. formatStat for star counts)
    services/        # github.service
  styles/            # Global SCSS: _variables, _reset, _mixins
```

The app follows a **smart/dumb component pattern**. The container connects to the NgRx store and manages state; presentational components receive data and emit events without any store dependency. Take a few minutes to orient yourself to this separation before making changes — it will inform how and where you make them.

The app uses Angular's modern signal-based APIs throughout. If you haven't worked with signals, `computed()`, or the `input()`/`output()` function APIs yet, a quick read of the [Angular Signals overview](https://angular.dev/guide/signals) is worthwhile before diving in.

---

## Challenge Requirements

Submit a single pull request that addresses all of the following. You do not need to complete them in order, but your PR should be coherent and shippable as a whole.

### Bug Fixes

**1. Fix the memory leak**
There is a manual observable subscription in the repo card component that is never cleaned up. Identify and fix it using the appropriate Angular pattern.

**2. Fix the retry flicker**
When the application enters an error state and the user clicks "Retry," the error message briefly reappears before the new load completes. This is a reducer-level issue. Fix it so the error is cleared before the new load begins.

### Refactoring

**3. Fix the search implementation**
The current search triggers a new API call on every keystroke, which burns through GitHub's unauthenticated rate limit quickly and results in failed requests for users. Refactor it to filter client-side against the already-loaded store data so search no longer hits the API at all. Add a debounce of at least 300ms to the search input.

### CSS / UI

**4. Fix the hardcoded SCSS values**
One stylesheet bypasses the existing SCSS variables system with hardcoded color values. Find them and migrate them into `_variables.scss`. Do not introduce any new hardcoded values elsewhere.

**5. Fix the repository tile layout**
The repository cards (tiles) extend far to the right and overflow their container instead of staying within the main content area and wrapping correctly. Fix the layout so the grid respects the container width and remains responsive.

**6. Fix the dark/light mode toggle**
The theme toggle button in the nav bar does not actually apply dark or light theme styles — clicking it has no visible effect. The theme state is stored in NgRx and the toggle dispatches the correct action; the issue is in how the theme is applied to the DOM. Fix it so that toggling switches the app between light and dark appearance as intended.

### Testing

**7. Test coverage for your changes**
Add or update tests to cover the code you've written or modified. At minimum: the updated reducer behavior on retry.

---

## What We're Evaluating

| Area | What we're looking for |
|---|---|
| **Correctness** | Does it work? Are edge cases handled? |
| **Angular & NgRx patterns** | Are you using the framework idiomatically? |
| **Code clarity** | Would a teammate understand this without a walkthrough? |
| **Test quality** | Are tests meaningful, or just coverage for its own sake? |
| **CSS craftsmanship** | Do the layout and theme fixes feel correct and consistent with the design? |
| **Commit hygiene** | Logical, focused commits with clear messages |

---

## Submission Instructions

1. **Fork** this repository to your own GitHub or Bitbucket account
2. Complete the challenge requirements on a new branch in your fork
3. **Open a pull request** within your fork when complete
4. Share the link to your pull request when you're ready to submit

---

## Out of Scope

You do not need to add routing, add authentication, change the API endpoint, modify the overall visual design, or improve test coverage for code you didn't touch.

---

## Questions

If something in the codebase is genuinely ambiguous and it affects how you'd approach a task, note your assumption in a code comment and proceed. We're more interested in how you handle ambiguity than whether you guessed our intent.