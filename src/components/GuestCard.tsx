import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { User } from '@phosphor-icons/react'
import { GuestStatus } from '@/types/events'

interface GuestCardProps {
  name: string
  status: GuestStatus
  onStatusChange: (status: GuestStatus) => void
}

const statusConfig = {
  'going': { label: 'Going', variant: 'default' as const, color: 'bg-accent text-accent-foreground' },
  'maybe': { label: 'Maybe', variant: 'secondary' as const, color: 'bg-secondary text-secondary-foreground' },
  'declined': { label: "Can't Make It", variant: 'destructive' as const, color: 'bg-destructive text-destructive-foreground' },
  'no-response': { label: 'No Response', variant: 'outline' as const, color: 'border-border text-muted-foreground' }
}

export function GuestCard({ name, status, onStatusChange }: GuestCardProps) {
  const config = statusConfig[status]

  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-card border transition-colors hover:bg-muted/50">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
          <User className="text-primary" size={20} />
        </div>
        <div>
          <h3 className="font-medium text-foreground">{name}</h3>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <Badge variant={config.variant} className={config.color}>
          {config.label}
        </Badge>
        
        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="going">Going</SelectItem>
            <SelectItem value="maybe">Maybe</SelectItem>
            <SelectItem value="declined">Can't Make It</SelectItem>
            <SelectItem value="no-response">No Response</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}