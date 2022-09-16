import { useEffect } from 'react'

interface UseClickOutsideOptions {
  onClickOutside: () => void
  ref: React.MutableRefObject<HTMLElement>
}

export const useClickOutside = ({ ref, onClickOutside }: UseClickOutsideOptions) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside()
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, onClickOutside])
}
