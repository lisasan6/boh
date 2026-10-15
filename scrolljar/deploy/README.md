# Putting the website live

The website is ready to publish. A host builds it from this repository by itself: you don't run anything on your computer. Only the website and the live app demo are published. The docs, CLAUDE.md and everything else stay private.

## Before you publish (about 15 minutes)

1. **Fill in the privacy page.** It needs your full legal name and your city and country (GDPR requires them). Send them to Claude, or edit the two highlighted `[placeholders]` in `landing/privacy.html`.
2. **Turn the waitlist on.**
   - Create a free form at formspree.io.
   - Copy its ID: the part after `/f/` in the form's address.
   - Put it in `landing/site.js`, replacing `YOURFORMID`, or send it to Claude.
   - Until then, the form only pretends to sign people up. Formspree's free plan has a monthly cap, so check it as sign-ups grow.
3. **Buy the domain.** Everything assumes `scrolljar.app`. If you buy a different one, set `SITE_URL` (step 4) and tell Claude, because the email addresses on the site say `@scrolljar.app`.

The build prints a warning while steps 1 and 2 are still open.

## Publish

### Option A: Cloudflare (recommended)

Recommended because the domain, the free email forwarding and the hosting all live in one account.

1. Buy the domain in Cloudflare, under **Domain Registration**.
2. Go to **Workers & Pages → Create → Pages → Connect to Git** and pick `lisasan6/boh`.
3. Enter these settings:
   - **Production branch:** the branch with the latest site. Today that's `claude/find-scrolljar-project-lf7v85`, or `main` once it's merged.
   - **Root directory:** `scrolljar`
   - **Build command:** `sh deploy/build.sh`
   - **Build output directory:** `dist`
   - **Environment variable (optional):** `SITE_URL` = `https://yourdomain`
4. Deploy. Then open **Custom domains** in the project and add your domain.
5. **Email:** in the domain's **Email Routing**, forward `hello@` and `press@` to your own inbox. The site and the privacy page point people to `hello@`.

### Option B: Netlify

1. **Add new site → Import an existing project** and pick `lisasan6/boh`.
2. Netlify reads `netlify.toml` in the repository, so the build settings fill themselves in. Just choose the branch and deploy.
3. Add your domain under **Domain management**. Set up email forwarding wherever you bought the domain.

## What the build does

`deploy/build.sh` copies the website into `dist/` and puts the live app in `dist/app/`. While copying, it:

- serves the fonts from the site itself, so no visitor data goes to Google;
- writes your domain into every link;
- adds `robots.txt`, `sitemap.xml`, basic security headers (`_headers`) and the "page not found" page.

The build stops if any page still points at Google Fonts or outside the site.

From now on, every push to the production branch updates the site within a minute or two.
