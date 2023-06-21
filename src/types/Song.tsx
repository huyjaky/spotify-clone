

export interface SongContextState {
  songContext: song,
  setSongContext: (payload: song) => void
}

export interface song {

    selectedSongID?: string ,
    selectedSong:null|any,
    isPlaying: boolean,
    volume: number,
    deviceID: string | null,

}