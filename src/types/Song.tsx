

export interface Song {
  selectedSongID: string | undefined,
  selectedSong: any | null,
  isPlaying: boolean,
  volume: number,
  deviceID: string | null
}