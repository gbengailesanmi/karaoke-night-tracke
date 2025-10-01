import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Calendar, MusicNote, Users, Clock, MapPin, PencilSimple } from '@phosphor-icons/react'
import { EventDialog } from '@/components/EventDialog'
import { GuestCard } from '@/components/GuestCard'
import { Event, EVENT_TYPES, GuestStatus } from '@/types/events'

const GUESTS = [
  'Liza', 'Gbenga', 'Kamilah', 'Gus', 'Sean', 'Carlos', 
  'Eamon', 'Papa', 'Jason', 'Mo', 'Grant', 'Fay', 
  'David', 'Dave', 'Mihail', 'Saul'
]

interface EventPageProps {
  eventId: string
  onNavigateHome: () => void
}

interface KaraokeEvent {
  date: string
  time: string
  venue: string
}

export function EventPage({ eventId, onNavigateHome }: EventPageProps) {
  const [events, setEvents] = useKV<Event[]>('all-events', [])
  const [guestStatuses, setGuestStatuses] = useKV<Record<string, Record<string, GuestStatus>>>('guest-statuses-by-event', {})
  const [showEventDialog, setShowEventDialog] = useState(false)

  const event = (events || []).find(e => e.id === eventId)
  const eventStatuses = (guestStatuses && guestStatuses[eventId]) || {}
  
  if (!event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <CardContent>
            <h2 className="text-2xl font-heading mb-4">Event Not Found</h2>
            <p className="text-muted-foreground mb-4">The event you're looking for doesn't exist.</p>
            <Button onClick={onNavigateHome}>
              <ArrowLeft className="mr-2" size={16} />
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const eventType = EVENT_TYPES.find(type => type.id === event.id.split('-')[0])
  
  const updateGuestStatus = (guestName: string, status: GuestStatus) => {
    setGuestStatuses(current => ({
      ...(current || {}),
      [eventId]: {
        ...((current && current[eventId]) || {}),
        [guestName]: status
      }
    }))
  }

  const updateEvent = (updatedEventData: KaraokeEvent) => {
    setEvents(current => 
      (current || []).map(e => 
        e.id === eventId 
          ? { ...e, date: updatedEventData.date, time: updatedEventData.time, venue: updatedEventData.venue }
          : e
      )
    )
  }

  const getStatusCounts = () => {
    const counts = { going: 0, maybe: 0, declined: 0, 'no-response': 0 }
    
    GUESTS.forEach(guest => {
      const status = eventStatuses[guest] || 'no-response'
      counts[status]++
    })
    
    return counts
  }

  const statusCounts = getStatusCounts()

  const getIconComponent = (iconName: string) => {
    const icons = {
      MusicNote: MusicNote,
      Brain: Users,
      GameController: Users,
      ForkKnife: Users,
      FilmStrip: Users
    }
    return icons[iconName as keyof typeof icons] || MusicNote
  }

  const IconComponent = getIconComponent(eventType?.icon || 'MusicNote')

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onNavigateHome}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Home
          </Button>
          <div className="flex-1 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: (eventType?.color || 'oklch(0.58 0.15 65)') + '20' }}
              >
                <IconComponent 
                  size={32} 
                  style={{ color: eventType?.color || 'oklch(0.58 0.15 65)' }}
                />
              </div>
              <h1 className="text-3xl font-display text-primary">{event.name}</h1>
            </div>
            <p className="text-muted-foreground">{event.description}</p>
          </div>
        </div>

        {/* Event Info Card */}
        <Card className="mb-8 border-2" style={{ borderColor: (eventType?.color || 'oklch(0.58 0.15 65)') + '40' }}>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-xl font-heading">
                <Calendar className="text-primary" size={24} />
                Event Details
              </CardTitle>
              <Button 
                onClick={() => setShowEventDialog(true)}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <PencilSimple size={16} />
                Edit
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="text-muted-foreground" size={20} />
                <span className="font-medium">{event.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="text-muted-foreground" size={20} />
                <span className="font-medium">{event.time}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-muted-foreground" size={20} />
                <span className="font-medium">{event.venue}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-heading">
              <Users className="text-primary" size={24} />
              RSVP Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{statusCounts.going}</div>
                <Badge variant="default" className="bg-accent text-accent-foreground">Going</Badge>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">{statusCounts.maybe}</div>
                <Badge variant="secondary">Maybe</Badge>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-destructive">{statusCounts.declined}</div>
                <Badge variant="destructive">Can't Make It</Badge>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-muted-foreground">{statusCounts['no-response']}</div>
                <Badge variant="outline">No Response</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Guest List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-heading">Guest List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {GUESTS.map((guest, index) => (
                <div key={guest}>
                  <GuestCard 
                    name={guest}
                    status={eventStatuses[guest] || 'no-response'}
                    onStatusChange={(status) => updateGuestStatus(guest, status)}
                  />
                  {index < GUESTS.length - 1 && <Separator className="my-3" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <EventDialog 
          open={showEventDialog}
          onOpenChange={setShowEventDialog}
          event={{
            date: event.date,
            time: event.time,
            venue: event.venue
          }}
          onSave={updateEvent}
        />
      </div>
    </div>
  )
}