import { useRef, useEffect } from 'react'
import { renderStudio } from 'sanity'
import sanityConfig from 'sanity.config'

export const handle = {
	hydrate: true
}

export default function Studio() {
  const studioRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    renderStudio(studioRef.current, sanityConfig)
  }, [])

  return (
    <>
      <div ref={studioRef} style={{ height: '100vh' }} />
    </>
  )
}