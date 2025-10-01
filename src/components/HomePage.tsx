import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Calendar, MapPin, Clock, Users } from '@phosphor-icons/react'
import { EVENT_TYPES, Event, GuestStatus } from '@/types/events'
import { CreateEventDialog } from '@/components/CreateEventDialog'
import { useState } from 'react'

const GUESTS = [
  'Liza', 'Gbenga', 'Kamilah', 'Gus', 'Sean', 'Carlos', 
  'Eamon', 'Papa', 'Jason', 'Mo', 'Grant', 'Fay', 
  'David', 'Dave', 'Mihail', 'Saul'
]

interface HomePageProps {
  onNavigateToEvent: (eventId: string) => void
}

export function HomePage({ onNavigateToEvent }: HomePageProps) {
  const [events, setEvents] = useKV<Event[]>('all-events', [])
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [guestStatuses] = useKV<Record<string, Record<string, GuestStatus>>>('guest-statuses-by-event', {})

  const getStatusCounts = (eventId: string) => {
    const eventStatuses = (guestStatuses && guestStatuses[eventId]) || {}
    const counts = { going: 0, maybe: 0, declined: 0, 'no-response': 0 }
    
    GUESTS.forEach(guest => {
      const status = eventStatuses[guest] || 'no-response'
      counts[status]++
    })
    
    return counts
  }

  const createEvent = (event: Event) => {
    setEvents(current => (current || []).concat(event))
  }

  const getEventTypeConfig = (typeId: string) => {
    return EVENT_TYPES.find(type => type.id === typeId) || EVENT_TYPES[0]
  }

  const getIconComponent = (iconName: string) => {
    const icons = {
      MusicNote: Calendar,
      Brain: Calendar,
      GameController: Calendar,
      ForkKnife: Calendar,
      FilmStrip: Calendar
    }
    return icons[iconName as keyof typeof icons] || Calendar
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="text-primary" size={40} />
            <h1 className="text-4xl font-display text-primary">Event Hub</h1>
          </div>
          <p className="text-muted-foreground text-lg">Manage all your social events in one place</p>
        </div>

        {/* Create Event Button */}
        <div className="flex justify-center mb-8">
          <Button 
            onClick={() => setShowCreateDialog(true)}
            className="flex items-center gap-2 px-6 py-3 text-lg"
            size="lg"
          >
            <Plus size={20} />
            Create New Event
          </Button>
        </div>

        {/* Events Grid */}
        {!events || events.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Calendar className="mx-auto mb-4 text-muted-foreground" size={48} />
              <h3 className="text-xl font-heading mb-2">No Events Yet</h3>
              <p className="text-muted-foreground mb-4">Create your first event to get started!</p>
              <Button onClick={() => setShowCreateDialog(true)}>
                <Plus className="mr-2" size={16} />
                Create Event
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(events || []).map((event) => {
              const typeConfig = getEventTypeConfig(event.id.split('-')[0])
              const IconComponent = getIconComponent(typeConfig.icon)
              const statusCounts = getStatusCounts(event.id)
              
              return (
                <Card 
                  key={event.id} 
                  className="overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer border-2"
                  style={{ borderColor: typeConfig.color + '40' }}
                  onClick={() => onNavigateToEvent(event.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-2">
                      <div 
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: typeConfig.color + '20' }}
                      >
                        <IconComponent 
                          size={24} 
                          style={{ color: typeConfig.color }}
                        />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg font-heading">{event.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{typeConfig.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Event Details */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="text-muted-foreground" size={16} />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="text-muted-foreground" size={16} />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="text-muted-foreground" size={16} />
                        <span>{event.venue}</span>
                      </div>
                    </div>

                    {/* RSVP Summary */}
                    <div className="pt-3 border-t">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">RSVPs</span>
                        <span className="text-sm text-muted-foreground">
                          {statusCounts.going + statusCounts.maybe}/{GUESTS.length}
                        </span>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {statusCounts.going > 0 && (
                          <Badge variant="default" className="bg-accent text-accent-foreground text-xs">
                            {statusCounts.going} Going
                          </Badge>
                        )}
                        {statusCounts.maybe > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            {statusCounts.maybe} Maybe
                          </Badge>
                        )}
                        {statusCounts.declined > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {statusCounts.declined} Can't Make It
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        <CreateEventDialog 
          open={showCreateDialog}
          onOpenChange={setShowCreateDialog}
          onCreateEvent={createEvent}
        />
      </div>
    </div>
  )
}