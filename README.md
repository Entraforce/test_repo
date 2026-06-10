# Qahwa House — website

The website for **Qahwa House** (Restaurant · Bakery · Irani Chai · Premium Organic
Coffee) in Mehdipatnam, Hyderabad. Domain: **coffeemocktailscorner.com**.

It's a single static page — no build step, no framework. Just open `index.html`.

## Files
- `index.html` — the whole website (one page, sections for Honey Comb, Menu, Bakery,
  Story, Gallery, Visit).
- `assets/photos/` — all the interior & food photos (named `qahwa-01.jpg` … `qahwa-36.jpg`).
- `assets/og-image.jpg` — the image shown when the site is shared on WhatsApp/Facebook.
- `CNAME`, `robots.txt`, `sitemap.xml`, `404.html` — hosting + SEO helpers.

## To preview on your Mac
Open Terminal in this folder and run:

    python3 -m http.server

then visit **http://localhost:8000** in your browser. (Or just double-click `index.html`.)

## Business details
Already filled in: **logo**, **phone** (+91 87906 20996), **address** (Pillar No. 14,
Asif Nagar Rd, near Raitu Bazaar, Mehdipatnam, Hyderabad 500028), **hours** (daily
5 AM – 1 AM), and a **live Google map** in the Visit section.

Still optional / to add when you have them (search `index.html` for the word):
1. **SOCIAL** — your real Instagram / Facebook links (footer + schema `sameAs`).
2. **RATING** — Google star-rating snippet (see the note in the schema; real numbers only).
3. **PRICES** — taken from the in-store photos; worth a quick double-check.

(Just send me any of these and I'll plug them in.)

## To publish (GitHub Pages)
This isn't connected to GitHub yet. When you're ready, I can create the repo and push it,
then point `coffeemocktailscorner.com` at it — same setup as the Shaahi Biryani site.
