import { useEffect, useRef } from 'react'

export default function useReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reveal = () => el.classList.add('revealed')

    if (typeof IntersectionObserver === 'undefined') {
      reveal()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal()
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, ...options }
    )

    observer.observe(el)

    const timeout = setTimeout(reveal, 4000)

    return () => {
      observer.disconnect()
      clearTimeout(timeout)
    }
  }, [])

  return ref
}
