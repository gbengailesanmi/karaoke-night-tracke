# Karaoke Night Tracker

A centralized app for organizing weekly karaoke nights and tracking guest attendance status in real-time.

**Experience Qualities**:
1. **Social** - Creates excitement and anticipation around gathering friends for karaoke
2. **Organized** - Provides clear visibility into who's coming and event logistics  
3. **Festive** - Captures the fun, celebratory spirit of karaoke nights

**Complexity Level**: Light Application (multiple features with basic state)
- Manages guest lists, attendance tracking, and event scheduling with persistent data storage

## Essential Features

**Guest Status Management**
- Functionality: Track RSVP status (Going, Maybe, Can't Make It, No Response) for each invited guest
- Purpose: Provides host with clear headcount and planning visibility
- Trigger: Host updates guest status or guests self-update if sharing capability added later
- Progression: View guest list → Select guest → Update status → See updated count
- Success criteria: All 16 guests display with current status, counts update immediately

**Weekly Event Planning**
- Functionality: Set date, time, and location for upcoming karaoke night
- Purpose: Centralizes event details and creates anticipation
- Trigger: Host creates or updates event details
- Progression: Access event settings → Input date/time/venue → Save → Display on main view
- Success criteria: Event details persist and display prominently

**Quick Status Overview**
- Functionality: Dashboard showing attendance counts and guest breakdown
- Purpose: Instant visibility into event planning status
- Trigger: App load or status updates
- Progression: Open app → See attendance summary → Identify any follow-ups needed
- Success criteria: Real-time counts for Going/Maybe/Can't Make It categories

## Edge Case Handling

- **No Event Set**: Display placeholder encouraging event creation
- **All Guests Declined**: Show encouraging message with suggestions
- **Incomplete Responses**: Highlight guests who haven't responded yet
- **Past Event Dates**: Warn when event date has passed

## Design Direction

The design should feel festive and social with a touch of retro flair reminiscent of classic karaoke venues - warm, inviting, and energetic without being overwhelming.

## Color Selection

Triadic color scheme using warm, vibrant colors that evoke the fun atmosphere of karaoke nights.

- **Primary Color**: Deep Purple (oklch(0.45 0.15 300)) - main brand color communicating sophistication and nightlife
- **Secondary Colors**: Warm coral (oklch(0.7 0.12 25)) for positive actions and golden yellow (oklch(0.8 0.1 85)) for highlights
- **Accent Color**: Electric teal (oklch(0.65 0.15 200)) for CTAs and important status indicators
- **Foreground/Background Pairings**: 
  - Background (White oklch(1 0 0)): Dark text (oklch(0.2 0 0)) - Ratio 10.4:1 ✓
  - Primary (Deep Purple oklch(0.45 0.15 300)): White text (oklch(1 0 0)) - Ratio 4.8:1 ✓
  - Accent (Electric Teal oklch(0.65 0.15 200)): White text (oklch(1 0 0)) - Ratio 4.1:1 ✓

## Font Selection

Typography should be friendly and approachable with good readability - Inter for its clean versatility with playful weight variations for hierarchy.

- **Typographic Hierarchy**: 
  - H1 (App Title): Inter Bold/32px/tight letter spacing
  - H2 (Event Title): Inter Semibold/24px/normal spacing  
  - H3 (Section Headers): Inter Medium/18px/normal spacing
  - Body (Guest Names): Inter Regular/16px/relaxed spacing
  - Labels (Status/Counts): Inter Medium/14px/wide spacing

## Animations

Subtle celebrations and status transitions that add energy without distraction - micro-interactions that reinforce the social, festive nature.

- **Purposeful Meaning**: Status changes trigger gentle color transitions and small scale animations to celebrate responses
- **Hierarchy of Movement**: Guest status updates get primary animation focus, with secondary motion for count updates

## Component Selection

- **Components**: Cards for guest list items, Badges for status indicators, Select dropdowns for status changes, Button for primary actions, Separator for visual organization
- **Customizations**: Custom status badges with karaoke-themed colors, festive button hover states
- **States**: Status buttons show clear visual feedback, hover states use warm color shifts, selected states use accent colors
- **Icon Selection**: Music note icons, user icons for guests, calendar for event planning, checkmark for confirmed status
- **Spacing**: Consistent 16px base spacing with 24px section gaps, 8px internal card padding
- **Mobile**: Single column layout with full-width guest cards, collapsible event details, touch-friendly status selectors