export type MusicTrack = {
  id: string
  title: string
  artist: string
  artistId: string
  album: string
  albumId: string
  artwork: string
  accent: string
  genre: string
  mood: string
  language: string
  duration: string
  streamUrl: string
  lyricsAvailable: boolean
  explicit: boolean
  regions: string[]
  source: string
}

const artworks = [
  'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=640&q=80',
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=640&q=80',
  'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=640&q=80',
  'https://images.unsplash.com/photo-1524650359799-842906ca1c06?w=640&q=80',
  'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=640&q=80',
  'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=640&q=80',
]
const songs = [
  ['Golden Hour','Luna Vale','Dawn Lines','Pop','Love','English','3:42'], ['Afterglow','The Coastline','Tidepool','Indie','Chill','English','4:08'], ['Paper Planes','Mira Sol','Soft Focus','R&B','Mood Off','English','3:18'], ['Northern Lights','Kairo Bloom','Open Roads','Electronic','Travel','Instrumental','5:02'], ['Stay Awhile','June & Atlas','Dawn Lines','Pop','Romantic','English','3:56'], ['Midnight Drive','Nova Park','Night Signals','Electronic','Focus','English','4:21'], ['Home Again','Rory Lane','Open Roads','Folk','Normal','English','3:31'], ['Sunroom','Pale Sunday','Soft Focus','Lo-fi','Chill','English','2:58'], ['Electric Heart','Mira Sol','Night Signals','R&B','Party','English','3:44'], ['Slow Motion','The Coastline','Tidepool','Indie','Breakup','English','4:13'], ['Bloom','Luna Vale','Dawn Lines','Pop','Love','English','3:27'], ['Side Street','Kairo Bloom','Open Roads','Electronic','Travel','Instrumental','3:49'], ['Low Tide','Pale Sunday','Tidepool','Lo-fi','Mood Off','English','2:44'], ['First Light','June & Atlas','Dawn Lines','Pop','Focus','English','3:09'], ['City Rain','Nova Park','Night Signals','Electronic','Normal','English','4:37'], ['Golden State','Rory Lane','Open Roads','Folk','Travel','English','3:52'], ['Velvet Sky','Mira Sol','Soft Focus','R&B','Romantic','English','3:38'], ['Weekend Plans','The Coastline','Night Signals','Indie','Party','English','3:18'], ['Orbit','Kairo Bloom','Open Roads','Electronic','Focus','Instrumental','4:51'], ['Hush','Pale Sunday','Soft Focus','Lo-fi','Chill','English','2:36'], ['Wildflower','Luna Vale','Dawn Lines','Pop','Love','English','3:25'], ['No Reply','June & Atlas','Tidepool','Indie','Breakup','English','3:59'], ['Daydream','Nova Park','Soft Focus','Electronic','Chill','English','3:46'], ['Open Window','Rory Lane','Open Roads','Folk','Normal','English','4:04'],
]
export const catalog: MusicTrack[] = songs.map((song, index) => ({
  id: `demo-${index + 1}`, title: song[0], artist: song[1], artistId: song[1].toLowerCase().replaceAll(' ', '-'), album: song[2], albumId: song[2].toLowerCase().replaceAll(' ', '-'), artwork: artworks[index % artworks.length], accent: ['#f4b942','#c6a4ff','#78d6d2','#ff8f70','#8aa9ff','#f28cb8'][index % 6], genre: song[3], mood: song[4], language: song[5], duration: song[6], streamUrl: '', lyricsAvailable: index % 3 !== 0, explicit: index === 8, regions: ['US','GB','IN','AU'], source: 'Owned royalty-free development catalog',
}))

export const moods = ['Romantic','Mood Off','Breakup','Love','Travel','Normal','Chill','Party','Focus']
export function searchCatalog(query: string) {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return catalog
  return catalog.filter(track => [track.title, track.artist, track.album, track.genre, track.mood, track.language].some(value => value.toLowerCase().includes(normalized)))
}
export function getDiscoveryTracks() {
  return [...catalog].sort(() => Math.random() - 0.5).slice(0, 12)
}
export interface MusicProvider { search(query: string, cursor?: string): Promise<{items: MusicTrack[]; nextCursor?: string}>; getTrack(id: string): Promise<MusicTrack | null>; }
export const authorizedCatalogProvider: MusicProvider = { async search(query) { return { items: searchCatalog(query).slice(0, 24) } }, async getTrack(id) { return catalog.find(track => track.id === id) ?? null } }
// Production adapter boundary: connect an authorized provider/CDN here without changing player or catalog UI.
