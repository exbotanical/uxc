import React, { createContext, useEffect, useMemo, useState } from 'react'

import { useSearch } from '@/components/Search/hooks'
import { cycleRange } from '@/utils'

type SearchContextType = ReturnType<typeof useSearch> & {
  activeRecordId: string
  setActiveRecordId: React.Dispatch<React.SetStateAction<string>>
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const SearchContext = createContext({} as SearchContextType)

/**
 * @todo Refine memoized state.
 * @todo Refine keydown listener.
 */
export function SearchProvider({ children }: { children: JSX.Element }) {
  const [activeRecordId, setActiveRecordId] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const search = useSearch()

  const ctx = useMemo(
    () => ({ ...search, activeRecordId, setActiveRecordId, isOpen, setIsOpen }),
    [search, activeRecordId, setActiveRecordId, isOpen, setIsOpen],
  )

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const els = document.querySelectorAll<HTMLElement>(`[id^='search-h']`)

    if (!els.length) {
      return
    }

    function handleKeyDown(e: KeyboardEvent) {
      // find the currently focused element and start from there
      // note: we compare ids because the element's referential eq may have changed
      let current = Array.from(els).findIndex(
        el => el.id === document.activeElement?.id,
      )

      if (e.key == 'ArrowDown') {
        if (current === -1) {
          current = 0
        } else {
          current = cycleRange(1, current, els.length)
        }
      } else if (e.key == 'ArrowUp') {
        if (current === -1) {
          current = els.length - 1
        } else {
          current = cycleRange(-1, current, els.length)
        }
      } else {
        return
      }

      // @todo find a means whereby we don't need to do this
      document.getElementById(els[current].id)?.focus()
      e.preventDefault()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [
    search.results,
    search.history,
    search.favorites,
    search.query,
    isOpen,
    setIsOpen,
  ])

  return <SearchContext.Provider value={ctx}>{children}</SearchContext.Provider>
}

SearchProvider.displayName = 'SearchProvider'
