import { useEffect, useMemo, useRef, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { fullDocumentMarkdown } from '../data/fullDocument'
import { meta } from '../data/content'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { EASE_OUT_EXPO } from '../lib/motion'

/**
 * Minimal, purpose-built markdown renderer for the one document this reader
 * displays. The source file is authored one logical block per line, so this
 * intentionally does not attempt to be a general CommonMark parser.
 */
function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const parts: ReactNode[] = []
  const regex = /\*\*(.+?)\*\*|\*(.+?)\*/g
  let lastIndex = 0
  let match: RegExpExecArray | null
  let i = 0

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index))
    if (match[1] !== undefined) {
      parts.push(
        <strong key={`${keyPrefix}-b-${i}`} className="font-semibold text-white">
          {match[1]}
        </strong>,
      )
    } else if (match[2] !== undefined) {
      parts.push(
        <em key={`${keyPrefix}-i-${i}`} className="text-violet-100/90">
          {match[2]}
        </em>,
      )
    }
    lastIndex = regex.lastIndex
    i += 1
  }

  if (lastIndex < text.length) parts.push(text.slice(lastIndex))
  return parts
}

function parseMarkdown(markdown: string): ReactNode[] {
  const lines = markdown.split('\n')
  const blocks: ReactNode[] = []
  let listBuffer: { type: 'ul' | 'ol'; items: string[] } | null = null
  let blockIndex = 0

  function flushList() {
    if (!listBuffer) return
    const ListTag = listBuffer.type
    blocks.push(
      <ListTag
        key={`list-${blockIndex++}`}
        className={
          ListTag === 'ul'
            ? 'my-4 list-disc space-y-2 pl-5 marker:text-violet-400/70'
            : 'my-4 list-decimal space-y-2 pl-5 marker:text-violet-400/70'
        }
      >
        {listBuffer.items.map((item, i) => (
          <li key={i} className="text-[15px] leading-relaxed text-violet-50/85">
            {renderInline(item, `li-${blockIndex}-${i}`)}
          </li>
        ))}
      </ListTag>,
    )
    listBuffer = null
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()

    if (line.length === 0) continue

    if (line === '---') {
      flushList()
      blocks.push(<hr key={`hr-${blockIndex++}`} className="my-10 border-white/10" />)
      continue
    }

    if (line.startsWith('### ')) {
      flushList()
      blocks.push(
        <h3 key={`h3-${blockIndex++}`} className="mt-10 mb-3 text-lg font-semibold text-white sm:text-xl">
          {renderInline(line.slice(4), `h3-${blockIndex}`)}
        </h3>,
      )
      continue
    }

    if (line.startsWith('## ')) {
      flushList()
      blocks.push(
        <h2 key={`h2-${blockIndex++}`} className="mt-12 mb-4 text-xl font-semibold text-white sm:text-2xl">
          {renderInline(line.slice(3), `h2-${blockIndex}`)}
        </h2>,
      )
      continue
    }

    if (line.startsWith('# ')) {
      flushList()
      blocks.push(
        <h1 key={`h1-${blockIndex++}`} className="mb-2 text-2xl font-semibold text-white sm:text-3xl">
          {renderInline(line.slice(2), `h1-${blockIndex}`)}
        </h1>,
      )
      continue
    }

    if (line.startsWith('- ')) {
      if (!listBuffer || listBuffer.type !== 'ul') {
        flushList()
        listBuffer = { type: 'ul', items: [] }
      }
      listBuffer.items.push(line.slice(2))
      continue
    }

    const orderedMatch = /^\d+\.\s(.*)$/.exec(line)
    if (orderedMatch) {
      if (!listBuffer || listBuffer.type !== 'ol') {
        flushList()
        listBuffer = { type: 'ol', items: [] }
      }
      listBuffer.items.push(orderedMatch[1])
      continue
    }

    flushList()

    if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
      blocks.push(
        <p key={`p-${blockIndex++}`} className="mb-4 text-[15px] italic leading-relaxed text-violet-200/75">
          {renderInline(line.slice(1, -1), `p-${blockIndex}`)}
        </p>,
      )
      continue
    }

    blocks.push(
      <p key={`p-${blockIndex++}`} className="mb-4 text-[15px] leading-relaxed text-violet-50/85 sm:text-base">
        {renderInline(line, `p-${blockIndex}`)}
      </p>,
    )
  }

  flushList()
  return blocks
}

interface DocumentReaderProps {
  isOpen: boolean
  onClose: () => void
}

export default function DocumentReader({ isOpen, onClose }: DocumentReaderProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const scrollRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const parsed = useMemo(() => parseMarkdown(fullDocumentMarkdown), [])

  useEffect(() => {
    if (!isOpen) return

    const id = window.requestAnimationFrame(() => closeButtonRef.current?.focus())
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    if (scrollRef.current) scrollRef.current.scrollTop = 0

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.cancelAnimationFrame(id)
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  const transition = prefersReducedMotion ? { duration: 0.01 } : { duration: 0.45, ease: EASE_OUT_EXPO }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="bg-ink fixed inset-0 z-[100]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
          role="dialog"
          aria-modal="true"
          aria-label="Detailed document"
        >
          <div className="bg-radial-hero pointer-events-none absolute inset-0" />

          <div className="relative flex h-full flex-col">
            <div className="glass-card sticky top-0 z-10 flex items-center justify-between rounded-none border-x-0 border-t-0 px-6 py-4 sm:px-10">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-violet-300/70">{meta.docTitle}</p>
                <p className="mt-0.5 text-sm text-violet-200/60">{meta.candidate}, {meta.dateLabel}</p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="ease-signature glass-card flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.1em] text-violet-100 transition-colors duration-300 hover:border-violet-300/40 hover:text-white"
              >
                Close
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div ref={scrollRef} className="scrollbar-thin flex-1 overflow-y-auto px-6 py-10 sm:px-10">
              <div className="mx-auto max-w-2xl pb-24">{parsed}</div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
