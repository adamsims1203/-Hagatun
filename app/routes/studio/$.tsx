import { useRef, useEffect } from 'react'
import { renderStudio } from 'sanity'
import { config } from 'sanity.config'

export const handle = {
	hydrate: true
}

export default function Studio() {
  const studioRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    renderStudio(studioRef.current, config)
  }, [])

  return (
    <>
      <div ref={studioRef} style={{ height: '100vh' }} />
    </>
  )
}