import { useCallback, useState } from 'react'
import { StoryProvider } from './lib/scrollStory'
import StoryCanvas from './components/StoryCanvas'
import StoryProgressRail from './components/StoryProgressRail'
import Nav from './components/Nav'
import Hero from './components/Hero'
import DocumentReader from './components/DocumentReader'
import Challenge from './components/sections/Challenge'
import Complexity from './components/sections/Complexity'
import Questions from './components/sections/Questions'
import Investigation from './components/sections/Investigation'
import Insight from './components/sections/Insight'
import Strategy from './components/sections/Strategy'
import Execution from './components/sections/Execution'
import Learning from './components/sections/Learning'
import Conclusion from './components/sections/Conclusion'

function App() {
  const [isDocumentOpen, setIsDocumentOpen] = useState(
    () => typeof window !== 'undefined' && window.location.hash === '#document',
  )

  const openDocument = useCallback(() => {
    setIsDocumentOpen(true)
    window.history.replaceState(null, '', '#document')
  }, [])

  const closeDocument = useCallback(() => {
    setIsDocumentOpen(false)
    window.history.replaceState(null, '', window.location.pathname)
  }, [])

  return (
    <StoryProvider>
      <main className="bg-ink relative min-h-screen w-full overflow-x-hidden">
        <StoryCanvas />
        <StoryProgressRail />
        <Nav onOpenDocument={openDocument} />
        <Hero onOpenDocument={openDocument} />
        <Challenge />
        <Complexity />
        <Questions />
        <Investigation />
        <Insight />
        <Strategy />
        <Execution />
        <Learning />
        <Conclusion onOpenDocument={openDocument} />

        <DocumentReader isOpen={isDocumentOpen} onClose={closeDocument} />
      </main>
    </StoryProvider>
  )
}

export default App
