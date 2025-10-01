import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Calendar, MusicNote, Users, Clock } from '@phosphor-icons/react'
import { EventDialog } from '@/components/EventDialog'
import { GuestCard } from '@/components/GuestCard'

const GUESTS = [
  'Liza', 'Gbenga', 'Kamilah', 'Gus', 'Sean', 'Carlos', 
  'Eamon', 'Papa', 'Jason', 'Mo', 'Grant', 'Fay', 
  'David', 'Dave', 'Mihail', 'Saul'
]

type GuestStatus = 'going' | 'maybe' | 'declined' | 'no-response'

interface KaraokeEvent {
  date: string
  time: string
  venue: string
}

function App() {
  const [guestStatuses, setGuestStatuses] = useKV<Record<string, GuestStatus>>('guest-statuses', {})
  const [event, setEvent] = useKV<KaraokeEvent | null>('karaoke-event', null)
  const [showEventDialog, setShowEventDialog] = useState(false)

  const updateGuestStatus = (guestName: string, status: GuestStatus) => {
    setGuestStatuses(current => ({
      ...current,
      [guestName]: status
    }))
  }

  const getStatusCounts = () => {
    const counts = { going: 0, maybe: 0, declined: 0, 'no-response': 0 }
    
    GUESTS.forEach(guest => {
      const status = (guestStatuses && guestStatuses[guest]) || 'no-response'
      counts[status]++
    })
    
    return counts
  }

  const statusCounts = getStatusCounts()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MusicNote className="text-primary" size={40} />
            <h1 className="text-4xl font-display text-primary">Karaoke Night</h1>
          </div>
          <p className="text-muted-foreground text-lg">Track your weekly karaoke crew</p>
        </div>

        {/* Event Info Card */}
        <Card className="mb-8 border-2 border-primary/20">
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
              >
                {event ? 'Edit' : 'Set Event'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {event ? (
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
                  <MusicNote className="text-muted-foreground" size={20} />
                  <span className="font-medium">{event.venue}</span>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground italic">No event scheduled yet. Click "Set Event" to get started!</p>
            )}
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
                    status={(guestStatuses && guestStatuses[guest]) || 'no-response'}
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
          event={event || null}
          onSave={setEvent}
        />
      </div>
    </div>
  )
}

export default App