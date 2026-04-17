# Public Route Smoke Test Checklist

## Scope
- Home: `/`
- Jobs: `/jobs`, `/jobs/:id`
- Blog: `/blog`, `/blog/:slug`
- Auth: `/login`, `/signup`, `/forgot-password`
- Legal: `/terms`, `/privacy-policy`, `/cookies`
- Other public pages: `/about`, `/contact`, `/faq`, `/guide`, `/costs`

## Checklist
- [ ] Route opens without runtime error (`error.tsx` not triggered).
- [ ] Header and footer render correctly on desktop + mobile.
- [ ] Main CTA buttons navigate to valid routes (no `#`, no dead link).
- [ ] Form submit states show loading and validation feedback.
- [ ] Empty / invalid params show proper `not-found` behavior.
- [ ] SEO metadata present (title, description, canonical).
- [ ] Links in cards/list items use correct dynamic key (`id`/`slug`).
- [ ] No console errors in browser during page load and primary interaction.
- [ ] No nested interactive element issue affecting click behavior.
- [ ] Basic accessibility: focusable controls, labels, and contrast readable.

## Regression Cases
- [ ] `/jobs/7` and `/jobs/8` must open if present in source dataset.
- [ ] `/blog/:slug` invalid slug must return not found page.
- [ ] Featured blog card must navigate using slug, not numeric id.
- [ ] Signup policy links must navigate to legal pages.
- [ ] Footer social icons are hidden when URL env vars are not configured.

