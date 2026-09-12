# My Digital Garden

A collection of notes, write-ups, and explorations — mostly math, problem-solving, and things I'm learning. Built with [Quartz](https://quartz.jzhao.xyz/), a static site generator designed for digital gardens.

🔗 **Live site:** [quphine.github.io](https://quphine.github.io)
## What's in here

This repo hosts the source content and configuration for my personal site. Posts live in `content/` as Markdown files with YAML frontmatter (title, tags, etc.), and Quartz builds them into a browsable, linked site.

## Running locally

```bash
npm install
npx quartz build --serve
```

This serves the site locally so you can preview changes before pushing.

## Publishing a new post

1. Add a new `.md` file under `content/`.
2. Include frontmatter at the top:
   ```yaml
   ---
   title: 'Your Title Here'
   tags:
     - tag-one
     - tag-two
   ---
   ```
3. Commit and push to this repo — the site rebuilds and deploys automatically.

## Staying up to date with Quartz

This repo is a fork of the upstream [Quartz template](https://github.com/jackyzha0/quartz). To pull in framework updates without touching your content:

```bash
npx quartz update
```

## License / usage

This is a personal notes repository. Content is shared for reference and interest — feel free to read and link to it, but please don't republish it as your own without attribution.

---

_Built with [Quartz](https://quartz.jzhao.xyz/) v5._
