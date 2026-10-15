#!/bin/sh
# Builds the public website into scrolljar/dist/. Netlify and Cloudflare Pages run this for you;
# locally: sh deploy/build.sh (from the scrolljar folder). Only the website and the live app demo
# are published; docs/, CLAUDE.md and the rest stay private.
#   SITE_URL  the site's address (default https://scrolljar.app); it's used in links, the sitemap and share cards.
set -eu
cd "$(dirname "$0")/.."
SITE_URL="${SITE_URL:-https://scrolljar.app}"
SITE_URL="${SITE_URL%/}"

rm -rf dist
mkdir -p dist/app dist/fonts
cp landing/index.html landing/teams.html landing/families.html landing/privacy.html landing/404.html \
   landing/site.css landing/site.js landing/og.png dist/
cp landing/fonts/* dist/fonts/
cp prototype/index.html prototype/styles.css prototype/app.js dist/app/
cp deploy/_headers dist/

# The live app sits in app/ (not ../prototype/), fonts come from this site instead of Google,
# and every absolute link uses SITE_URL.
for f in dist/*.html dist/app/index.html; do
  case "$f" in
    dist/app/*) FONTS='../fonts/fonts.css' ;;
    dist/404.html) FONTS='/fonts/fonts.css' ;;   # served at any broken address, so root paths
    *) FONTS='fonts/fonts.css' ;;
  esac
  sed -e 's#\.\./prototype/index\.html#app/index.html#g' \
      -e '/rel="preconnect" href="https:\/\/fonts\.g/d' \
      -e "s#<link href=\"https://fonts\.googleapis\.com/css2[^\"]*\" rel=\"stylesheet\">#<link rel=\"stylesheet\" href=\"$FONTS\">#" \
      -e "s#https://scrolljar\.app#$SITE_URL#g" \
      "$f" > "$f.tmp"
  mv "$f.tmp" "$f"
done

cat > dist/robots.txt <<ROBOTS
User-agent: *
Disallow: /app/
Sitemap: $SITE_URL/sitemap.xml
ROBOTS
{
  echo '<?xml version="1.0" encoding="UTF-8"?>'
  echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  for p in "" teams.html families.html privacy.html; do echo "  <url><loc>$SITE_URL/$p</loc></url>"; done
  echo '</urlset>'
} > dist/sitemap.xml

# Safety checks: nothing may still load Google Fonts or point outside the site.
if grep -l 'fonts\.googleapis\|fonts\.gstatic\|\.\./prototype' dist/*.html dist/app/index.html; then
  echo "build: a page above still points at Google Fonts or ../prototype" >&2; exit 1
fi
if grep -q 'class="fill"' dist/privacy.html; then
  echo "build: WARNING: privacy.html still has [placeholders] to fill in (name, city, country)" >&2
fi
if grep -q "FORM_ID='YOURFORMID'" dist/site.js; then
  echo "build: WARNING: the waitlist is in demo mode. Set FORM_ID in landing/site.js" >&2
fi
echo "build: dist/ ready for $SITE_URL"
