<h1 align="center">MINIMAL (M)</h1>

<p align="center">
    <img src="res/logo.svg" width="180" height="180" /><br/>
</p>

<p align="center">
    <a href="https://github.com/mdrv/m/actions/workflows/release.yml">
        <img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/mdrv/m/release.yml?event=release"/>
    </a>
    <a href="https://www.npmjs.com/package/@mdrv/m">
        <img alt="Visit the NPM page" src="https://img.shields.io/npm/v/@mdrv/m"/>
    </a>
    <a href="https://github.com/mdrv/m/blob/master/LICENSE">
        <img alt="GitHub License" src="https://img.shields.io/github/license/mdrv/m">
    </a>
</p>

<p align="center">
    <b><i>Take your JS/TS existing code to the minimalist approach.</i></b>
</p>

> [!CAUTION]
> This package is created mainly for the author’s internal projects and published for documentation purposes. If you do have any suggestion, kindly share your thoughts on [Discussion](https://github.com/mdrv/m/discussions) tab.

## 🔔 Release Info

This package implements **Gregorian YYM-based** semver notation.

- 📅 `v257.x.x`: Released around/on July 2025. **(current)**
- 🚀 `v260.x.x`: Released from October to December 2025.

For every major release, the preceding version will need to be imported with subpath:

```ts
/* Example: v260.x.x */
import * as Mv260 from '@mdrv/m' // v260 (current)
import * as M from '@mdrv/m/v257' // v257 (previous)
```

See [CHANGELOG](https://github.com/mdrv/m/wiki/changelog) for breaking changes, updates and fixes.

## 💖 Inspirations

- 🧩 [`es-toolkit`](https://github.com/toss/es-toolkit)
- 🎊 [`type-fest`](https://github.com/sindresorhus/type-fest)
- 🧰 [`ts-essentials`](https://github.com/ts-essentials/ts-essentials)

<p align="center"><sub><strong>© 2025 MEDRIVIA ／ Umar Alfarouk</strong></sub></p>
