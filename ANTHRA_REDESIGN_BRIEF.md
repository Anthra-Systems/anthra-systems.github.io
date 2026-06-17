You are redesigning the Anthra Systems website.

First, do NOT overwrite the current project. Create/copy the existing current website project into a new working folder named `anthra-redesign-workspace` and work only inside that copied version. Treat the current website as a reference because it is based on a ScrewFast-style template already edited for Anthra.

Before building pages, create one internal project brief file inside the copied project:
`ANTHRA_REDESIGN_BRIEF.md`

In that file, document and follow these rules as the source of truth.

Core positioning:
Anthra Systems is an applied engineering and R&D company building intelligent systems for the physical world. It should NOT look like only an industrial automation vendor, IoT company, PCB service provider, or generic software agency. The site must communicate R&D-led real-world engineering across hardware, software, mechanical/mechatronic design, automation, IoT, connected vehicles, edge AI, ML deployment on resource-constrained devices, and field-ready systems.

Tone:
Premium, concise, confident, engineering-led, client-understandable, practical, ambitious. Avoid cheap startup language, excessive buzzwords, sci-fi tone, repeated “cutting-edge”, “AI-powered everything”, and “crazy products”. Use terms like engineering intelligence, physical-world systems, applied R&D, intelligent systems, edge intelligence, connected machines, field-ready engineering, hardware-software-mechanical integration, practical deployment, and real-world engineering challenges.

Visual theme:
Dark graphite/black background, controlled Anthra orange accents, white/light-grey text, dark glass cards, large clean headings, strong spacing, subtle gradients, premium engineering visuals. Avoid too much orange, fake holograms, sci-fi AI visuals, dirty factories, random PCB-only closeups, generic stock engineers, excessive glow, random circuit backgrounds, particles, heavy parallax, and overanimation.

Human/image rule:
Keep human presence minimal. Do not generate random fake corporate people. Exception: preserve existing founder photo/content if good. Careers may use limited young engineering/team imagery but not generic office stock. Every image must support a real-world system/problem/capability, not just look cool.

Preserve:

* Anthra animated SVG logo. If sizing causes issues, report it.
* Existing founder photo/content if good.
* Section title: “Systems We Build for Real-World Applications”.
* Its horizontal scrolling/slider behavior around every 5 seconds.
* Existing images/assets only if they fit the new premium applied-engineering/R&D direction.

Change/restructure:
Navigation becomes: Home | Solutions | Capabilities | R&D | About | Careers | Contact.
Rename Products → Solutions.
Rename Services → Capabilities.
Add/prepare R&D page.
Add/prepare Careers page.
Rework copy/images that make Anthra look too automation-only, IoT-only, PCB-only, generic, sci-fi, or unclear.

Header:
Use animated SVG logo. Header visible only at top of page. Once user scrolls down, hide header completely. Do not show it again on scroll-up. Reappear only when user reaches top. Dropdowns only for Solutions and Capabilities. CTA button: “Discuss a Project”. Mobile uses hamburger menu with same behavior.

Solutions dropdown:
Industry & Machine Systems; Water, Agriculture & Field Systems; Mobility & Connected Vehicles; Edge AI & Vision Systems; Custom R&D Systems.

Capabilities dropdown:
Intelligent Systems R&D; Embedded & Edge Intelligence; Automation & Control Systems; Connected Systems & IoT; Mechanical & Mechatronic Design; AI/ML on Edge Devices; Mobility & Connected Vehicles; Field Deployment & Productization.

Footer:
Minimal premium footer. Include brand line “Anthra Systems — Engineering Intelligence for the Physical World”, Explore links, contact details, LinkedIn, Instagram, and CTA “Have a real-world engineering challenge?” with “Discuss Your Project”. Do NOT include solution areas in footer.

Pages:
Home, Solutions, Solution Detail template, Capabilities, R&D, About, Careers, Contact, optional 404.

Homepage structure:
Hero; Systems We Build for Real-World Applications; Core Engineering Capabilities; How We Build; Featured Solutions; Why Anthra Systems; Contact CTA.
Hero direction: “Engineering Intelligence for the Physical World” or similar. Use rotating keywords like Industry, Infrastructure, Mobility, Agriculture, Smart Machines, Edge AI, Connected Systems.
Animations: hero keyword/background rotation, systems horizontal slider, soft scroll reveals, subtle hover lift/glow, process flow animation. Avoid excessive typing, bouncing icons, particles, heavy parallax, too many sliders.

Solutions page:
Use “Solution Areas” as category filters/sections, not as actual solutions. Each actual solution card has “View Solution” opening a detail page.
Categories and priority:
Industry & Machine Systems: Machine Health & Predictive Maintenance; Industrial Monitoring & Control; Motor Drive & HMI; Machine Data Logger; Custom Machine Automation.
Water/Agriculture/Field: Water Quality Monitoring; Smart Irrigation & Fertigation; Aquaculture Monitoring; Pump Automation & Protection; Tank/Level Monitoring.
Mobility/Connected Vehicles: Connected Vehicle Intelligence; Fleet Tracking & Telematics; Vehicle IoT Gateway; Driver/Vehicle Monitoring; Asset Tracking.
Edge AI/Vision: Edge AI Vision Inspection; Object Detection & Counting; Safety Monitoring Camera; Defect Detection; Smart Surveillance Analytics.
Custom R&D: Intelligent Product R&D; Custom Embedded + Mechatronic Prototype; AI-Enabled Smart Device; Sensor Fusion; POC to Field Deployment.

Solution detail page:
Hero, problem solved, what Anthra builds, key features, applications, technical stack, customization options, CTA.

Capabilities page:
Title “Core Engineering Capabilities”. Show technical depth through: Intelligent Systems R&D; Embedded & Edge Intelligence; Automation & Control; Connected Systems & IoT; Mechanical & Mechatronic Design; AI/ML on Edge Devices; Mobility & Connected Vehicles; Field Deployment & Productization.

R&D page:
Dedicated “Research & Development” page. Sections: What We Explore; R&D Approach; Prototype Areas; Why R&D Matters; CTA. Flow: Problem Study → Feasibility → Prototype → Testing → Field Trial → Productization.

About page:
Do not focus on products/categories. Focus on identity, vision, mission, beliefs, values, ambition, founder credibility. Prominently include:
“We are a young engineering startup with a bold vision — combining practical industry experience with fresh young minds to build ambitious, intelligent systems for real-world challenges.”
Make this statement a premium highlighted block with line-by-line reveal and subtle orange phrase highlights. No cheap typing animation.

Careers page:
Add Careers / Join Our Team. Attract interns, full-time engineers, researchers, and builders from Computer Engineering, Electronics, Mechanical/Mechatronics, AI/ML, Automation, IoT, Edge AI, and related fields. Tone: young, ambitious, serious, technical. Role cards: Embedded Systems Intern/Engineer, IoT & Software Developer, AI/ML & Edge AI Researcher, Mechanical/Mechatronics Engineer, Automation & Control Engineer, R&D Associate.

Contact page:
Title direction: “Let’s Build Something Intelligent”. Add project type selector: Industrial/Machine System, IoT/Connected System, Edge AI/Vision, Vehicle/Mobility, Water/Agriculture, Mechanical/Mechatronic, Custom R&D/Prototype, Not sure/consultation.

Forms/backend:
Use Web3Forms Free Plan for Contact, Careers, and Project Inquiry forms. Avoid file uploads. Ask for resume link, LinkedIn, GitHub, portfolio, Google Drive link. Contact/project → [info@anthrasystems.com](mailto:info@anthrasystems.com). Careers → [careers@anthrasystems.com](mailto:careers@anthrasystems.com) if available, otherwise [info@anthrasystems.com](mailto:info@anthrasystems.com).

Assets:
Audit existing assets first. Keep only assets that match the new direction. Replace only what does not fit. Organize assets into clear folders for logo, hero, systems, solutions, capabilities, rnd, careers, about, icons. Prefer WebP/compressed images, lazy-load below-the-fold images, meaningful filenames.

Responsive/performance:
Desktop 3-column cards, tablet 2-column, mobile 1-column. Mobile hero readable, CTAs stacked, systems slider one card at a time with swipe/dots. Forms full-width and touch-friendly. Avoid heavy video backgrounds, particle libraries, heavy 3D. Keep fast for GitHub Pages.

SEO:
Add proper page titles/meta. Home title: “Anthra Systems | Engineering Intelligence for the Physical World”. Home meta: “Anthra Systems is an applied engineering and R&D company building intelligent systems across embedded technology, automation, IoT, mechatronics, connected vehicles, and edge AI.” Use keywords naturally.

Workflow:
Execute only Phase 1 now:

1. Copy current project into `anthra-redesign-workspace`.
2. Audit current files/pages/components/assets.
3. Create `ANTHRA_REDESIGN_BRIEF.md` documenting the rules above.
4. Create/clean folder structure as needed.
5. Set up theme tokens, global styles, routing, header, footer, and empty page shells.
6. Do not fully build final page content yet.
7. Prepare a summary: what was preserved, what changed, what assets fit, what assets need replacement, and any questions.
8. Stop and wait for my confirmation.

Do not proceed to full page builds until I approve Phase 1.

Phase 1 is now done

---

# FINAL MANUAL ADDITIONS / OVERRIDES

These instructions are added after the original brief and should be treated as the latest finalized direction. Do not delete the earlier brief. If there is any conflict, follow this final additions section.

---

## 1. Homepage Section Order Update

The homepage should follow this final order:

1. Hero
2. Systems We Build for Real-World Applications
3. Core Engineering Capabilities
4. Featured Solutions
5. How We Build
6. Partners & Collaborations
7. Why Anthra Systems
8. Final Contact CTA

Important:
The “How We Build” section must come **after Featured Solutions** on the homepage.

---

## 2. Homepage Image Repetition Rule

Main issue to fix:
The homepage should not repeat the same or very similar images across multiple sections.

Even if sections mention similar domains such as industry, edge AI, agriculture, vehicles, infrastructure, or connected systems, the visual treatment must be different according to the purpose of each section.

Do not reuse the same image across:

* Hero
* Systems We Build
* Core Engineering Capabilities
* Featured Solutions
* How We Build
* Partners & Collaborations
* Why Anthra Systems
* Final CTA

unless explicitly required.

Each section must have a different visual role.

---

## 3. Section-Wise Image Direction

### Hero Section

Purpose:
First impression and company vision.

Use:

* cinematic, broad, premium real-world background images
* wide application scenes
* smart industry, infrastructure, mobility, agriculture, edge AI, and connected systems
* dark overlay with Anthra orange accents
* MNC-style, high-level visuals

Avoid:

* detailed cards
* PCB-only closeups
* repeated images from Systems or Featured Solutions
* sci-fi visuals
* fake holograms
* cluttered dashboards

Hero images should feel broad, premium, and strategic.

---

### Systems We Build for Real-World Applications

Purpose:
Show where Anthra applies its work.

Use domain/application images.

Each card should show a clear real-world application area:

* Smart Industry: clean machine, factory, monitoring, or production environment
* Connected Infrastructure: water, pump, building, utility, or infrastructure monitoring
* Water, Agriculture & Field Systems: farm, water, field sensing, irrigation, or aquaculture environment
* Mobility & Vehicle Systems: vehicle, fleet, telemetry, logistics, or transport monitoring
* Edge AI & Vision Systems: camera inspection, AI vision, detection, or monitoring scene
* Custom R&D Systems: prototype, R&D lab, mechatronic build, or engineering concept scene

These images should not be the same as Hero images. They should be more specific and client-understandable.

---

### Core Engineering Capabilities

Purpose:
Show the engineering depth behind the systems.

Use:

* engineering capability visuals
* premium lab/prototype/testing visuals
* embedded device
* mechatronic assembly
* automation controller
* edge device
* test bench
* icons or abstract engineering visuals if suitable

Avoid:

* repeating agriculture/factory/vehicle application images
* too much technical clutter
* generic PCB-only visuals
* images that look like solution cards

This section should visually communicate:
“Engineering capability behind the systems.”

---

### Featured Solutions

Purpose:
Show concrete examples clients can click.

Use specific solution images.

Each card image should show the actual type of solution:

* Water Quality Monitoring System: water testing, sensor, plant, chamber, or monitoring visual
* Machine Health & Predictive Maintenance System: motor, machine vibration, condition monitoring, or industrial diagnostic visual
* Edge AI Vision Inspection System: camera inspection, quality inspection, safety monitoring, or detection visual
* Connected Vehicle Intelligence System: vehicle telemetry, fleet dashboard, GPS, or vehicle intelligence visual
* Smart Irrigation & Fertigation System: irrigation, dosing, sensor, farm control, or field monitoring visual
* Custom Embedded + Mechatronic Prototype: prototype hardware, mechatronic build, lab bench, or integrated engineering visual

Do not reuse broad Systems section images here. Featured Solutions should look more specific and solution-oriented.

---

### How We Build

Purpose:
Show Anthra’s process.

Do not use application photos here.

Use:

* clean process-style visual
* horizontal flow
* subtle engineering linework
* Research → Design → Prototype → Test → Deploy → Improve
* premium minimal graphics

Avoid:

* heavy photos
* repeated application images
* product cards
* random background images

---

### Partners & Collaborations

Purpose:
Credibility and collaboration.

Use only partner logo/card visuals.

For now, use the existing Ai Unika Private Limited logo already present in the project assets from the previous website version.

Do not generate a new Ai Unika logo.

Section title:
Trusted by Teams Building Real-World Systems

Section subtitle:
We collaborate with technology teams and engineering partners working on practical AI, automation, IoT, and intelligent systems for real-world applications.

Partner card:

Partner name:
Ai Unika Private Limited

Partner label:
AI & Edge Intelligence Partner

Partner description:
Collaborating on applied AI, computer vision, edge deployment, and intelligent systems for real-world applications.

Card style:

* premium dark glass card
* Anthra dark graphite / black background
* controlled orange accent line or glow
* Ai Unika logo clearly visible
* partner name and label beside or below logo
* short description below
* minimal and MNC-style

Avoid:

* fake partner logos
* placeholder logos
* random logo wall
* generic sponsor-section styling

If only one partner logo exists, show it as one premium partner card, not as a logo wall.

---

### Why Anthra Systems

Purpose:
Trust and differentiation.

Use:

* clean icons
* subtle abstract engineering background
* minimal dark cards

Avoid:

* repeating solution/application photos
* image gallery feeling
* too many visuals

This section should strengthen trust, not repeat what the Solutions section already shows.

---

### Final CTA

Purpose:
Conversion.

Use:

* subtle premium dark gradient
* abstract engineering texture
* clean CTA layout
* strong button

Avoid:

* reused hero/system/solution images
* heavy photos
* cluttered visuals

---

## 4. Existing Image Audit Rule

Before generating or replacing images:

1. Audit all existing images/assets.
2. Reuse only images that match the new section-specific purpose.
3. Do not reuse the same image in multiple sections.
4. Rename and organize images properly.
5. Replace images that are generic, repeated, too sci-fi, unclear, PCB-only, too industrial-only, or not novice-client friendly.

If suitable images do not exist:

1. Create/generate new images according to the section-specific direction above.
2. If direct image generation is not available, create a file called `IMAGE_GENERATION_PROMPTS.md`.
3. In that file, write exact prompts for every missing image.
4. Mark which images are missing and where each should be used.
5. Add generated/replacement images where necessary.
6. Do not repeat the same images everywhere.

---

# 5. Solutions Page — Final Direction

The Solutions page should not feel like a cluttered product catalog or a plain text list.

It should feel:

* premium
* MNC-style
* visual
* spacious
* novice-client friendly

A first-time visitor should be able to look at each category and quickly understand what kind of systems Anthra builds.

---

## Main Page Title

Solutions

## Page Subtitle

Explore the intelligent systems Anthra builds across industry, infrastructure, mobility, field operations, edge AI, and custom R&D.

---

## Solutions Page Layout

Use full-sized visual cards, similar in feel to the “Systems We Build for Real-World Applications” cards on the homepage.

Each category should have:

* category section title
* short category description
* 4 to 5 full-sized solution cards

Each solution card should include:

* realistic relevant image
* solution title
* short novice-friendly description
* “View Solution” button

---

## Solutions Page Card Behavior

* Horizontal scrolling / slider behavior is acceptable.
* Keep scrolling smooth and premium.
* One category can have its own row of large cards.
* Cards should not feel cramped.
* Avoid dense small-card catalog styling.
* Make each category visually distinct.
* Keep short descriptions readable.
* A novice client should understand the meaning of each card from:

  1. card title
  2. short description
  3. image

If the image and description together do not make the solution clear, improve them.

---

## Solutions Page Image Rules

Each solution card must have a relevant, realistic, section-specific image.

Do not repeat the same image across categories or across multiple solution cards.

The image should help a novice client understand what the solution is about.

Every card image should answer:

“What kind of real-world system is this describing?”

Avoid:

* repeating homepage images
* repeating category images for all cards
* random generic tech images
* PCB-only images unless the solution is specifically prototype/product oriented
* sci-fi visuals
* fake holograms
* unclear abstract graphics

Examples:

* Water quality solution should visually suggest water testing, treatment plant, sensor chamber, or monitoring.
* Predictive maintenance should visually suggest machine health, vibration, motor monitoring, or industrial diagnostics.
* Connected vehicle system should visually suggest telemetry, fleet, route monitoring, GPS, or vehicle intelligence.
* Edge AI vision should visually suggest inspection, camera, detection, counting, or visual monitoring.
* Custom prototype should visually suggest R&D, integrated engineering, mechatronic build, or prototype testing.

---

# 6. Final Solutions Page Categories and Cards

## 1. Industry & Machine Systems

Category description:
Intelligent systems for monitoring, controlling, diagnosing, and improving machines, production lines, and industrial assets.

Solutions:

1. Machine Health & Predictive Maintenance System
   Description:
   Monitor machine condition, vibration, current, temperature, and early fault signs before breakdowns occur.

2. Industrial Monitoring & Control System
   Description:
   Connect machines and industrial processes to dashboards, alerts, remote monitoring, and control logic.

3. Motor Drive & HMI Control System
   Description:
   Custom motor control and operator interface systems for machines that need smoother control and visibility.

4. Machine Data Logger & Dashboard System
   Description:
   Capture machine data and convert it into useful operational insights, history, and live monitoring.

5. Custom Machine Automation System
   Description:
   Build tailored automation systems for special industrial machines, workflows, and process requirements.

Image direction:
Use machine, factory, process, diagnostic, motor, and monitoring visuals, but make each card image specific to its own solution. Do not use the same machine image for all 5 cards.

---

## 2. Water, Agriculture & Field Systems

Category description:
Smart monitoring and automation systems for water, farms, aquaculture, irrigation, and remote field infrastructure.

Solutions:

1. Water Quality Monitoring System
   Description:
   Monitor water conditions such as pH, TDS, turbidity, chlorine, and related quality indicators in real time.

2. Smart Irrigation & Fertigation System
   Description:
   Automate irrigation, nutrient dosing, scheduling, and field-level monitoring for better crop and water management.

3. Aquaculture Monitoring System
   Description:
   Track pond or tank health, water quality, aeration conditions, and key operational parameters.

4. Pump Automation & Protection System
   Description:
   Automate pumps, prevent dry-run, manage tank levels, and monitor system faults and operating status.

5. Remote Field Asset Monitoring System
   Description:
   Monitor field equipment, pumps, tanks, sensors, and other remote assets through connected intelligence.

Image direction:
Use water, irrigation, field, aquaculture, pump, tank, and remote monitoring visuals. Each card image should be different and clearly mapped to the card topic.

---

## 3. Mobility & Connected Vehicles

Category description:
Connected systems for vehicles, fleets, transport monitoring, telemetry, diagnostics, and mobile assets.

Solutions:

1. Connected Vehicle Intelligence System
   Description:
   Collect and use vehicle data for smarter monitoring, safety, performance, and connected operations.

2. Fleet Tracking & Telematics System
   Description:
   Track vehicles, routes, driving activity, usage patterns, and fleet performance more effectively.

3. Vehicle IoT Gateway
   Description:
   Connect vehicle sensors, GPS, diagnostics, and communication modules into one intelligent system.

4. Driver & Vehicle Monitoring System
   Description:
   Monitor vehicle behavior, driver activity, safety events, and operational alerts.

5. Cold Chain / Transport Monitoring System
   Description:
   Monitor temperature, location, and transport conditions for sensitive or time-critical cargo movement.

Image direction:
Use vehicles, fleet dashboards, telemetry, transport, route/logistics, diagnostics, and monitoring visuals. Each should be unique and solution-specific.

---

## 4. Edge AI & Vision Systems

Category description:
Camera and AI-based systems that detect, inspect, count, monitor, and support faster decisions at the edge.

Solutions:

1. Edge AI Vision Inspection System
   Description:
   Inspect products, parts, or operating conditions using AI-powered camera systems near the point of use.

2. Object Detection & Counting System
   Description:
   Detect and count people, vehicles, products, animals, or other objects using edge intelligence.

3. Safety Monitoring Camera System
   Description:
   Monitor safety conditions, restricted zones, missing safety gear, and unsafe activity through vision systems.

4. Smart Surveillance Analytics System
   Description:
   Add intelligence to camera monitoring for event detection, alerts, and smarter operational visibility.

5. Low-Power TinyML Detection System
   Description:
   Deploy lightweight AI models on compact devices for always-on detection and low-power monitoring.

Image direction:
Use camera inspection, computer vision, monitoring, detection, safety, counting, and smart detection visuals. Avoid repeating one camera image for all cards.

---

## 5. Custom R&D Systems

Category description:
R&D-led engineering for new product ideas, prototypes, special systems, mechatronic builds, and undefined technical challenges.

Solutions:

1. Intelligent Product R&D
   Description:
   Turn new product ideas into practical engineering concepts, architectures, and early-stage prototypes.

2. Custom Embedded + Mechatronic Prototype
   Description:
   Build integrated prototypes combining electronics, mechanics, sensing, and embedded intelligence.

3. AI-Enabled Smart Device Development
   Description:
   Create smart connected devices with sensing, decision-making, communication, and applied intelligence.

4. Sensor Fusion System
   Description:
   Combine data from multiple sensors to improve system awareness, detection accuracy, and decision-making.

5. Proof-of-Concept to Field Deployment
   Description:
   Move a concept from prototype and testing toward a practical deployable real-world system.

Image direction:
Use prototype lab, integrated hardware-mechanics, R&D bench, engineering build, product development, and field testing visuals. Do not make all images look like the same PCB workbench.

---

## 7. Solutions Page Future Expansion Rule

The current solution list is not final.

The structure must remain flexible because more relevant, stronger, and more impressive solutions may be added later under each category.

For now, keep 4–5 solutions per category.

Do not randomly add many new solutions yet unless needed for structure.

Build the data structure so that additional solution cards can be added easily later.

---

## 8. Development Instruction After This Update

After updating the brief with this final additions section:

1. Start working on the Solutions page.
2. Generate, replace, or prepare the required images according to the above constraints.
3. Build the Solutions page with full-sized visual cards.
4. Ensure the page is premium, visual, MNC-style, and novice-client friendly.
5. After the Solutions page is done, do not wait for any other instructions, continue with the other pages according to the existing constraints and instructions already defined in `ANTHRA_REDESIGN_BRIEF.md`.

Do not ignore the original brief. These additions only refine and finalize image handling, homepage order, partner card direction, and Solutions page structure.
