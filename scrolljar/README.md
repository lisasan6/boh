# ScrollJar

A swear jar for scrolling. Block the apps that drink your time; open one anyway and a coin you priced yourself drops in the jar, and every month the jar empties 100% to a charity you chose.

## What's in this folder

```
scrolljar/
├── CLAUDE.md                 rules Claude Code reads automatically
├── FIRST-PROMPT.md           the exact message to paste into Claude Code first
├── README.md                 this file
├── prototype/                clickable app prototype (open index.html)
│   ├── index.html · styles.css · app.js
│   └── scrolljar-prototype-v2.html   original single-file version
├── landing/
│   └── index.html            waitlist landing page
└── docs/
    ├── 00-HANDOFF.md         START HERE: state, open items, what's missing
    ├── IOS-BUILD-SPEC.md     technical plan for the real iPhone app
    └── … 15 project docs (spec, research, design, psychology, evidence, Teams)
```

## Open the prototype and the site

Double-click `prototype/index.html` or `landing/index.html`. Neither needs a build step or a server.

To serve them locally (useful for screenshots):

```bash
cd ~/Projects/scrolljar && python3 -m http.server 8000
# then open http://localhost:8000/prototype/ and http://localhost:8000/landing/
```

## Start with Claude Code

```bash
cd ~/Projects/scrolljar
git init && git add -A && git commit -m "ScrollJar handoff package"
claude
```

Then paste the contents of `FIRST-PROMPT.md`.
