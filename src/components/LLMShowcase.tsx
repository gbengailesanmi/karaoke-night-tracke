import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sparkle, Brain, ChatCircle, TrendUp, Calendar, Users, Lightbulb } from '@phosphor-icons/react'

export function LLMShowcase() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null)

  const features = [
    {
      id: 'description',
      title: 'Smart Event Descriptions',
      icon: Sparkle,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      description: 'AI generates engaging, compelling event descriptions that make people excited to attend',
      example: {
        input: 'Karaoke Night - Friday 7pm at Lucky Strike',
        output: 'Join us for an unforgettable evening of music, laughter, and friendly competition! Belt out your favorite tunes in a welcoming atmosphere where everyone\'s a star. Whether you\'re a shower singer or a stage veteran, come ready to cheer on friends and maybe surprise yourself with a performance!'
      }
    },
    {
      id: 'insights',
      title: 'Attendance Analytics',
      icon: TrendUp,
      color: 'bg-green-50 text-green-600 border-green-200',
      description: 'AI analyzes RSVP patterns and provides actionable insights to improve turnout',
      example: {
        input: 'Going: 8, Maybe: 3, Declined: 2, No Response: 3',
        output: 'Strong core attendance! Your karaoke nights consistently attract 75% participation. The 3 "maybe" responses suggest interest but scheduling conflicts. Consider reaching out with flexible timing options. Your Friday evening slot works well for this group - consider making it a regular recurring event.'
      }
    },
    {
      id: 'messages',
      title: 'Follow-up Messages',
      icon: ChatCircle,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      description: 'Generate personalized, friendly reminder messages for different guest statuses',
      example: {
        input: 'Karaoke Night this Friday, people who said maybe: Gus, Sean, Fay',
        output: 'Hey Gus! Just wanted to follow up about karaoke night this Friday. I know you said maybe - no pressure at all, but we\'d love to have you there if your schedule works out! The vibe is always super chill and it\'s a great way to unwind after the week. Let me know! 🎤'
      }
    },
    {
      id: 'suggestions',
      title: 'Event Enhancement Ideas',
      icon: Lightbulb,
      color: 'bg-yellow-50 text-yellow-600 border-yellow-200',
      description: 'AI suggests creative ways to improve events based on group dynamics and preferences',
      example: {
        input: 'Board Game Night - regular attendees, looking for variety',
        output: '1. Theme nights: "Retro Games Evening" or "Strategy Game Tournament"\n2. Potluck element: Ask everyone to bring a favorite snack\n3. Mini-tournaments with fun prizes (like "Most Creative Strategy")\n4. Introduce cooperative games to mix up the competitive dynamic\n5. Create a "Game of the Month" voting system for future events'
      }
    },
    {
      id: 'planning',
      title: 'Smart Planning Assistant',
      icon: Brain,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
      description: 'AI helps with logistics, menu planning, activity suggestions, and more',
      example: {
        input: 'Movie night for 12 people, need snack suggestions, budget-friendly',
        output: 'Perfect movie night snacks for 12 people:\n\n🍿 Popcorn Bar: 3 flavors (butter, caramel, cheese) - $15\n🥤 Drinks: Assorted sodas + water - $20\n🍕 Easy Dinner: 3 large pizzas (variety) - $45\n🍫 Sweet Treats: Movie theater candy assortment - $25\n\nTotal: ~$105 ($9/person)\n\nPro tip: Ask 2-3 people to each bring one item to make it more collaborative and affordable!'
      }
    },
    {
      id: 'memory',
      title: 'Event Memory & Stories',
      icon: Calendar,
      color: 'bg-pink-50 text-pink-600 border-pink-200',
      description: 'AI creates memorable summaries and stories from your events',
      example: {
        input: 'Trivia Night recap - Team "Quiz in My Pants" won, Grant knew all the 90s music, pizza was a hit',
        output: 'What a night at Quiz Central! Team "Quiz in My Pants" lived up to their cheeky name, dominating the competition with Grant\'s encyclopedic 90s music knowledge being the secret weapon. The pizza disappeared faster than answers in the lightning round, and despite some heated debates over "Is a hot dog a sandwich?" (it\'s not, fight us), everyone agreed this was one for the books. Next time, we\'re coming for that trivia crown! 🏆'
      }
    }
  ]

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-display text-primary">AI-Powered Event Features</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          See how Large Language Models can transform your event planning from simple tracking 
          to an intelligent assistant that learns, suggests, and enhances every aspect of your social gatherings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature) => {
          const Icon = feature.icon
          const isActive = activeDemo === feature.id
          
          return (
            <Card 
              key={feature.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                isActive ? 'ring-2 ring-primary shadow-lg' : ''
              }`}
              onClick={() => setActiveDemo(isActive ? null : feature.id)}
            >
              <CardHeader className="pb-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${feature.color}`}>
                  <Icon size={24} />
                </div>
                <CardTitle className="text-lg font-heading">{feature.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardHeader>
              <CardContent className="pt-0">
                <Button 
                  variant={isActive ? "default" : "outline"} 
                  size="sm" 
                  className="w-full"
                >
                  {isActive ? 'Hide Example' : 'See Example'}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {activeDemo && (
        <Card className="border-2 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="default">Live Example</Badge>
              {features.find(f => f.id === activeDemo)?.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Input:</h4>
              <div className="bg-muted/50 p-3 rounded-md text-sm">
                {features.find(f => f.id === activeDemo)?.example.input}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">AI Generated Output:</h4>
              <div className="bg-background border p-4 rounded-md text-sm whitespace-pre-line">
                {features.find(f => f.id === activeDemo)?.example.output}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="text-primary" size={24} />
            <h3 className="text-xl font-heading">Why This Matters</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-medium mb-2 text-primary">For Organizers</h4>
              <p className="text-muted-foreground">Save hours of planning time, reduce no-shows, and get data-driven insights to improve every event.</p>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-primary">For Guests</h4>
              <p className="text-muted-foreground">Receive thoughtful, personalized communication and enjoy better-planned events tailored to the group.</p>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-primary">For Everyone</h4>
              <p className="text-muted-foreground">Stronger social bonds through memorable experiences and reduced planning stress for everyone involved.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}