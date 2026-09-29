# Product photos

Drop product images in this folder, then set the matching `image` field in
`lib/data/products.ts`.

## Expected filenames

Filenames are the product slug. Any of `.png`, `.jpg`, `.webp` or `.avif`.

```
public/products/
  gan-65w-usb-c-charger.png
  20000mah-slim-power-bank.jpg
  anc-wireless-earbuds-pro.webp
  ...
```

## How to wire them in

Each product takes one line:

```ts
{
  id: "2",
  slug: "gan-65w-usb-c-charger",
  // ...
  image: "/products/gan-65w-usb-c-charger.png",
}
```

That is the entire change. `ProductArtwork` picks up the photo automatically
and the vector placeholder disappears.

## While this folder is empty

Nothing breaks. `ProductArtwork` detects the missing image and draws a vector
product render in its place, so the grid is never blank and never shows a
broken-image icon.

## Sourcing images legally

PelekaPro's catalogue is a mix of genuine branded stock and generic white-label
units. Use images you are entitled to:

- **Branded units** — request the official photo pack from your supplier or
  authorised distributor. This is normally free with a wholesale account and
  comes with marketing rights.
- **Generic units** — photograph your own stock, or use the supplier's photos
  with their permission. Do not lift images from other retailers' listings.
- **AI-generated images** — fine for generic unbranded products. Not acceptable
  for depicting a specific branded product you do not sell.

## Recommended specs

| Property | Value | Why |
| --- | --- | --- |
| Format | `.webp` or `.avif` | Smallest files; Next.js also serves optimised output |
| Dimensions | 1000 x 1000 px | Square, matches the card aspect ratio |
| Background | White or transparent | Consistent grid |
| Aspect | 1:1 | Avoids layout shift as images load |
| File size | Under 150 KB | Keeps the grid fast on mobile data |

Square, consistent backgrounds matter more than resolution. A mismatched
background makes the grid look broken even when every photo is high quality.

## Checklist before going live

- [ ] Every product has an `image` set
- [ ] All images are square and consistently styled
- [ ] Each image is genuinely yours to use
- [ ] `imageAlt` describes the product for screen readers
