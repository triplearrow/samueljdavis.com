# samueljdavis.com

Personal site for **Samuel J. Davis, CISSP** — cybersecurity leadership, built for
professional networking and job hunting.

Static HTML, CSS, and vanilla JavaScript. No build step, no framework, no
dependencies, no trackers. Open `index.html` and it works.

---

## The terminal

The centrepiece is an interactive terminal (`assets/js/terminal.js`) that lets a
visitor "chat" with Sam. It is **not** an AI — every response is hand-written
copy, so it never invents a fact about his career.

It handles two kinds of input:

**Commands** — `help`, `whoami`, `about`, `experience`, `skills`, `approach`,
`wins`, `culture`, `ir`, `military`, `education`, `speaking`, `hire`, `contact`,
`resume`, `links`, `banner`, `clear`. Plus aliases (`story` → `about`,
`recruiter` → `hire`, …) and a few easter eggs (`sudo`, `ls`, `coffee`, `rm`).

**Plain-English questions** — a keyword-scoring matcher in the `INTENTS` array
answers things like *"what's your leadership style?"*, *"how do you talk to a
board?"*, *"where would you start in the first 90 days?"*, *"are you open to
remote?"*, *"what about AI?"*. If nothing scores high enough it falls back to a
short menu instead of guessing.

Also supported: `↑`/`↓` history, `Tab` completion, `Esc` to clear the line,
`Ctrl+L` to clear the screen, and clickable suggestion chips.

### Adding an answer

Add an object to `INTENTS` in `assets/js/terminal.js`:

```js
{
  k: ['keyword', 'another phrase'],   // matched against the lowercased question
  out: function () {
    return [ HEAD('TITLE'), RULE(), L('a line'), D('a dim line'), SP() ];
  }
}
```

Helpers: `HEAD` (bright heading), `RULE` (divider), `L` (body), `D` (dim),
`A` (orange), `SP` (blank line), `RAW` (trusted HTML), `RUNS([...])` (clickable
follow-up buttons). Anything a visitor types is escaped before it is echoed.

To add a **command**, add a key to `COMMANDS` with a `run()` returning the same
kind of array. `alias: [...]` adds synonyms; `hidden: true` keeps it out of
`help` and tab-completion.

---

## Design

| | |
|---|---|
| **Mode** | Light, with black and dark-grey bands for contrast |
| **Colour** | White `#FFFFFF` / off-white `#F7F5F2` · black `#1A1917` · dark grey `#33302C` · orange `#E2600F` |
| **Fonts** | System stacks only — no downloads, nothing to break: system sans for UI, Georgia for pull-quotes, the OS monospace for the terminal |

Everything responds down to 320px. `prefers-reduced-motion` disables the
typewriter, the boot sequence, and the scroll reveals.

---

## Images

Ten hand-authored SVG diagrams in `assets/img/` — no stock photography. They are
real explanations of Sam's work, not decoration:

| File | What it shows |
|---|---|
| `hero-lattice.svg` | Layered controls, with an attack path stopped short of the core |
| `monogram.svg` | Identity plate — initials, CISSP shield, service line |
| `translate.svg` | Security jargon → plain-English business decisions |
| `nist-csf.svg` | NIST CSF functions around a Govern core |
| `pci-scope.svg` | PCI scope cut roughly in half |
| `zero-trust.svg` | Signals feeding a per-request policy decision |
| `vendor-risk.svg` | 20+ vendors a year through triage, review, and a procurement gate |
| `incident-arc.svg` | Severity curve across detect → triage → contain → recover → review |
| `resilience-blueprint.svg` | The multi-year roadmap, as lanes across three years |
| `culture-mesh.svg` | One person reporting a mistake protects everyone connected |

Plus `favicon.svg` and `og-card.png` (the 1200×630 preview used when the link is
shared on LinkedIn — regenerate it from `og-card.svg` if the headline changes).

**Want a real photo in the hero?** Drop it at `assets/img/portrait.jpg` and swap
the `hero__plate` `<img>` in `index.html`. A good headshot will outperform the
monogram plate for networking — the plate is there so the page never looks unfinished.

---

## Contact details

Email and phone are **assembled in JavaScript at runtime** rather than sitting in
the HTML, which stops the majority of address-harvesting bots. The page still
works without JS; the email link just reads "click to reveal" until scripts run.

- Email and LinkedIn appear on the page and in the terminal's `contact` command.
- **The phone number appears only in the terminal's `contact` command.** If you'd
  rather it not be on a public page at all, delete the `TEL` array and the `phone`
  line in `assets/js/terminal.js`.

---

## Deploying

It is a static site, so anything that serves files will do.

**GitHub Pages** — Settings → Pages → deploy from branch, root. `CNAME` already
points at `www.samueljdavis.com`; add these DNS records at your registrar:

```
CNAME   www    <username>.github.io
ALIAS   @      <username>.github.io      (or four A records to GitHub's IPs)
```

Then tick **Enforce HTTPS**. `.nojekyll` stops Pages from processing the site
through Jekyll.

**Netlify / Cloudflare Pages / S3** — no build command, publish directory `/`.
Delete `CNAME` if you're not using GitHub Pages.

### Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

---

## Updating the résumé

Replace `assets/Samuel-J-Davis-Resume.pdf`, keeping the filename — the hero
button, the contact card, and the terminal's `resume` command all point at it.
