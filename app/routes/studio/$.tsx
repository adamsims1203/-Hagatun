import {ClientOnly} from 'remix-utils'
import { Studio } from 'sanity'
import { config } from 'sanity.config'

export const handle = {
	hydrate: true
}

export default function StudioPage() {
  return (
    <ClientOnly>
      {() => (
				<div style={{ height: '100vh' }}>
					<Studio
						
						config={config}
						// To enable guests view-only access to your Studio,
						// uncomment this line!
						// unstable_noAuthBoundary
					/>
				</div>
      )}
    </ClientOnly>
  )
}