# Phase 1 Audit

Scope: audit and scaffold only. No final page content build and no image replacement in this phase.

## Current Routes

- `/` currently had a customized Anthra home page with hero, automation cards, real-world systems slider, development/process blocks, clients, and CTA.
- `/products` currently acts as the product/solution listing. It should become `/solutions`.
- `/products/[id]` currently renders solution detail content from `src/content/products`.
- `/services` currently acts as capabilities/services. It should become `/capabilities`.
- `/about` has usable Anthra identity, founder image, founder credibility, and vision content.
- `/contact` has contact details and a non-backend form shell.
- `/404`, robots, manifest, favicon exist and can remain for now.

## Components To Preserve

- `src/components/logo.astro` and `src/components/small-logo.astro`: animated Anthra SVG logo preserved.
- `src/images/fulllogoanimation.svg`: animated logo asset preserved.
- `src/images/CEO Photo.png`: founder image appears relevant and should be preserved unless the user wants a better portrait later.
- `src/components/sections/landing/AutomationUseCases.astro`: preserves the title "Systems We Build for Real-World Applications" and the 5-second slider behavior.

## Components Requiring Redesign Later

- `HeroSection.astro`: useful behavior and structure, but current visual feels too logo-card focused and not premium enough for the new brief.
- `AutomationIntroCards.astro`: content is relevant but visual treatment needs mobile-first redesign.
- `CompleteSystems.astro`: should be replaced by "How We Build" development/process section.
- Product card components: useful as references, but final solution cards need cleaner category/filter structure.
- Contact form components: need Web3Forms integration in a later phase.

## Assets That Fit The New Direction

- `src/images/use-cases/*.png`: currently relevant for real-world systems slider, keep for now.
- `src/images/automation/Automate-compare1.png`, `Automate-compare2.png`, `Automate-compare3.png`: likely useful for an automation/process comparison section.
- `src/images/products/connected-vehicle-monitoring.png`, `connected-vehicle-coverage.png`: relevant to mobility and fleet systems.
- `src/images/hero/industrial-iot-automation-hero.png`: technically relevant, but may need stronger premium composition.
- `src/images/services/*.png`: mostly relevant, but should be re-evaluated against the premium applied-R&D direction.

## Assets Likely Needing Replacement Or Removal

- ScrewFast/Starlight template assets in `src/images/starlight`.
- Generic construction/template images such as `construction-workers.avif`, `construction-image.avif`, `blueprint-*`, `product-image-*`, and blog avatars.
- Older generic product photos where the image does not directly support Anthra's systems, R&D, edge intelligence, mobility, or deployment story.

## Phase 1 Structure Added

- New navigation structure: Home, Solutions, Capabilities, R&D, About, Careers, Contact.
- New page shells for `/solutions`, `/solutions/[slug]`, `/capabilities`, `/rnd`, `/careers`.
- New shared shell component: `src/components/sections/redesign/PageShell.astro`.
- New data file for planned solution detail slugs: `src/data_files/redesign.ts`.
- New asset folders prepared under `src/images/logo`, `hero`, `systems`, `solutions`, `capabilities`, `rnd`, `careers`, `about`, and `icons`.

## Questions For Confirmation

- Should `/products` and `/services` be kept as compatibility pages, or should they be removed/redirected after the new routes are complete?
- Should the home hero use an existing real system image, a generated premium system visual, or a more abstract product-grid visual in Phase 2?
- Should careers use `careers@anthrasystems.com`, or should it use `info@anthrasystems.com` until that inbox is confirmed?
