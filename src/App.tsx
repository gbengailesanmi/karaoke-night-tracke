import { HomePage } from '@/components/HomePage'
import { EventPage } from '@/components/EventPage'
import { useNavigation } from '@/hooks/useNavigation'
import { Toaster } from '@/components/ui/sonner'

function App() {
  const { currentPage, navigateTo, navigateHome, isHome } = useNavigation()

  return (
    <>
      {isHome ? (
        <HomePage onNavigateToEvent={navigateTo} />
      ) : (
        <EventPage 
          eventId={currentPage} 
          onNavigateHome={navigateHome}
        />
      )}
      <Toaster />
    </>
  )
}

export default App