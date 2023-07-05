

export interface SongContextState {
  songContext: song,
  setSongContext: (payload: song) => void
}

export interface song {

    selectedSongID?: string ,
    selectedSong:null|SpotifyApi.TrackObjectFull,
    isPlaying: boolean,
    volume: number,
    deviceID: string | null,

}