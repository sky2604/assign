import { useCallback, useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import DocumentReader from './components/DocumentReader'
import Challenge from './components/sections/Challenge'
import WhyHard from './components/sections/WhyHard'
import OrchestrationComplexity from './components/sections/OrchestrationComplexity'
import Questions from './components/sections/Questions'
import KnowDontKnow from './components/sections/KnowDontKnow'
import Investigation from './components/sections/Investigation'
import Insight from './components/sections/Insight'
import Strategy from './components/sections/Strategy'
import NotDoing from './components/sections/NotDoing'
import CausalChain from './components/sections/CausalChain'
import CategoryQuestion from './components/sections/CategoryQuestion'
import Outcomes from './components/sections/Outcomes'
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
    <main className="bg-ink min-h-screen w-full overflow-x-hidden">
      <Nav onOpenDocument={openDocument} />
      <Hero onOpenDocument={openDocument} />
      <Challenge />
      <WhyHard />
      <OrchestrationComplexity />
      <Questions />
      <KnowDontKnow />
      <Investigation />
      <Insight />
      <Strategy />
      <NotDoing />
      <CausalChain />
      <CategoryQuestion />
      <Outcomes />
      <Conclusion onOpenDocument={openDocument} />

      <DocumentReader isOpen={isDocumentOpen} onClose={closeDocument} />
    </main>
  )
}

export default App
