import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Sparkle, ChatCircle, CalendarPlus, Users, Envelope, TrendUp } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'
import { Event, GuestStatus } from '@/types/events'
import { toast } from 'sonner'

interface LLMFeaturesProps {
  currentEvent: Event
  guestStatuses: Record<string, GuestStatus>
  onUpdateEvent?: (updates: Partial<Event>) => void
}

const GUESTS = [
  'Liza', 'Gbenga', 'Kamilah', 'Gus', 'Sean', 'Carlos', 
  'Eamon', 'Papa', 'Jason', 'Mo', 'Grant', 'Fay', 
  'David', 'Dave', 'Mihail', 'Saul'
]

export function LLMFeatures({ currentEvent, guestStatuses, onUpdateEvent }: LLMFeaturesProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [customPrompt, setCustomPrompt] = useState('')
  const [generatedContent, setGeneratedContent] = useState('')
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)

  // Get attendance data for context
  const getAttendanceData = () => {
    const counts = { going: 0, maybe: 0, declined: 0, 'no-response': 0 }
    const attendees: string[] = []
    const maybes: string[] = []
    const declined: string[] = []
    const noResponse: string[] = []

    GUESTS.forEach(guest => {
      const status = guestStatuses[guest] || 'no-response'
      counts[status]++
      
      switch (status) {
        case 'going':
          attendees.push(guest)
          break
        case 'maybe':
          maybes.push(guest)
          break
        case 'declined':
          declined.push(guest)
          break
        default:
          noResponse.push(guest)
      }
    })

    return { counts, attendees, maybes, declined, noResponse }
  }

  const generateContent = async (featureType: string) => {
    setIsGenerating(true)
    setSelectedFeature(featureType)
    
    try {
      const attendanceData = getAttendanceData()
      let prompt: string

      switch (featureType) {
        case 'event-description':
          prompt = (window as any).spark.llmPrompt`You are helping create an engaging event description. 

Event Details:
- Name: ${currentEvent.name}
- Date: ${currentEvent.date}
- Time: ${currentEvent.time}
- Venue: ${currentEvent.venue}
- Current Description: ${currentEvent.description}

Create a fun, engaging description for this event that would make people excited to attend. Keep it concise but enthusiastic. Include what people can expect and why it will be fun.`
          break

        case 'attendance-insights':
          prompt = (window as any).spark.llmPrompt`Analyze this event attendance data and provide insights:

Event: ${currentEvent.name}
Date: ${currentEvent.date}
Total Invited: ${GUESTS.length}
Going: ${attendanceData.counts.going} (${attendanceData.attendees.join(', ')})
Maybe: ${attendanceData.counts.maybe} (${attendanceData.maybes.join(', ')})
Declined: ${attendanceData.counts.declined} (${attendanceData.declined.join(', ')})
No Response: ${attendanceData.counts['no-response']} (${attendanceData.noResponse.join(', ')})

Provide a brief analysis of the attendance patterns and suggestions for improving turnout.`
          break

        case 'follow-up-messages':
          prompt = (window as any).spark.llmPrompt`Generate friendly follow-up messages for different guest response statuses:

Event: ${currentEvent.name}
Date: ${currentEvent.date}
Time: ${currentEvent.time}
Venue: ${currentEvent.venue}

People who haven't responded: ${attendanceData.noResponse.join(', ')}
People who said maybe: ${attendanceData.maybes.join(', ')}

Create 2-3 different casual, friendly message templates to encourage attendance. Keep them personal but not pushy.`
          break

        case 'event-suggestions':
          prompt = (window as any).spark.llmPrompt`Based on this group's preferences and past events, suggest variations or improvements:

Current Event: ${currentEvent.name}
Venue: ${currentEvent.venue}
Attendance: ${attendanceData.counts.going} confirmed, ${attendanceData.counts.maybe} maybe

Regular attendees: ${attendanceData.attendees.join(', ')}

Suggest 3-4 creative ideas to make this event more engaging or alternative event ideas this group might enjoy.`
          break

        case 'custom':
          if (!customPrompt.trim()) {
            toast.error('Please enter a custom prompt')
            return
          }
          prompt = (window as any).spark.llmPrompt`You are helping with event planning and management.

Event Context:
- Event: ${currentEvent.name}
- Date: ${currentEvent.date}
- Venue: ${currentEvent.venue}
- Invited Guests: ${GUESTS.join(', ')}
- Attendance Status: ${attendanceData.counts.going} going, ${attendanceData.counts.maybe} maybe, ${attendanceData.counts.declined} declined

User Request: ${customPrompt}`
          break

        default:
          throw new Error('Unknown feature type')
      }

      const result = await (window as any).spark.llm(prompt)
      setGeneratedContent(result)
      toast.success('Content generated successfully!')

    } catch (error) {
      console.error('Error generating content:', error)
      toast.error('Failed to generate content')
    } finally {
      setIsGenerating(false)
    }
  }

  const applyToEventDescription = () => {
    if (onUpdateEvent && generatedContent) {
      onUpdateEvent({ description: generatedContent })
      toast.success('Event description updated!')
    }
  }

  const features = [
    {
      id: 'event-description',
      title: 'Generate Event Description',
      description: 'Create an engaging description for your event',
      icon: CalendarPlus,
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      id: 'attendance-insights',
      title: 'Attendance Analysis',
      description: 'Get insights on current RSVP patterns',
      icon: TrendUp,
      color: 'bg-green-50 text-green-600 border-green-200'
    },
    {
      id: 'follow-up-messages',
      title: 'Follow-up Messages',
      description: 'Generate personalized reminder messages',
      icon: ChatCircle,
      color: 'bg-purple-50 text-purple-600 border-purple-200'
    },
    {
      id: 'event-suggestions',
      title: 'Event Ideas',
      description: 'Get suggestions to improve or vary your events',
      icon: Sparkle,
      color: 'bg-yellow-50 text-yellow-600 border-yellow-200'
    }
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkle className="w-5 h-5 text-primary" />
            AI-Powered Event Tools
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Button
                  key={feature.id}
                  variant="outline"
                  className={`h-auto p-4 justify-start ${feature.color}`}
                  onClick={() => generateContent(feature.id)}
                  disabled={isGenerating}
                >
                  <div className="flex items-start gap-3 text-left">
                    <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">{feature.title}</div>
                      <div className="text-sm opacity-70">{feature.description}</div>
                    </div>
                  </div>
                </Button>
              )
            })}
          </div>

          <div className="border-t pt-4">
            <div className="space-y-3">
              <label className="text-sm font-medium">Custom AI Request</label>
              <Textarea
                placeholder="Ask the AI anything about your event planning... (e.g., 'Suggest food options for this group' or 'Help me plan activities for this event')"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                className="min-h-[80px]"
              />
              <Button
                onClick={() => generateContent('custom')}
                disabled={isGenerating || !customPrompt.trim()}
                className="w-full"
              >
                <Sparkle className="w-4 h-4 mr-2" />
                Generate Custom Response
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {generatedContent && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Generated Content</span>
              {selectedFeature === 'event-description' && onUpdateEvent && (
                <Button size="sm" onClick={applyToEventDescription}>
                  Apply to Event
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/50 p-4 rounded-lg">
              <pre className="whitespace-pre-wrap text-sm">{generatedContent}</pre>
            </div>
          </CardContent>
        </Card>
      )}

      {isGenerating && (
        <Card>
          <CardContent className="flex items-center justify-center p-8">
            <div className="flex items-center gap-3">
              <div className="animate-spin w-5 h-5 border-2 border-primary border-t-transparent rounded-full" />
              <span className="text-muted-foreground">Generating content...</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}