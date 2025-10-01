# Event Hub - Social Event Tracker

## Core Purpose & Success
- **Mission Statement**: A comprehensive social event management platform that allows users to create, track, and manage multiple types of social gatherings with guest RSVP tracking.
- **Success Indicators**: Users can efficiently manage multiple events, track guest responses, and have clear visibility into event attendance across different event types.
- **Experience Qualities**: Organized, intuitive, and delightful.

## Project Classification & Approach
- **Complexity Level**: Light Application (multiple features with basic state)
- **Primary User Activity**: Acting and Creating - users actively manage events and track guest responses

## Thought Process for Feature Selection
- **Core Problem Analysis**: Social event organizers need a simple way to manage multiple recurring or one-off events with consistent guest tracking across different event types.
- **User Context**: Used weekly/regularly when planning social events, checking RSVPs, and managing different types of gatherings.
- **Critical Path**: Home → Create/Select Event → Manage Guest List → Track RSVPs
- **Key Moments**: 
  1. Creating a new event with appropriate type selection
  2. Updating guest statuses for each event
  3. Getting overview of all events and their status

## Essential Features

### Multi-Event Management
- **What it does**: Users can create and manage multiple events of different types (Karaoke, Trivia, Board Games, Potluck, Movie Night)
- **Why it matters**: Enables organizing different types of social gatherings with appropriate context and theming
- **Success criteria**: Users can easily switch between events and see status for each

### Event Type System
- **What it does**: Predefined event types with distinct visual themes, default venues, and appropriate iconography
- **Why it matters**: Provides context-appropriate UI and reduces setup time with smart defaults
- **Success criteria**: Each event type feels distinct and appropriately themed

### Home Dashboard
- **What it does**: Central hub showing all created events with RSVP summaries and quick navigation
- **Why it matters**: Provides overview of all events and quick access to manage each one
- **Success criteria**: Users can quickly assess status of all events at a glance

### Guest RSVP Tracking
- **What it does**: Per-event guest list management with status tracking (Going, Maybe, Can't Make It, No Response)
- **Why it matters**: Core functionality for event planning and attendance estimation
- **Success criteria**: Easy status updates and clear visual feedback on attendance

### Event Detail Management
- **What it does**: Date, time, and venue management for each event with editing capabilities
- **Why it matters**: Essential event information that guests need
- **Success criteria**: Easy to set and update event details

### AI-Powered Event Enhancement
- **What it does**: LLM integration providing smart event descriptions, attendance insights, follow-up message generation, and event planning assistance
- **Why it matters**: Transforms the app from simple tracking to intelligent event planning assistance, saving time and improving event quality
- **Success criteria**: AI suggestions are helpful, accurate, and enhance the event planning experience

## Design Direction

### Visual Tone & Identity
- **Emotional Response**: Organized, welcoming, and efficient - should feel like a helpful social coordinator
- **Design Personality**: Clean, modern, and approachable with subtle playfulness through color and iconography
- **Visual Metaphors**: Event cards as organized gatherings, status badges as social signals
- **Simplicity Spectrum**: Minimal interface that lets content and actions shine

### Color Strategy
- **Color Scheme Type**: Multi-hued system with event-type specific colors
- **Primary Color**: Warm coral `oklch(0.58 0.15 65)` for main branding and navigation
- **Secondary Colors**: Each event type has its own color identity:
  - Karaoke: Warm coral `oklch(0.58 0.15 65)`
  - Trivia: Purple `oklch(0.65 0.12 280)`
  - Board Games: Green `oklch(0.62 0.14 120)`
  - Potluck: Orange `oklch(0.68 0.13 45)`
  - Movie Night: Deep red `oklch(0.55 0.16 15)`
- **Accent Color**: Bright gold `oklch(0.78 0.12 45)` for "Going" status and positive actions
- **Color Psychology**: Warm, inviting colors that encourage social gathering and positive responses
- **Color Accessibility**: All color combinations meet WCAG AA standards for contrast
- **Foreground/Background Pairings**: 
  - Background `oklch(0.97 0.02 75)` with Foreground `oklch(0.22 0.04 55)` (4.5:1)
  - Primary `oklch(0.58 0.15 65)` with Primary-foreground `oklch(0.97 0.02 75)` (4.5:1)
  - Cards use subtle variations for hierarchy and grouping

### Typography System
- **Font Pairing Strategy**: Single font family (Poppins) with weight variations for hierarchy
- **Typographic Hierarchy**: 
  - Display: 700 weight with tight letter spacing for main headings
  - Heading: 600 weight for section titles
  - Body: 400 weight for content
  - Labels: 500 weight with loose letter spacing for form elements
- **Font Personality**: Clean, friendly, and highly legible sans-serif
- **Readability Focus**: Generous line spacing (1.5) and appropriate sizing for all screen sizes
- **Typography Consistency**: Consistent weight and spacing relationships across components
- **Which fonts**: Poppins from Google Fonts for all text
- **Legibility Check**: Excellent legibility across all sizes and weights

### Visual Hierarchy & Layout
- **Attention Direction**: Event cards draw focus through subtle shadows and hover effects, status badges provide clear visual priority
- **White Space Philosophy**: Generous spacing creates breathing room and focuses attention on key actions
- **Grid System**: Responsive grid that adapts from single column on mobile to 3-column on desktop
- **Responsive Approach**: Mobile-first design with progressive enhancement for larger screens
- **Content Density**: Balanced information density - enough detail to be useful without overwhelming

### Animations
- **Purposeful Meaning**: Subtle hover effects and transitions reinforce interactivity and provide satisfying feedback
- **Hierarchy of Movement**: Card hover effects for navigation, status change animations for feedback
- **Contextual Appropriateness**: Minimal, functional animations that enhance rather than distract

### UI Elements & Component Selection
- **Component Usage**: 
  - Cards for event and content grouping
  - Dialogs for event creation and editing
  - Badges for status representation
  - Select dropdowns for status changes
  - Buttons for primary actions
- **Component Customization**: Event-type specific border colors and accent colors for theming
- **Component States**: Clear hover, active, and focus states for all interactive elements
- **Icon Selection**: Phosphor icons for consistency and clarity
- **Component Hierarchy**: Primary buttons for main actions, secondary for navigation, tertiary for inline actions
- **Spacing System**: Consistent 4px grid using Tailwind's spacing scale
- **Mobile Adaptation**: Single column layouts with appropriately sized touch targets

### Visual Consistency Framework
- **Design System Approach**: Component-based with consistent spacing, colors, and typography
- **Style Guide Elements**: Event type colors, status badge styling, card layouts
- **Visual Rhythm**: Consistent card sizing, spacing, and alignment creates predictable patterns
- **Brand Alignment**: Friendly, organized aesthetic reinforces the social coordination purpose

### Accessibility & Readability
- **Contrast Goal**: WCAG AA compliance achieved for all text and meaningful UI elements
- **Keyboard Navigation**: Full keyboard accessibility with logical tab order
- **Screen Reader Support**: Proper semantic HTML and ARIA labels where needed

## Edge Cases & Problem Scenarios
- **Empty States**: Thoughtful empty state for new users with clear next steps
- **Event Not Found**: Graceful handling when navigating to non-existent events
- **Data Persistence**: All event and RSVP data persists between sessions using useKV
- **Guest List Management**: Fixed guest list ensures consistency across events

## Implementation Considerations
- **Scalability Needs**: Architecture supports unlimited events with efficient storage per event
- **State Management**: Event-specific RSVP tracking with global event list
- **Navigation**: Simple page-based navigation without complex routing
- **Data Structure**: Normalized data storage for efficient updates and queries

## Critical Questions
- Should guest lists be customizable per event or maintain consistency?
- How might we handle recurring events in the future?
- What additional event types might be valuable?

## Reflection
This approach creates a unified system that scales from single events to multiple event types while maintaining the simplicity and focus that made the original karaoke tracker effective. The color-coded event types provide visual organization while the consistent interface patterns ensure users can efficiently manage any type of social gathering.