import defaultResolve from 'part:@sanity/base/document-badges'

export default function resolveBadges(props) {
  const badges = defaultResolve(props)
  if (props?.published?.wasDeleted) {
    return [...badges]
  }
  return badges
}
