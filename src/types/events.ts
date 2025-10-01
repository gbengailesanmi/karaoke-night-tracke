export type GuestStatus = 'going' | 'maybe' | 'declined' | 'no-response'

export interface Event {
  id: string
  name: string
  description: string
  icon: string
  date: string
  time: string
  venue: string
  color: string
}

export interface EventType {
  id: string
  name: string
  description: string
  icon: string
  color: string
  defaultVenue?: string
}

export const EVENT_TYPES: EventType[] = [
  {
    id: 'karaoke',
    name: 'Karaoke Night',
    description: 'Sing your heart out with friends',
    icon: 'MusicNote',
    color: 'oklch(0.58 0.15 65)',
    defaultVenue: 'Lucky Strike'
  },
  {
    id: 'trivia',
    name: 'Trivia Night',
    description: 'Test your knowledge and compete',
    icon: 'Brain',
    color: 'oklch(0.65 0.12 280)',
    defaultVenue: 'The Pub Quiz'
  },
  {
    id: 'game-night',
    name: 'Board Game Night',
    description: 'Classic games and good times',
    icon: 'GameController',
    color: 'oklch(0.62 0.14 120)',
    defaultVenue: 'Community Center'
  },
  {
    id: 'potluck',
    name: 'Potluck Dinner',
    description: 'Share food and stories together',
    icon: 'ForkKnife',
    color: 'oklch(0.68 0.13 45)',
    defaultVenue: 'Sarah\'s House'
  },
  {
    id: 'movie-night',
    name: 'Movie Night',
    description: 'Popcorn, movies, and chill vibes',
    icon: 'FilmStrip',
    color: 'oklch(0.55 0.16 15)',
    defaultVenue: 'Mike\'s Living Room'
  }
]