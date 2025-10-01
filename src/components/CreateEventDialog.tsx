import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { EVENT_TYPES, Event } from '@/types/events'

interface CreateEventDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateEvent: (event: Event) => void
}

export function CreateEventDialog({ open, onOpenChange, onCreateEvent }: CreateEventDialogProps) {
  const [selectedType, setSelectedType] = useState<string>('')
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    venue: ''
  })

  const handleTypeSelect = (typeId: string) => {
    const eventType = EVENT_TYPES.find(type => type.id === typeId)
    if (eventType) {
      setSelectedType(typeId)
      setFormData(prev => ({
        ...prev,
        name: eventType.name,
        venue: eventType.defaultVenue || prev.venue
      }))
    }
  }

  const handleSave = () => {
    if (selectedType && formData.name && formData.date && formData.time && formData.venue) {
      const event: Event = {
        id: `${selectedType}-${Date.now()}`,
        name: formData.name,
        description: EVENT_TYPES.find(type => type.id === selectedType)?.description || '',
        icon: EVENT_TYPES.find(type => type.id === selectedType)?.icon || 'Calendar',
        date: formData.date,
        time: formData.time,
        venue: formData.venue,
        color: EVENT_TYPES.find(type => type.id === selectedType)?.color || 'oklch(0.58 0.15 65)'
      }
      
      onCreateEvent(event)
      onOpenChange(false)
      
      // Reset form
      setSelectedType('')
      setFormData({ name: '', date: '', time: '', venue: '' })
    }
  }

  const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }))
  }

  const selectedEventType = EVENT_TYPES.find(type => type.id === selectedType)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-heading">Create New Event</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Event Type Selection */}
          <div className="space-y-3">
            <Label>Event Type</Label>
            <div className="grid grid-cols-1 gap-3">
              {EVENT_TYPES.map((eventType) => (
                <Card 
                  key={eventType.id}
                  className={`cursor-pointer transition-all hover:scale-[1.02] ${
                    selectedType === eventType.id 
                      ? 'ring-2 ring-primary border-primary' 
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => handleTypeSelect(eventType.id)}
                >
                  <CardContent className="flex items-center gap-3 p-4">
                    <div 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: eventType.color + '20' }}
                    >
                      <div 
                        className="w-5 h-5 rounded"
                        style={{ backgroundColor: eventType.color }}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{eventType.name}</h4>
                      <p className="text-sm text-muted-foreground">{eventType.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Event Details Form */}
          {selectedType && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="event-name">Event Name</Label>
                <Input
                  id="event-name"
                  value={formData.name}
                  onChange={handleChange('name')}
                  placeholder="Enter event name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="event-date">Date</Label>
                <Input
                  id="event-date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange('date')}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="event-time">Time</Label>
                <Input
                  id="event-time"
                  type="time"
                  value={formData.time}
                  onChange={handleChange('time')}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="event-venue">Venue</Label>
                <Input
                  id="event-venue"
                  value={formData.venue}
                  onChange={handleChange('venue')}
                  placeholder="Enter venue name"
                />
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!selectedType || !formData.name || !formData.date || !formData.time || !formData.venue}
            className="bg-primary hover:bg-primary/90"
          >
            Create Event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}