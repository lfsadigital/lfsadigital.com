---
name: LFSA Digital Lab
description: Personal projects within the existing LFSA Digital site.
---

# Design System: LFSA Digital Lab

## Overview

This document records the built Lab surface. It extends the existing LFSA design system; it does not define a new brand or global token set. The authoritative shared sources are [tokens.css](../tokens.css) and [portfolio.css](../work/portfolio.css). Local rules are in [lab.css](lab.css), and shared Lab navigation rules are in [lab-navigation.css](../lab-navigation.css). Page content and structure are in [index.html](index.html); product boundaries are in [PRODUCT.md](PRODUCT.md).

The page uses a large Lab title, short project descriptions, and horizontal project rows with actual app screenshots. Dark surfaces, LFSA type, the existing logo, and gold links connect it to the rest of the site.

## Colors

Use the shared CSS variables directly. `--deep` is the page background; `--navy` is the preview surface. `--gold` marks the title dot, project actions, current Lab navigation, and the In progress status. The inherited navigation CTA uses `--gold-hover` on hover. The LFSA palette also includes `--blue`; do not create a separate Lab accent.

`--text` serves headings, `--text-2` serves descriptions and preview labels, and `--mute` serves topics and fine text. `--line` provides project dividers and preview borders. Preserve screenshot colors as captured.

## Typography

Use `--font-display` (Space Grotesk) for headings, project questions, links, and labels. Use `--font-body` (Inter) for descriptions and supporting text.

- Lab title: `clamp(4rem,7vw,6rem)`, weight 700, line height 1, letter spacing `-.04em`; 4.5rem at 720px and below.
- Lead: `clamp(1.6rem,3vw,2.3rem)`, weight 500, line height 1.2.
- Project title: `clamp(1.8rem,3vw,2.5rem)`, line height 1.15, letter spacing `-.03em`.
- Project question: 1.05rem, weight 500. Project actions: .95rem, weight 600.
- Supporting descriptions inherit the shared body line height of 1.65. Topic lines use .8rem; preview labels use .75rem.

## Layout

The intro, projects, closing note, and footer share `--wrap` (1180px) and `--sec-x` (`clamp(20px,5vw,28px)`). The desktop intro uses `.7fr 1.3fr` columns. Public project rows use `.78fr 1.22fr` columns, with copy on the left and a preview on the right. Rows have a top divider, `clamp(38px,5vw,64px)` vertical padding, and `clamp(32px,5vw,64px)` column gaps.

At 720px and below, the intro and project rows use one column. Preview images follow their project copy. The lead loses its forced line break, and the closing section becomes a vertical stack. The election row also stacks and places its status at the start.

The shared navigation keeps Lab outside the scrollable link strip. Its direct link has a minimum 44px width and height. At 410px and below, the shared AI page title can wrap; preserve this rule when updating navigation across pages.

## Elevation & Depth

Lab project rows use spacing and thin dividers instead of elevated cards. Preview containers have a navy surface and border, with no local shadow. The Lab disables the inherited body texture. The shared sticky navigation retains its translucent deep navy background and blur. Preserve its existing CTA hover treatment.

## Shapes

Previews use `--r-tile` (12px), a 1px `--line` border, and clipped overflow. Images retain their full aspect ratio with `width:100%` and `height:auto`. Project actions are text links with an inset gold underline. Shared navigation uses the established LFSA logo and button radius.

## Components

### Project rows and previews

Each public row contains a title, question, description, topics, explicit action, and linked screenshot with a caption. Comfy Days links to `https://comfy.lfsadigital.com/`; Drive Lab links to `https://nfl.lfsadigital.com/`. Both actions and previews open a new tab and include accessible labels and `noopener noreferrer`.

The two local WebP assets are actual public app captures. Comfy Days is 1100 × 627; Drive Lab is 1100 × 764. The first image has high fetch priority; the second loads lazily. Preview hover raises brightness to 1.05 over .25s; reduced motion removes the image transition.

### In progress row

Atlas · Brazil elections uses project copy and a separate gold In progress label with a short availability note. It has no preview or external app link. Keep its access URL private.

### Navigation and accessibility

Use the inherited sticky header, logo, navigation links, and Get started CTA. Lab uses `aria-current="page"` on this page and turns gold in its current or hover state. Preserve the skip link and the shared gold focus ring. Public project actions have a minimum 44px height. Footer links also have a minimum 44px height.

### Closing note and footer

The closing note names the builder and links to selected client work. The compact footer uses the LFSA wordmark, social links, Privacy, and copyright. Both sections use the same page width and divider treatment as the projects.

## Do's and Don'ts

- Do reuse the authoritative shared tokens and navigation styles.
- Do use actual static public screenshots and ordinary app links.
- Do retain the mobile column stack, readable text widths, and direct Lab link.
- Do preserve the election project's In progress label and lack of an external link.
- Don't add app embeds, application data, JavaScript, trackers, or forms to this surface.
- Don't publish the private election access URL or create a separate Lab brand system.
