# Bulk Configurator Storefront

BigCommerce Cornerstone theme with an embedded bulk order configurator and a
multi-client theming system. Customers configure custom products (t-shirts,
stickers, buttons, mugs, can coolers, yard signs), see live pricing, and add to
cart. Each client store gets its own branch with brand colors, fonts, and assets.

┌─────────────────────────────────┐ ┌──────────────────────────────┐
│ This Repo │ │ bulk-configurator repo │
│ (Cornerstone theme) │ │ (Lit web components) │
│ │ │ │
│ templates/ │ │ src/components/ │
│ assets/scss/custom/ ← theme │◀────│ npm run build → │
│ assets/js/custom/ │ │ dist/bulk-configurator. │
│ bulk-configurator.js ← built │ │ iife.js │
│ │ │ │
│ Deployed via: stencil push │ │ Deployed via: copy to here │
└─────────────────────────────────┘ └──────────────────────────────┘


## Quick Start — New Store Setup


# 1. Clone and set up
git clone https://github.com/audiomuse1/personal-bulk-configurator-storefront.git
cd personal-bulk-configurator-storefront
npm install

# 2. Branch for your client
git checkout master
git checkout -b store/clientname

# 3. Create client SCSS (copy the template)
cp assets/scss/custom/clients/_default.scss assets/scss/custom/clients/_clientname.scss

# 4. Edit _clientname.scss with brand colors (see "Client File Reference" below)

# 5. Swap the import in theme.scss (last section)
#    Change: @import "custom/clients/default";
#    To:     @import "custom/clients/clientname";

# 6. Edit checkout colors in assets/scss/custom/checkout/_bulk-checkout.scss

# 7. Edit config.json with theme editor colors (search for optimizedCheckout-*)

# 8. Edit config.stencil.json with the client's store URL and product slugs

# 9. Optionally edit footer tagline in templates/components/common/footer.html

# 10. Test
stencil start
# Visit http://localhost:3000

# 11. Deploy
stencil bundle
stencil push

## Branching Strategy
master (generic)
│   Neutral defaults. Black header/footer. Blue accent.
│   All structural SCSS uses var(--bulk-*) tokens.
│   Never has client-specific colors.
│
├── store/bumperactive
│   Teal #00AFB9 / Coral #FF6161 / Cream #FDFCDC
│   Fonts: Belinda + Museo Slab
│
├── store/futureclient
│   Their brand colors + fonts
│
└── (each store branches from master)

## Rules:

Generic structural changes go on master, then get merged into store branches
Client-specific colors/fonts/assets ONLY go on the store branch
Never put client colors on master
File Reference — What Changes Per Client
Only these files change when setting up a new store:

## Files	What to change
assets/scss/custom/clients/_clientname.scss	:root CSS custom property overrides (colors, fonts)
assets/scss/custom/checkout/_bulk-checkout.scss	Hardcoded checkout colors (can't use CSS vars)
assets/scss/theme.scss	Swap @import "custom/clients/clientname"
config.json	optimizedCheckout-* colors, header-backgroundColor, footer-backgroundColor, body-bg, homepage_show_carousel
config.stencil.json	normalStoreUrl, product URL slugs in customLayouts
templates/components/common/footer.html	Tagline text (optional)
CSS Custom Properties (Tokens)
All structural styles reference these tokens. Client files override them.


// ── Brand Colors ──────────────────────
--bulk-color-accent-primary        // Main accent (nav bar, links, buttons)
--bulk-color-accent-primary-dark   // Hover/active state
--bulk-color-accent-secondary      // Secondary accent (errors, highlights)
--bulk-color-accent-secondary-dark // Secondary hover
--bulk-color-bg-page               // Body background
--bulk-color-text-white            // White text
--bulk-color-text-light            // Light gray text
--bulk-color-text-muted            // Muted gray text
--bulk-color-text-body             // Body text color

// ── Typography ────────────────────────
--bulk-font-display                // Display/heading font
--bulk-font-body                   // Body/UI font

// ── Header ────────────────────────────
--bulk-header-bg                   // Header background
--bulk-header-text                 // Header text color
--bulk-header-nav-bg               // Navigation bar background
--bulk-header-nav-text             // Navigation text
--bulk-header-nav-hover            // Navigation hover background

// ── Footer ────────────────────────────
--bulk-footer-bg                   // Footer background
--bulk-footer-text                 // Footer body text
--bulk-footer-heading              // Footer heading color
--bulk-footer-link                 // Footer link color
--bulk-footer-link-hover           // Footer link hover
--bulk-footer-divider              // Footer divider lines

## Product Page Styling (TODO)
The embedded <bulk-configurator> component uses Shadow DOM, so its internal
styles are isolated. To style the page around it (layout, spacing, the
BigCommerce product info panel), create:

bash
# On master:
touch assets/scss/custom/_bulk-product.scss
# Add to theme.scss:
# @import "custom/bulk-product";
Areas to style:

Product page layout (image left, configurator right)
Product title / breadcrumbs
Product description panel
Spacing between BC chrome and the configurator
Mobile responsive layout for product pages
The configurator's internal styles (step cards, buttons, color swatches) are
controlled in the bulk-configurator repo via shared-styles.ts and
individual step component files.


# Local testing
stencil start
# Visit http://localhost:3000
