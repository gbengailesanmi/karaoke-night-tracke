import { HomePage } from '@/components/HomePage'
import { EventPage } from '@/components/EventPage'
import { useNavigation } from '@/hooks/useNavigation'

function App() {
  const { currentPage, navigateTo, navigateHome, isHome } = useNavigation()

  if (isHome) {
    return <HomePage onNavigateToEvent={navigateTo} />
  }

  return (
    <EventPage 
      eventId={currentPage} 
      onNavigateHome={navigateHome}
    />
  )
}

export default App