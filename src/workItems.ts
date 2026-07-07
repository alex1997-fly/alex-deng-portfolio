export type WorkItem = {
  src: string
  title: string
}

export function assetPath(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}

// Add new portfolio screenshots here. Put the image file in public/assets first,
// then add one item with the public path and a short title.
export const workImages: WorkItem[] = [
  { src: assetPath('assets/work-baseus-scenes.jpg'), title: 'Baseus Studio Campaign' },
  { src: assetPath('assets/work-aosi-architecture.jpg'), title: 'AOSI Commercial Image' },
  { src: assetPath('assets/work-shortfilm-night.jpg'), title: 'Short Film / Night Mood' },
  { src: assetPath('assets/work-nebula-charger.jpg'), title: 'Nebula EV Charger' },
  { src: assetPath('assets/work-earbuds-metro.jpg'), title: 'Earbuds Metro Film' },
  { src: assetPath('assets/work-minimal-white.jpg'), title: 'Minimal Product Scenes' },
  { src: assetPath('assets/work-baseus-tv.jpg'), title: 'Baseus TV Viral Film' },
  { src: assetPath('assets/work-cooling-protection.jpg'), title: 'Cooling Protection Campaign' },
  { src: assetPath('assets/work-esr-flip.jpg'), title: 'ESR Flip Case' },
  { src: assetPath('assets/work-walk-liwan.jpg'), title: 'Walk Liwan' },
  { src: assetPath('assets/work-hicc-oralcare.jpg'), title: 'HICC PET Oral Care' },
  { src: assetPath('assets/work-hicc-vet.jpg'), title: 'HICC PET Vet Film' },
  { src: assetPath('assets/work-earbuds-story.jpg'), title: 'Earbuds Story' },
  { src: assetPath('assets/work-baseus-lab.jpg'), title: 'Baseus Lab' },
  { src: assetPath('assets/work-cinematic-room-wide.jpg'), title: 'Cinematic Room Wide' },
  { src: assetPath('assets/work-cinematic-room-close.jpg'), title: 'Cinematic Room Close' },
]
