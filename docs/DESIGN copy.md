ersity, and Company portals.

1. Color and Theme

1.1 Primary Theme

The primary visual color is deep blue.

Primary Blue       #2563EB
Primary Dark       #1D4ED8
Primary Light      #DBEAFE

Blue represents:

Trust

Technology

Education

Professionalism

Connectivity

Purple should not be used as the primary brand color.

1.2 Base Colors

Page Background    #F8FAFC
Surface            #FFFFFF

Primary Text       #0F172A
Secondary Text     #475569
Muted Text         #64748B

Border             #E2E8F0
Border Strong      #CBD5E1

The main application area should use a light background with white surfaces.

1.3 Dashboard Sidebar

All three dashboards use the same sidebar visual system.

Sidebar Background       #172A3D
Sidebar Secondary       #1E344B

Sidebar Text            #E2E8F0
Sidebar Muted Text      #94A3B8

Active Background       #60A5FA
Active Text             #FFFFFF

The sidebar should be dark navy rather than pure black.

Sidebar Structure

┌─────────────────────────┐
│ ◆ Platform / Org       │
│                         │
│  ◉ Dashboard            │
│  ◉ Profile              │
│  ◉ ...                  │
│                         │
│  ◉ Settings             │
└─────────────────────────┘

The active navigation item uses a light-blue rectangular highlight.

It must not use a pill/capsule shape.

1.4 Role Navigation

The visual system remains the same for all roles.

Student

Dashboard
Profile
Skill Mapping
Opportunities
Applications
Learning
Notifications
Settings

College / University

Dashboard
Students
Skill Intelligence
Internships
Placements
Companies
Industry Collaboration
Reports
Notifications
Settings

Company

Dashboard
Company Profile
Jobs & Internships
Candidates
Applications
Hiring Pipeline
Colleges
Analytics & Reports
Notifications
Settings

The menus change according to the role, but the sidebar design remains consistent.

1.5 Semantic Colors

Use semantic colors only where they communicate status or state.

Success        #16A34A
Success Light  #DCFCE7

Warning        #D97706
Warning Light  #FEF3C7

Error          #DC2626
Error Light    #FEE2E2

Info           #0284C7
Info Light     #E0F2FE

Examples:

Selected       → Success
Approved       → Success
Pending        → Warning
Under Review   → Info
Rejected       → Error

Do not use semantic colors simply for decoration.

1.6 Secondary Accent

A restrained teal accent may be used for skill intelligence and selected AI-related highlights.

Teal           #0F766E
Teal Light     #CCFBF1

Teal must remain secondary to blue.

1.7 Gradients

Gradients are allowed only when they provide visual depth.

Preferred direction:

Blue → lighter blue

Use gradients selectively for:

Hero backgrounds

Large visual areas

AI feature highlights

Decorative background elements

Do not use gradients on every card, button, heading, or section.

Avoid purple-gradient-heavy SaaS styling.

1.8 Theme

Primary Theme

Light mode is the default.

Page       → Light
Cards      → White
Sidebar    → Dark Navy
Text       → Dark Slate
Primary    → Blue

Dark Mode

Dark mode can be introduced later as an enhancement.

It is not required for the first implementation.

2. Fonts

2.1 Primary Font System

Use:

Headings: Geist
Body/UI: Inter

Geist provides a contemporary product feel.

Inter is used for:

Body text

Navigation

Forms

Tables

Buttons

Labels

Dashboard data

If Geist is not convenient in a specific environment, Inter can be used as the fallback for headings.

2.2 Font Stack

Recommended:

font-family:
  Inter,
  ui-sans-serif,
  system-ui,
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  sans-serif;

Heading stack:

font-family:
  Geist,
  Inter,
  ui-sans-serif,
  system-ui,
  sans-serif;

2.3 Font Weights

Use a limited set of weights.

400  Regular
500  Medium
600  Semibold
700  Bold

Recommended usage:

400 → body text
500 → labels / navigation / metadata
600 → headings / important UI
700 → hero display / major numbers

Avoid using too many font weights in one screen.

3. Typography

3.1 Display / Hero

Desktop:

Font size: 64px
Weight: 600–700
Line height: 1.05–1.10
Letter spacing: -0.03em

Mobile:

Font size: 40px
Line height: 1.10

Hero text should be specific to the product.

Example:

Connect skills with real opportunities.

Avoid vague statements such as:

The future starts here.

3.2 H1

Font size: 40–48px
Weight: 600
Line height: 1.15
Letter spacing: -0.02em

Example:

Student Dashboard
Company Analytics
Skill Intelligence

3.3 H2

Font size: 28–32px
Weight: 600
Line height: 1.20

Example:

Recommended Opportunities
Industry Skill Demand
Recent Applications

3.4 H3

Font size: 20–24px
Weight: 600
Line height: 1.30

Used for cards, subsections, and grouped content.

3.5 Body Text

Font size: 16px
Weight: 400
Line height: 1.50–1.60

Body text should remain readable and not be compressed into small UI text.

3.6 Small Text

Font size: 13–14px
Weight: 400–500
Line height: 1.40–1.50

Use for:

Metadata

Timestamps

Secondary information

Helper text

Table details

3.7 Dashboard Numbers

Important metrics can use stronger typography.

Large metric:
32–40px
Weight: 600

Example:

127
Applications

Numbers should only represent actual database data.

Never create fake metrics for visual appearance.

4. Layout and Spacing

Use a consistent spacing system based on multiples of 4px.

4px
8px
12px
16px
20px
24px
32px
40px
48px
64px
80px

Recommended usage:

Small gap             8px
Form field gap        16px
Card padding          20–24px
Section spacing       40–64px
Major page spacing    64–80px

The interface should have enough whitespace to avoid feeling crowded.

5. Dashboard Layout

All three role-based portals share the same layout architecture.

┌────────────────┬────────────────────────────────────────┐
│                │                                        │
│    SIDEBAR     │            MAIN CONTENT                │
│                │                                        │
│    Branding    │            Page Header                 │
│                │                                        │
│    Navigation  │            Content                     │
│                │                                        │
│                │            Tables / Cards / Charts     │
│                │                                        │
│    Settings    │                                        │
└────────────────┴────────────────────────────────────────┘

Sidebar

Fixed or sticky on desktop

Full dashboard height

Dark navy

Branding at top

Navigation below branding

Settings near the bottom

Scrollable navigation if required

Main Content

Light background

Comfortable horizontal padding

Clear page heading

Content grouped by importance

Responsive layout

6. Sidebar Design

Branding

Top section:

[Logo] Platform / Organization Name

For a company:

[Logo] TechNova

For an institution:

[Logo] SHEAT College

For the student portal:

[Logo] Platform

Navigation Items

Each item contains:

[Icon] Label

Icons should be simple line icons.

Avoid emoji icons.

Active State

Background: #60A5FA
Text:       #FFFFFF

Use moderate corner radius.

Example:

┌──────────────────────────┐
│  ▣  Applications         │
└──────────────────────────┘

Not:

( Applications )

7. Border Radius

Rounded corners are allowed but should remain controlled.

Buttons:       8–10px
Inputs:        8–10px
Cards:         12–16px
Modals:        16px
Large panels:  16px

Avoid excessive rounding.

Do not turn normal buttons or navigation items into capsules.

8. Buttons

Primary Button

Background: #2563EB
Text:       #FFFFFF
Radius:     8–10px
Weight:     500–600

Secondary Button

Background: #FFFFFF
Text:       #0F172A
Border:     #CBD5E1
Radius:     8–10px

Destructive Button

Background: #DC2626
Text:       #FFFFFF

Buttons should have clear labels.

Prefer:

Create Opportunity
View Candidate
Apply Now
Save Changes

Avoid vague:

Go
Continue
Click Here

when a more descriptive label is possible.

9. Cards

Cards should be used when they create a clear content boundary.

Typical card:

White surface
1px border
12–16px radius
20–24px padding

Recommended:

background: #FFFFFF
border: 1px solid #E2E8F0

Shadows should be subtle.

Avoid heavy floating-card effects.

Do not turn every small piece of information into a separate card.

10. Forms and Inputs

Inputs should be:

Height: approximately 40–44px
Radius: 8–10px
Border: #CBD5E1
Background: #FFFFFF

Focus state:

Border: #2563EB

Labels should appear above the field.

Example:

College / Institution

[ Search and select college...             ]

Institutional fields should use searchable controlled selectors instead of unrestricted text input wherever possible.

11. Tables

Tables are important for:

Students

Applications

Candidates

Opportunities

Placement records

Reports

Table design:

Header
  ↓
Rows
  ↓
Hover state
  ↓
Actions

Use:

Clear column hierarchy

Comfortable row height

Light borders

Sticky header when useful

Pagination for large datasets

Search and filters where required

Avoid overly dense tables.

12. Charts and Analytics

Charts should prioritize readability over decoration.

Use:

Bar charts

Line charts

Donut charts where appropriate

Progress indicators

Tables for exact values

Color should communicate meaning.

Do not use excessive multi-color charts.

Charts must use actual platform data.

If there is insufficient data:

Insufficient data for this analysis.

Do not fill charts with invented numbers.

13. AI UI

AI features should look like part of the platform, not a separate chatbot website.

AI output should clearly communicate:

What AI analyzed

What information was used

What the result means

What the user can review/edit

That AI suggestions are not automatically authoritative

Example:

AI Skill Analysis

Based on:
Resume
GitHub
Projects

Suggested Skills:
React
Node.js
MongoDB

[Review Suggestions]

AI-generated data should be reviewable before becoming permanent profile data.

14. Icons

Use a consistent icon library.

Recommended direction:

Lucide Icons

Another consistent line-icon library

Rules:

No emoji icons

Do not mix many icon styles

Keep icon stroke and visual weight consistent

Use icons to support labels, not replace important text unnecessarily

15. Animation

Animations should be subtle and functional.

Allowed:

Page fade

Small hover transitions

Button state transitions

Sidebar active transitions

Modal transitions

Loading skeletons

Small chart transitions

Avoid:

Crazy scroll animations

Cursor-following effects

Cursor animations

Excessive parallax

Constant floating elements

Long entrance animations

Animation should never slow down navigation or hide important content.

16. Responsive Design

The platform must work on:

Desktop

Laptop

Tablet

Mobile

Desktop:

Sidebar + Main Content

Tablet/mobile:

Top bar / Collapsible navigation
+
Main Content

Tables should become horizontally scrollable or transform into readable mobile layouts.

Do not simply shrink desktop layouts until text becomes unreadable.

17. Visual Content Rules

The platform should prioritize actual product UI and meaningful visualizations.

Preferred:

Dashboard screenshots/mockups

Skill visualizations

Opportunity previews

Product interface demonstrations

Data visualizations

Avoid:

Generic AI-generated people

Stock-photo-heavy layouts

Fake testimonials

Fake company logos presented as customers

Fake user counters

Fake reviews

Fake statistics

18. Design Do / Don't

Do

Use modern spacing

Use strong typography

Use restrained color

Use real product UI

Use consistent components

Use clear hierarchy

Use subtle interactions

Use real data

Keep all three portals visually connected

Make information easy to scan

Don't

Purple-gradient-heavy SaaS design

Pill-shaped buttons

Pill-shaped navigation

Fake reviews

Fake metrics

Fake customer counters

AI-slop layouts

Generic AI-generated hero people

Excessive animation

Cursor effects

Overuse of cards

Excessive shadows

Random colors

Decorative elements that reduce usability

19. Design Principle

The platform should follow:

Function
   ↓
Hierarchy
   ↓
Clarity
   ↓
Visual Polish
   ↓
Animation

Not:

Animation
   ↓
Gradient
   ↓
Decorations
   ↓
Content

The product should look like a serious modern platform while remaining approachable for students, useful for institutions, and professional for companies.

The Student, College/University, and Company portals should feel like different workspaces inside the same product, not three unrelated websites