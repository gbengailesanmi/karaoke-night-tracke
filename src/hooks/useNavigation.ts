import { useState } from 'react'

type Page = 'home' | string

export function useNavigation() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  
  const navigateTo = (page: Page) => {
    setCurrentPage(page)
  }
  
  const navigateHome = () => {
    setCurrentPage('home')
  }
  
  return {
    currentPage,
    navigateTo,
    navigateHome,
    isHome: currentPage === 'home'
  }
}