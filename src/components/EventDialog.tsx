import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface KaraokeEvent {
  date: string
  time: string
  venue: string
}

interface EventDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  event: KaraokeEvent | null
  onSave: (event: KaraokeEvent) => void
}

export function EventDialog({ open, onOpenChange, event, onSave }: EventDialogProps) {
  const [formData, setFormData] = useState({
    date: event?.date || '',
    time: event?.time || '',
    venue: event?.venue || ''
  })

  const handleSave = () => {
    if (formData.date && formData.time && formData.venue) {
      onSave(formData)
      onOpenChange(false)
    }
  }

  const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-heading">
            {event ? 'Edit Event Details' : 'Set Event Details'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={handleChange('date')}
              placeholder="Select date"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              type="time"
              value={formData.time}
              onChange={handleChange('time')}
              placeholder="Select time"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="venue">Venue</Label>
            <Input
              id="venue"
              value={formData.venue}
              onChange={handleChange('venue')}
              placeholder="Enter venue name"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!formData.date || !formData.time || !formData.venue}
            className="bg-primary hover:bg-primary/90"
          >
            Save Event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}